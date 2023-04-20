package app.onlinestore;

// import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.postgresql.ds.PGSimpleDataSource;
import org.glassfish.tyrus.server.Server;
import java.util.Properties;
import java.io.FileInputStream;

public class App
{
    protected final static String postgrespass = getProperty();
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
        String message = "not found";
		while (rs.next()) {message = "found";}
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
            stmt = conn.prepareStatement("insert into onlinestore.users (user_id, type, login, password, first_name, last_name, phone_number) values (?, ?, ?, ?, ?, ?, ?)");
            stmt.setInt(1, 100); stmt.setString(2, "customer"); stmt.setString(3, data.split(" ")[1]);
            stmt.setString(4, data.split(" ")[2]); stmt.setString(5, data.split(" ")[3]);
            stmt.setString(6, data.split(" ")[4]); stmt.setString(7, data.split(" ")[5]);
            stmt.executeUpdate();
        }
        return message;
    }
}