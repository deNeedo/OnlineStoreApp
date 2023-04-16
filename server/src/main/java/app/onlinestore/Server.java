//Server Java - Test line
package app.onlinestore;

import java.sql.*;
import javax.sql.DataSource;
import org.postgresql.ds.PGSimpleDataSource;
import java.io.*;
import java.net.*;

public class Server
{
	static final int PORT = 888;
    static int STATUS = 1;
	private final static String url = "jdbc:postgresql://localhost:5432/postgres?user=postgres&password=8vu:sigiwy"; // todo: getting this from a file
    private static DataSource createDataSource()
	{
        final PGSimpleDataSource dataSource = new PGSimpleDataSource();
        dataSource.setUrl(url);
        return dataSource;
    }
	
	public static void login(String data, DataOutputStream dos) throws Exception
	{
		DataSource dataSource = createDataSource();
		Connection conn = dataSource.getConnection();
		PreparedStatement stmt = conn.prepareStatement("select * from users where login like '"+ data.split(" ")[0] +"' and password like '" + data.split(" ")[1] + "'");
		ResultSet rs = stmt.executeQuery();
        String message = "none\n";
		while (rs.next()) {message = "one\n";}
        dos.writeBytes(message);
	}
    public static void display(String message, int ID) {System.out.println(message + ", ID:" + ID);}
	public static void main(String[] args) throws SQLException
	{
		ServerSocket serverSocket = null;
        Socket socket = null;
        try {serverSocket = new ServerSocket(PORT); System.out.println("Server initialized");}
        catch (IOException e) {e.printStackTrace(); return;}
        while (STATUS == 1)
        {
            try {socket = serverSocket.accept(); System.out.println("Connection established, ID:" + socket.getPort());}
            catch (IOException e) {System.out.println("I/O error: " + e);}
            new ClientCon(socket).start();
        }
        // unreachable code (at least for now)
        try {serverSocket.close(); System.out.println("Server closed");}
        catch (IOException e) {e.printStackTrace(); return;}
	}
}

class ClientCon extends Thread
{
    protected Socket socket;

    public ClientCon(Socket clientSocket) {this.socket = clientSocket;}

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
                if ((message == null) || message.equalsIgnoreCase("exit")) {System.out.println("Connection closed, ID:" + socket.getPort()); socket.close(); return;}
                else if (message != null) {Server.login(message, dos);}
            }
            catch (Exception e) {e.printStackTrace(); return;}
        }
    }
}

