package app.onlinestore;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
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
    private static JSONArray createJSON(ResultSet rs, JSONArray arr) throws Exception
    {
        while (rs.next())
        {
            JSONObject obj = new JSONObject();
            obj.put("id_item", rs.getInt("id_item"));
            obj.put("item_name", rs.getString("item_name"));
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
		ResultSet rs = stmt.executeQuery();
        String message = "error";
		while (rs.next()) {message = "success";}
        return message;
    }
    public static String get_products(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        String[] query = data.split(" "); String[] sql_query = new String[1]; PreparedStatement stmt;
        if (!query[1].contains("all"))
        {
            sql_query = Arrays.copyOf(sql_query, sql_query.length + 1);
            sql_query[sql_query.length - 2] = "upper(type) like upper('"+ query[1] +"') ";
        }
        if (!query[2].contains("0"))
        {
            sql_query = Arrays.copyOf(sql_query, sql_query.length + 1);
            sql_query[sql_query.length - 2] = "price <= '"+ query[2] +"' ";
        }
        if (query[3].contains("alpha"))
        {
            sql_query[sql_query.length - 1] = "order by item_name";
        }
        if (query[3].contains("price"))
        {
            sql_query[sql_query.length - 1] = "order by price";
        }
        String string_sql_query = "select * from veggiestore.items ";
        for (int m = 0; m < sql_query.length; m++)
        {
            if (m == 0 && sql_query.length > 1) {string_sql_query += "where ";}
            string_sql_query += sql_query[m];
            if (m < sql_query.length - 2) {string_sql_query += "and ";}
        }
        stmt = conn.prepareStatement(string_sql_query);
        if (query.length > 4)
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
            for (int m = 4; m < query.length; m++)
            {
                if (!string_sql_query.contains("where")) {stmt = conn.prepareStatement(string_sql_query + " where upper(item_name) like upper('%" + query[m] + "%') " + sql_query[sql_query.length - 1]);}
                else {stmt = conn.prepareStatement(string_sql_query + "and upper(item_name) like upper('%" + query[m] + "%') " + sql_query[sql_query.length - 1]);}
                results = createJSON(stmt.executeQuery(), results);
            }
            results = makeUnique(results);
            return results.toJSONString();
        }
        else {return createJSON(stmt.executeQuery(), new JSONArray()).toJSONString();}
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