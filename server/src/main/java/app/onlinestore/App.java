package app.onlinestore;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.Format;
import java.text.SimpleDateFormat;

import org.glassfish.tyrus.server.Server;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import java.util.Arrays;
import java.util.Date;
import java.util.Properties;

import java.io.FileInputStream;
import java.security.MessageDigest;

public class App
{
    private static final String postgrespass = getProperty();
    private static final String salt = "0NL1N35T0R3.4PP";
    private static String getProperty()
    {
        Properties prop = new Properties();
        String fileName = "postgres.config";
        try (FileInputStream fis = new FileInputStream(fileName)) {prop.load(fis);}
        catch (Exception e) {e.printStackTrace(); return null;}
        return prop.getProperty("postgres.pass");
    }
    private static String hash(String login, String password) throws Exception
    {
        byte[] temp = MessageDigest.getInstance("SHA-256").digest((login + password + salt).getBytes());
        StringBuilder sb = new StringBuilder();
        for (int m = 0; m < temp.length; m++)
        {
            String hex = Integer.toHexString(0xff & temp[m]);
            if (hex.length() == 1) sb.append('0');
            sb.append(hex);
        }
        return sb.toString();
    }
    private static JSONArray createJSON(ResultSet rs, JSONArray arr, String lang) throws Exception
    {
        while (rs.next())
        {
            JSONObject obj = new JSONObject();
            obj.put("id_item", rs.getInt("id_item"));
            if (lang.contains("en")) {obj.put("item_name", rs.getString("item_name"));}
            else if (lang.contains("pl")) {obj.put("polish_name", rs.getString("polish_name"));}
            obj.put("type", rs.getString("type"));
            obj.put("price", rs.getDouble("price"));
            obj.put("quantity", rs.getInt("quantity"));
            obj.put("input_date", rs.getString("input_date"));
            obj.put("photo", rs.getString("photo"));
            arr.add(obj);
        }
        return arr;
    }
    private static JSONArray makeUnique(JSONArray arr)
    {
        JSONArray arr_unique = new JSONArray();
        for (int m = 0; m < arr.size(); m++)
        {
            boolean flag = true;
            for (int n = 0; n < arr_unique.size(); n++)
            {
                if (arr.get(m).equals(arr_unique.get(n))) {flag = false; break;}
            }
            if (flag == true) {arr_unique.add(arr.get(m));}
        }
        return arr_unique;
    }
    public static void main(String[] args)
    {
        Server server = new Server("localhost", 80, "", AppServerEndpoint.class);
        try {server.start(); while (true) {}} // for now to make the server run in infinite loop
        catch (Exception e) {e.printStackTrace();}
        finally {server.stop();}
    }
    public static String admin_login(String data) throws Exception
    {
		Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        String hash = hash(data.split(" ")[1], data.split(" ")[2]);
		PreparedStatement stmt = conn.prepareStatement("select * from veggiestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + hash + "' and type like 'administrator'" );
		ResultSet rs = stmt.executeQuery(); String result = "scene1 incorrect";
		while (rs.next()) {result = "scene1 correct";} return result;
    }
    public static String admin_query(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        String[] data_arr = data.split(" "); String result = ""; String row = ""; String temp = "";
        ResultSetMetaData rsmd = null; boolean flag = true; int[] data_types = null; String[] column_names = null;
        PreparedStatement stmt = null; ResultSet rs = null; if (data_arr[2].equals("terminal")) {result = "terminal ";} else {result = "stats ";}
        if (data_arr[1].equals("get-elements")) {
            if (data_arr[3].equals("users")) stmt = conn.prepareStatement("select user_id, login from veggiestore.users order by user_id");
            else stmt = conn.prepareStatement("select id_item, item_name from veggiestore.items order by id_item");
            rs = stmt.executeQuery();
            while (rs.next()) {
                row = rs.getString(2);
                if (flag) {result += row; flag = false;}
                else {result += ("\n" + row);} row = "";
            }
        }
        else if (data_arr[1].equals("get-info")) {
            if (data_arr.length > 4) {
                for (int m = 4; m < data_arr.length; m++) {
                    if (m == data_arr.length - 1) {temp += (data_arr[m]);}
                    else {temp += (data_arr[m] + " ");}
                } data_arr[4] = temp;
            }
            if (data_arr[3].equals("user")) stmt = conn.prepareStatement("select * from veggiestore.users where login = '" + data_arr[4] + "'");
            else stmt = conn.prepareStatement("select * from veggiestore.items where item_name = '" + data_arr[4] + "'");
            rs = stmt.executeQuery(); rs.next(); rsmd = rs.getMetaData();
            for (int m = 1; m <= rsmd.getColumnCount(); m++) {
                row = (rsmd.getColumnName(m) + ":" + rs.getString(m));
                if (flag) {result += row; flag = false;}
                else {result += ("\n" + row);}
            }
        }
        else if (data_arr[1].equals("delete")) {
            if (data_arr.length > 4) {
                for (int m = 3; m < data_arr.length; m++) {
                    if (m == data_arr.length - 1) {temp += (data_arr[m]);}
                    else {temp += (data_arr[m] + " ");}
                } data_arr[3] = temp;
            } if (data_arr[2].equals("user")) {
                stmt = conn.prepareStatement("delete from veggiestore.users where login = '" + data_arr[3] + "'");
            } else {
                stmt = conn.prepareStatement("delete from veggiestore.items where item_name = '" + data_arr[3] + "'");
            } result = "terminal " + stmt.executeUpdate();
        }
        else if (data_arr[1].equals("modify")) {
            if (data_arr.length > 5) {
                for (int m = 3; m < data_arr.length - 2; m++) {
                    if (m == data_arr.length - 3) {temp += (data_arr[m]);}
                    else {temp += (data_arr[m] + " ");}
                } data_arr[3] = temp;
                for (int m = 5; m < data_arr.length; m++) {
                    if (m == data_arr.length - 1) {temp += (data_arr[m]);}
                    else {temp += (data_arr[m] + " ");}
                } data_arr[4] = temp;
            } if (data_arr[2].equals("user")) {
                stmt = conn.prepareStatement("select * from veggiestore.users where login = '" + data_arr[4] + "'");
                rs = stmt.executeQuery(); rsmd = rs.getMetaData(); data_types = new int[rsmd.getColumnCount()];
                for (int m = 1; m <= data_types.length; m++) {
                    data_types[m - 1] = rsmd.getColumnType(m);
                } stmt = conn.prepareStatement("update veggiestore.users set type = (?), first_name = (?), last_name = (?), login = (?), password = (?), phone_number = (?), address = (?) where login = (?)");
            } else {
                stmt = conn.prepareStatement("select * from veggiestore.items where item_name = '" + data_arr[4] + "'");
                rs = stmt.executeQuery(); rsmd = rs.getMetaData(); data_types = new int[rsmd.getColumnCount()];
                for (int m = 1; m <= data_types.length; m++) {
                    data_types[m - 1] = rsmd.getColumnType(m);
                } stmt = conn.prepareStatement("update veggiestore.items set item_name = (?), type = (?), price = (?), quantity = (?), input_date = (?), photo = (?), polish_name = (?) where item_name = (?)");
            } stmt.setString(rsmd.getColumnCount(), data_arr[3]);
            String[] update_data = data_arr[4].split("\n");
            for (int m = 1; m < update_data.length; m++) {
                temp = update_data[m].split(":")[1];
                if (data_types[m] == 2) {
                    try {stmt.setDouble(m, Double.parseDouble(temp));}
                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                }
                else if (data_types[m] == 4) {
                    try {stmt.setInt(m, Integer.parseInt(temp));}
                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                }
                else if (data_types[m] == 12) {
                    try {stmt.setString(m, temp);}
                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                }
                else if (data_types[m] == 91) {
                    try {stmt.setDate(m, java.sql.Date.valueOf(temp));}
                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                }
            }
            if (flag) {
                result = "terminal " + stmt.executeUpdate();
            }
        }
        else if (data_arr[1].equals("add")) {
            result = "terminal 0";
            if (data_arr.length < 4) {
                result = "terminal 0";
            } else {
                if (data_arr[2].equals("user")) {
                    stmt = conn.prepareStatement("select * from veggiestore.users limit 1");
                    rs = stmt.executeQuery(); rsmd = rs.getMetaData(); data_types = new int[rsmd.getColumnCount()]; column_names = new String[rsmd.getColumnCount()];
                    for (int m = 1; m <= data_types.length; m++) {
                        data_types[m - 1] = rsmd.getColumnType(m);
                        column_names[m - 1] = rsmd.getColumnName(m);
                    } stmt = conn.prepareStatement("insert into veggiestore.users (type, first_name, last_name, login, password, phone_number, address) values (?, ?, ?, ?, ?, ?, ?)");
                } else {
                    stmt = conn.prepareStatement("select * from veggiestore.items limit 1");
                    rs = stmt.executeQuery(); rsmd = rs.getMetaData(); data_types = new int[rsmd.getColumnCount()]; column_names = new String[rsmd.getColumnCount()];
                    for (int m = 1; m <= data_types.length; m++) {
                        data_types[m - 1] = rsmd.getColumnType(m);
                        column_names[m - 1] = rsmd.getColumnName(m);
                    } stmt = conn.prepareStatement("insert into veggiestore.users (item_name, type, price, quantity, input_date, photo, polish_name) values (?, ?, ?, ?, ?, ?, ?)");
                }
                String[] add_data = data_arr[3].split("\n");
                if (add_data.length != rsmd.getColumnCount()) {
                    result = "terminal 0";
                }
                else {
                    for (int m = 0; m < rsmd.getColumnCount(); m++) {
                        String[] single_row_data = add_data[m].split(":");
                        if (single_row_data[0].equals(column_names[m])) {
                            if (m == 0 && single_row_data[0].equals("user_id")) {
                                rs = conn.prepareStatement("select * from veggiestore.users where user_id = '" + single_row_data[1] + "'").executeQuery();
                                while (rs.next()) {
                                    result = "terminal 0"; flag = false;
                                } if (!flag) {break;}
                            }
                            else if (m == 0 && single_row_data[0].equals("id_item")) {
                                rs = conn.prepareStatement("select * from veggiestore.items where id_item = '" + single_row_data[1] + "'").executeQuery();
                                while (rs.next()) {
                                    result = "terminal 0"; flag = false;
                                } if (!flag) {break;}
                            }
                            // else if (m == 4 && single_row_data[0].equals("login")) {
                            //     rs.close();
                            //     rs = conn.prepareStatement("select * from veggiestore.items where login = '" + single_row_data[1] + "'").executeQuery();
                            //     while (rs.next()) {
                            //         result = "terminal 0"; flag = false;
                            //     } if (!flag) {break;}
                            // }
                            // else if (m == 1 && single_row_data[0].equals("item_name")) {
                            //     rs = conn.prepareStatement("select * from veggiestore.items where item_name = '" + single_row_data[1] + "'").executeQuery();
                            //     while (rs.next()) {
                            //         result = "terminal 0"; flag = false;
                            //     } if (!flag) {break;}
                            // }
                            else {
                                if (data_types[m] == 2) {
                                    try {stmt.setDouble(m, Double.parseDouble(single_row_data[1]));}
                                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                                }
                                else if (data_types[m] == 4) {
                                    try {stmt.setInt(m, Integer.parseInt(single_row_data[1]));}
                                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                                }
                                else if (data_types[m] == 12) {
                                    try {stmt.setString(m, single_row_data[1]);}
                                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                                }
                                else if (data_types[m] == 91) {
                                    try {stmt.setDate(m, java.sql.Date.valueOf(single_row_data[1]));}
                                    catch (Exception e) {result = "terminal 0"; flag = false; break;}
                                }
                            }
                        } else {
                            result = "terminal 0"; break;
                        }
                    }
                }
            }
            if (flag) {
                result = "terminal " + stmt.executeUpdate();
            }
        }
        return result;
    }
    public static String get_products(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        String[] query = data.split(" "); String[] sql_query = new String[1]; PreparedStatement stmt; String language = query[1];
        if (!query[2].contains("all"))
        {
            sql_query = Arrays.copyOf(sql_query, sql_query.length + 1);
            sql_query[sql_query.length - 2] = "upper(type) like upper('"+ query[2] +"') ";
        }
        if (!query[3].contains("0"))
        {
            sql_query = Arrays.copyOf(sql_query, sql_query.length + 1);
            sql_query[sql_query.length - 2] = "price <= '"+ query[3] +"' ";
        }
        if (query[4].contains("alpha"))
        {
            if (query[1].contains("en")) {sql_query[sql_query.length - 1] = "order by item_name";}
            if (query[1].contains("pl")) {sql_query[sql_query.length - 1] = "order by polish_name";}
        }
        if (query[4].contains("price")) {sql_query[sql_query.length - 1] = "order by price";}
        String string_sql_query = "select * from veggiestore.items ";
        for (int m = 0; m < sql_query.length; m++)
        {
            if (m == 0 && sql_query.length > 1) {string_sql_query += "where ";}
            string_sql_query += sql_query[m];
            if (m < sql_query.length - 2) {string_sql_query += "and ";}
        }
        stmt = conn.prepareStatement(string_sql_query);
        if (query.length > 5)
        {
            string_sql_query = "select * from veggiestore.items ";
            for (int m = 0; m < sql_query.length - 1; m++)
            {
                if (m == 0) {string_sql_query += "where ";}
                string_sql_query += sql_query[m];
                if (m < sql_query.length - 2) {string_sql_query += "and ";}
            }
            stmt = conn.prepareStatement(string_sql_query);
            JSONArray results = new JSONArray();
            for (int m = 5; m < query.length; m++)
            {
                if (!string_sql_query.contains("where")) {stmt = conn.prepareStatement(string_sql_query + " where upper(item_name) like upper('%" + query[m] + "%') " + sql_query[sql_query.length - 1]);}
                else {stmt = conn.prepareStatement(string_sql_query + "and upper(item_name) like upper('%" + query[m] + "%') " + sql_query[sql_query.length - 1]);}
                results = createJSON(stmt.executeQuery(), results, language);
            }
            results = makeUnique(results);
            return results.toJSONString();
        }
        
        else {return createJSON(stmt.executeQuery(), new JSONArray(), language).toJSONString();}
    }
    public static String manage_session(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        PreparedStatement stmt = conn.prepareStatement("select * from veggiestore.sessions");
        ResultSet rs = stmt.executeQuery(); int status = 0; Date date = new Date(); String login = data.split(" ")[2];
        Format formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); String date_string = formatter.format(date);
        while (rs.next())
        {
            if (rs.getString("login").contains(login))
            {
                if (data.contains("create"))
                {
                    stmt = conn.prepareStatement("update veggiestore.sessions set expire_time = ? where login like ?");
                    stmt.setString(1, date_string); stmt.setString(2, login);
                    stmt.executeQuery(); status = 1; break;
                }
                else if (data.contains("check")) {break;}
            }
        }
        if (status == 0)
        {
            if (data.contains("create"))
            {
                stmt = conn.prepareStatement("insert into veggiestore.sessions (login, expire_time) values (?, ?)");
                stmt.setString(1, login); stmt.setString(2, date_string);
                stmt.executeQuery(); status = 1;
            }
            else if (data.contains("check")) {}
        }
        return null;
    }
    public static String client_login(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        String hash = hash(data.split(" ")[1], data.split(" ")[2]);
		PreparedStatement stmt = conn.prepareStatement("select * from veggiestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + hash + "' and type like 'customer'" );
		ResultSet rs = stmt.executeQuery();
        String message = "error";
		while (rs.next()) {message = "success";}
        return message;
    }
    public static String client_register(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
		PreparedStatement stmt = conn.prepareStatement("select * from veggiestore.users where login like '"+ data.split(" ")[1] + "'");
		ResultSet rs = stmt.executeQuery();
        String message = "success";
		while (rs.next()) {message = "error";}
        if (message.contains("success"))
        {
            String hash = hash(data.split(" ")[1], data.split(" ")[2]);
            stmt = conn.prepareStatement("insert into veggiestore.users (type, login, password, first_name, last_name, phone_number) values (?, ?, ?, ?, ?, ?)");
            stmt.setString(1, "customer"); stmt.setString(2, data.split(" ")[1]);
            stmt.setString(3, hash); stmt.setString(4, data.split(" ")[3]);
            stmt.setString(5, data.split(" ")[4]); stmt.setString(6, data.split(" ")[5]);
            stmt.executeUpdate();
        }
        return message;
    }
}