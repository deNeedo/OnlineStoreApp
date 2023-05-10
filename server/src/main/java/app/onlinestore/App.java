package app.onlinestore;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.glassfish.tyrus.server.Server;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

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
        JSONObject obj = new JSONObject(); obj.put("", arr);
        return arr;
    }
    public static void main(String[] args)
    {
        Server server = new Server("localhost", 80, "/app", AppServerEndpoint.class);
        try {server.start(); while (true) {}} // for now to make the server run in infinite loop
        catch (Exception e) {e.printStackTrace();}
        finally {server.stop();}
    }
    public static String admin_login(String data) throws Exception
    {
		Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        String hash = hash(data.split(" ")[1], data.split(" ")[2]);
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + hash + "' and type like 'administrator'" );
		ResultSet rs = stmt.executeQuery();
        String message = "error";
		while (rs.next()) {message = "success";}
        return message;
    }
    public static String get_products(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass); PreparedStatement stmt;

        if (data.split(" ").length > 1)
        {
            StringBuilder pattern = new StringBuilder();
            for (int m = 1; m < data.split(" ").length; m++) {pattern.append(data.split(" ")[m]); pattern.append(" ");}
            pattern.deleteCharAt(pattern.length() - 1);
            stmt = conn.prepareStatement("select * from onlinestore.items where upper(item_name) like upper('%" + pattern + "%')");
        }
        else {stmt = conn.prepareStatement("select * from onlinestore.items");}
		ResultSet rs = stmt.executeQuery(); String message = createJSON(rs, new JSONArray()).toJSONString();
		// while (rs.next()) {message += "{\"id_item\"" + rs.getString(1) + "]";}// + " " + rs.getString("item_name") + " " + rs.getString("type") + "\n";}
        return message;
    }
    public static String client_login(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
        String hash = hash(data.split(" ")[1], data.split(" ")[2]);
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + hash + "' and type like 'customer'" );
		ResultSet rs = stmt.executeQuery();
        String message = "error";
		while (rs.next()) {message = "success";}
        return message;
    }
    public static String client_register(String data) throws Exception
    {
        Connection conn = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", App.postgrespass);
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] + "'");
		ResultSet rs = stmt.executeQuery();
        String message = "success";
		while (rs.next()) {message = "error";}
        if (message.contains("success"))
        {
            String hash = hash(data.split(" ")[1], data.split(" ")[2]);
            stmt = conn.prepareStatement("insert into onlinestore.users (type, login, password, first_name, last_name, phone_number) values (?, ?, ?, ?, ?, ?)");
            stmt.setString(1, "customer"); stmt.setString(2, data.split(" ")[1]);
            stmt.setString(3, hash); stmt.setString(4, data.split(" ")[3]);
            stmt.setString(5, data.split(" ")[4]); stmt.setString(6, data.split(" ")[5]);
            stmt.executeUpdate();
        }
        return message;
    }
}