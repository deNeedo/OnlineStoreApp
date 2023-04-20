package app.onlinestore;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
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
public class Scene1
{
    @FXML
    TextField txtButton;

    @FXML
    TextField passButton;

    @FXML
    AnchorPane scenePane;

    @FXML
    Label errMess;

    public Stage stage;
    public Scene scene;
    public Parent root;
    public static Session session;
    public static String result = "";

    public static void setSession(Session session) {Scene1.session = session;}

    public void login(ActionEvent event) throws Exception
    {
        ClientManager client = ClientManager.createClient();
        client.connectToServer(Scene1.class, new URI("ws://localhost:80/app/onlinestore"));
        String login = txtButton.getText();
        String pass = passButton.getText();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("scene2.fxml"));
        root = loader.load();

        Scene2 scene2 = loader.getController();
        scene2.displayName();
        stage = (Stage) ((Node) event.getSource()).getScene().getWindow();

        if(login.isEmpty())
        {
            errMess.setText("Write your username");
            Scene1.session.getBasicRemote().sendText("connection-close-try");
        }
        else
        {
            if(pass.isEmpty())
            {
                errMess.setText("Write your password");
                Scene1.session.getBasicRemote().sendText("connection-close-try");
            }
            else
            {
                session.getBasicRemote().sendText("admin-login-try " + login + " " + pass);
                if (result.equals("found"))
                {
                    scene = new Scene(root);
                    stage.setScene(scene);
                    stage.show();
                }
                else
                {
                    errMess.setText("Wrong login/password");
                    Scene1.session.getBasicRemote().sendText("connection-close-try");
                }
            }
        }
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