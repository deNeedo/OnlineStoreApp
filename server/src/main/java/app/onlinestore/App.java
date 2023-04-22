package app.onlinestore;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.postgresql.ds.PGSimpleDataSource;
import org.glassfish.tyrus.server.Server;
import java.util.Properties;
import java.io.FileInputStream;

public class App
{
    protected static final String postgrespass = getProperty();
    private static String getProperty()
    {
        Properties prop = new Properties();
        String fileName = "postgres.config";
        try (FileInputStream fis = new FileInputStream(fileName)) {prop.load(fis);}
        catch (Exception e) {e.printStackTrace(); return null;}
        return prop.getProperty("postgres.pass");
    }
    public static void main(String[] args)
    {
        Server server = new Server("localhost", 80, "/app", AppServerEndpoint.class);
        try {server.start(); while (true) {}} // for now to make the server run in infinite loop
        catch (Exception e) {throw new RuntimeException(e);}
        finally {server.stop();}
    }
    public static String admin_login(String data) throws Exception
    {
        final PGSimpleDataSource dataSource = new PGSimpleDataSource();
        String url = "jdbc:postgresql://localhost:5432/postgres?user=postgres&password=" + App.postgrespass;
        dataSource.setUrl(url);
		Connection conn = dataSource.getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + data.split(" ")[2] + "' and type like 'administrator'" );
		ResultSet rs = stmt.executeQuery();
        String message = "error";
		while (rs.next()) {message = "success";}
        return message;
    }
    public static String client_login(String data) throws Exception
    {
        final PGSimpleDataSource dataSource = new PGSimpleDataSource();
        String url = "jdbc:postgresql://localhost:5432/postgres?user=postgres&password=" + App.postgrespass;
        dataSource.setUrl(url);
		Connection conn = dataSource.getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + data.split(" ")[2] + "' and type like 'customer'" );
		ResultSet rs = stmt.executeQuery();
        String message = "not found";
		while (rs.next()) {message = "found";}
        return message;
    }
    public static String client_register(String data) throws Exception
    {
        final PGSimpleDataSource dataSource = new PGSimpleDataSource();
        String url = "jdbc:postgresql://localhost:5432/postgres?user=postgres&password=" + App.postgrespass;
        dataSource.setUrl(url);
		Connection conn = dataSource.getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] + "'");
		ResultSet rs = stmt.executeQuery();
        String message = "not found";
		while (rs.next()) {message = "found";}
        if (message.contains("not found"))
        {
            stmt = conn.prepareStatement("insert into onlinestore.users (type, login, password, first_name, last_name, phone_number) values (?, ?, ?, ?, ?, ?)");
            stmt.setString(1, "customer"); stmt.setString(2, data.split(" ")[1]);
            stmt.setString(3, data.split(" ")[2]); stmt.setString(4, data.split(" ")[3]);
            stmt.setString(5, data.split(" ")[4]); stmt.setString(6, data.split(" ")[5]);
            stmt.executeUpdate();
        }
        return message;
    }
}