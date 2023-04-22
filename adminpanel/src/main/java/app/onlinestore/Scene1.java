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
    @FXML TextField txtButton;
    @FXML TextField passButton;
    @FXML AnchorPane scenePane;
    @FXML Label errMess;

    private FXMLLoader loader = new FXMLLoader();
    private Session session1;
    private String result = "not found";
    private Scene2 scene2;
    public Stage stage;
    public Scene scene;
    public Parent root;

    public Session getSession() {return this.session1;}

    public String connect()
    {
        try {this.session1 = ClientManager.createClient().connectToServer(Scene1.class, new URI("ws://localhost:80/app/onlinestore"));}
        catch (Exception e) {e.printStackTrace(); return "Error";}
        return "Success";
    }

    public void login(ActionEvent event) throws Exception
    {
        if (this.root == null) {this.root = this.loader.load(getClass().getResource("scene2.fxml").openStream()); this.scene2 = this.loader.getController();}
        String login = txtButton.getText();
        String pass = passButton.getText();

        this.scene2.displayName();

        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();

        if(login.isEmpty())
        {
            errMess.setText("Write your username");
        }
        else
        {
            if(pass.isEmpty())
            {
                errMess.setText("Write your password");
            }
            else
            {
                session1.getBasicRemote().sendText("admin-login-try " + login + " " + pass);
                if (this.result.equals("found"))
                {
                    this.scene = new Scene(this.root);
                    this.stage.setScene(this.scene);
                    this.stage.show();
                }
                else
                {
                    errMess.setText("Wrong login/password");
                }
            }
        }
    }
    @OnOpen
    public void onOpen(Session session) {}
    @OnMessage
    public void onMessage(Session session, String message)
    {
        if (message.contains("found")) {this.result = message;}
    }
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {}
    
}