package app.onlinestore;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.stage.Stage;
import java.net.URI;
import javax.websocket.ClientEndpoint;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import org.glassfish.tyrus.client.ClientManager;

@ClientEndpoint
public class StartController
{
    @FXML
    Label TopText;

    @FXML
    TextField ClickButton;

    public Stage stage;
    public Scene scene;
    public Parent root;
    public Session session;

    public void enter(ActionEvent event) throws Exception
    {
        ClientManager client = ClientManager.createClient();
        client.connectToServer(StartController.class, new URI("ws://localhost:80/app/onlinestore"));
        FXMLLoader loader = new FXMLLoader(getClass().getResource("scene1.fxml"));
        root = loader.load();
        stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }
    @OnOpen
    public void onOpen(Session session) {Scene1.setSession(session);}
    @OnMessage
    public void onMessage(Session session, String message)
    {
        if (message.contains("found")) {Scene1.result = message;}
    }
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {}
}
