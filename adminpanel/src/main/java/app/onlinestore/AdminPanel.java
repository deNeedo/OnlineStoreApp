package app.onlinestore;

import java.net.URI;
import javax.websocket.ClientEndpoint;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import org.glassfish.tyrus.client.ClientManager;
import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;

@ClientEndpoint
public class AdminPanel extends Application
{
    private FXMLLoader loader = new FXMLLoader();
    private Session session;
    public StartController next;

    public Session getSession() {return this.session;}
    public String connect()
    {
        try {ClientManager.createClient().connectToServer(this, new URI("ws://localhost:80/app/onlinestore")); return "success";}
        catch (Exception e) {return "error";}
    }
    @OnOpen
    public void onOpen(Session session) {this.session = session;}
    @OnMessage
    public void onMessage(Session session, String message) {this.next.next.setMessage(message);}
    @OnClose
    public void onClose(Session session) {}
    @Override
    public void start(Stage stage) throws Exception
    {
        Image icon = new Image("icon.png");
        stage.getIcons().add(icon); stage.setTitle("Admin Panel");
        Parent base = this.loader.load(getClass().getResource("start.fxml").openStream());
        next = this.loader.getController(); next.setPrevious(this);
        stage.setScene(new Scene(base)); stage.show();
    }
    public static void main(String[] args) throws Exception {launch();}
}