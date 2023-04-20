package app.onlinestore;

import java.util.concurrent.TimeUnit;
import javax.websocket.Session;
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
    public static String result;

    public static void setSession(Session session) {Scene1.session = session;}

    public void login(ActionEvent event) throws Exception
    {
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
        }
        else
        {
            if(pass.isEmpty())
            {
                errMess.setText("Write your password");
            }
            else
            {
                session.getBasicRemote().sendText("admin-login-try " + login + " " + pass);
                TimeUnit.MILLISECONDS.sleep(100);
                if (result.equals("found"))
                {
                    scene = new Scene(root);
                    stage.setScene(scene);
                    stage.show();
                }
                else
                {
                    errMess.setText("Wrong login/password");
                }
            }
        }
    }
}