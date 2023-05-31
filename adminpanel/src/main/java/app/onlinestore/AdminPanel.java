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
    public Session session;
    public StartController next;
    public Parent base;
    public Scene scene;

    public Session getSession() {return this.session;}
    public String connect()
    {
        try {ClientManager.createClient().connectToServer(this, new URI("ws://localhost:80/veggiestore")); return "success";}
        catch (Exception e) {return "error";}
    }
    @OnOpen
    public void onOpen(Session session) {this.session = session;}
    @OnMessage
    public void onMessage(Session session, String message)
    {
        if (message.contains("correct")) {this.next.next.message = message;}
        else {this.next.next.next.next.message = message;}
    }
    @OnClose
    public void onClose(Session session) {}
    @Override
    public void start(Stage stage) throws Exception
    {
        Image icon = new Image("icon.png");
        stage.getIcons().add(icon); stage.setTitle("Admin Panel");
        this.base = this.loader.load(getClass().getResource("start.fxml").openStream());
        this.next = this.loader.getController(); this.next.setPrevious(this);
        this.scene = new Scene(this.base);
        stage.setResizable(false);
        stage.setScene(this.scene); stage.show();
    }
    public static void main(String[] args) throws Exception {launch();}
}