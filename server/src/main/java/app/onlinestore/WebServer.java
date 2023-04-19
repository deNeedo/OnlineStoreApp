//Server Java - Test line
package app.onlinestore;

import javax.sql.DataSource;

import org.postgresql.ds.PGSimpleDataSource;
import java.io.*;
import java.sql.*;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.net.*;
import java.security.MessageDigest;

public class WebServer
{
    private static int STATUS = 1;
    protected final static String postgrespass = getProperty();
    private static String getProperty()
    {
        Properties prop = new Properties();
        String fileName = "postgres.config";
        try (FileInputStream fis = new FileInputStream(fileName)) {prop.load(fis);}
        catch (Exception e) {e.printStackTrace(); return null;}
        return prop.getProperty("postgres.pass");
    }
    
    private static DataSource createDataSource(String pass)
	{
        final PGSimpleDataSource dataSource = new PGSimpleDataSource();
        String url = "jdbc:postgresql://localhost:5432/postgres?user=postgres&password=" + pass;
        dataSource.setUrl(url);
        return dataSource;
    }
	
    public static void login_client(String data, OutputStream out, String pass) throws Exception
    {
        DataSource dataSource = createDataSource(pass);
		Connection conn = dataSource.getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + data.split(" ")[2] + "' and type like 'administrator'" );
		ResultSet rs = stmt.executeQuery();
        byte[] message = ("none\n").getBytes("UTF-8");
		while (rs.next()) {message = ("one\n").getBytes("UTF-8");}
        out.write(message); out.flush();
    }

	public static void login_admin(String data, OutputStream out, String pass) throws Exception
	{
		DataSource dataSource = createDataSource(pass);
		Connection conn = dataSource.getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + data.split(" ")[2] + "' and type like 'administrator'" );
		ResultSet rs = stmt.executeQuery();
        byte[] message = ("none\n").getBytes("UTF-8");
		while (rs.next()) {message = ("one\n").getBytes("UTF-8");}
        out.write(message); out.flush();
	}
    
    public static void login_connection(String data, OutputStream out) throws Exception
	{
        Matcher get = Pattern.compile("^GET").matcher(data);
        if (get.find())
        {
            Matcher match = Pattern.compile("Sec-WebSocket-Key: (.*)").matcher(data);
            match.find();
            byte[] message = ("HTTP/1.1 101 Switching Protocols\r\n" + "Connection: Upgrade\r\n" + "Upgrade: websocket\r\n" + "Sec-WebSocket-Accept: "
                + Base64.getEncoder().encodeToString(MessageDigest.getInstance("SHA-1").digest((match.group(1)
                + "258EAFA5-E914-47DA-95CA-C5AB0DC85B11").getBytes("UTF-8")))
                + "\r\n\r\n").getBytes("UTF-8");
            out.write(message, 0, message.length); out.flush();
        }
        // }
        // Server.login_client(data, out, data);
	}
	public static void main(String[] args) throws Exception
	{

		ServerSocket serverSocket = null;
        Socket socket = null;
        try {serverSocket = new ServerSocket(80); System.out.println("Web Server Initialized");}
        catch (Exception e) {e.printStackTrace(); return;}
        while (STATUS == 1)
        {
            try {socket = serverSocket.accept(); System.out.println("Web Connection Established, ID:" + socket.getPort());}
            catch (Exception e) {e.printStackTrace();}
            new WebClientCon(socket).start();
        }
        // unreachable code (at least for now)
        try {serverSocket.close(); System.out.println("Web Server Closed");}
        catch (Exception e) {e.printStackTrace(); return;}
	}
}

class WebClientCon extends Thread
{
    protected Socket socket;

    public WebClientCon(Socket clientsocket) {this.socket = clientsocket;}

    public void run()
    {
        InputStream in; OutputStream out; 
        try {in = socket.getInputStream(); out = socket.getOutputStream();}
        catch (IOException e) {return;}
        String message = ""; Scanner s = new Scanner(in, "UTF-8");
        while (true)
        {
            message = s.useDelimiter("\\r\\n\\r\\n").next();
            try
            {
                if (message.contains("close-connection")) {System.out.println("Connection closed, ID:" + socket.getPort()); socket.close(); return;}
                else if (message.contains("Sec-WebSocket-Key:")) {WebServer.login_connection(message, out);}
                else if (message.contains("exit-token")) {s.close(); return;} // this message is not implemented yet, its just to suppress warnings
            }
            catch (Exception e) {e.printStackTrace(); return;}
            message = "";
        }
    }
}
