//Server Java - Test line
package app.onlinestore;

import javax.sql.DataSource;
import org.postgresql.ds.PGSimpleDataSource;
import java.io.*;
import java.sql.*;
import java.util.*;
import java.net.*;

public class AdminServer
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
	
	public static void login_admin(String data, DataOutputStream dos, String pass) throws Exception
	{
		DataSource dataSource = createDataSource(pass);
		Connection conn = dataSource.getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from onlinestore.users where login like '"+ data.split(" ")[1] +"' and password like '" + data.split(" ")[2] + "' and type like 'administrator'" );
		ResultSet rs = stmt.executeQuery();
        String message = "none\n";
		while (rs.next()) {message = "one\n";}
        dos.writeBytes(message);
	}

	public static void main(String[] args) throws Exception
	{
		ServerSocket serverSocket = null;
        Socket socket = null;
        try {serverSocket = new ServerSocket(88); System.out.println("Admin Server Initialized");}
        catch (Exception e) {e.printStackTrace(); return;}
        while (STATUS == 1)
        {
            try {socket = serverSocket.accept(); System.out.println("Admin Connection Established, ID:" + socket.getPort());}
            catch (Exception e) {e.printStackTrace();}
            new AdminClientCon(socket).start();
        }
        // unreachable code (at least for now)
        try {serverSocket.close(); System.out.println("Admin Server Closed");}
        catch (Exception e) {e.printStackTrace(); return;}
	}
}

class AdminClientCon extends Thread
{
    protected Socket socket;

    public AdminClientCon(Socket clientSocket) {this.socket = clientSocket;}

    public void run()
    {
        InputStream inp = null;
        BufferedReader br = null;
        DataOutputStream dos = null;
        try {inp = socket.getInputStream(); br = new BufferedReader(new InputStreamReader(inp)); dos = new DataOutputStream(socket.getOutputStream());}
        catch (IOException e) {return;}
        String message;
        while (true)
        {
            try
            {
                message = br.readLine();
                if ((message == null)) {System.out.println("Connection closed, ID:" + socket.getPort()); socket.close(); return;}
                else if (message.contains("admin-login-try")) {System.out.println("Admin panel login try"); AdminServer.login_admin(message, dos, AdminServer.postgrespass);}
            }
            catch (Exception e) {e.printStackTrace(); return;}
        }
    }
}
