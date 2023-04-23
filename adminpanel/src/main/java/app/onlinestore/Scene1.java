package app.onlinestore;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

import java.util.concurrent.TimeUnit;

import javax.websocket.Session;

public class Scene1
{
    @FXML TextField txtButton;
    @FXML PasswordField passButton;
    @FXML AnchorPane scenePane;
    @FXML Label errMess;

    private FXMLLoader loader = new FXMLLoader();
    private StartController previous;
    private Session session;
    private String message;
    public Scene2 next;
    private Parent base;
    private Stage stage;

    public Session getSession() {return this.session;}
    public void setPrevious(StartController previous) {this.previous = previous;}
    public void setMessage(String message) {this.message = message;}
    public void login(ActionEvent event) throws Exception
    {
        if (this.base == null)
        {
            this.base = this.loader.load(getClass().getResource("scene2.fxml").openStream());
            this.next = this.loader.getController(); this.next.setPrevious(this); this.session = this.previous.getSession();
        }
        String login = txtButton.getText();
        String pass = passButton.getText();

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
                this.session.getBasicRemote().sendText("admin-login-try " + login + " " + pass);
                TimeUnit.MILLISECONDS.sleep(100);
                if (this.message.contains("success"))
                {
                    this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
                    stage.setResizable(false);
                    this.stage.setScene(new Scene(this.base)); this.stage.show();
                }
                else
                {
                    errMess.setText("Wrong login/password");
                }
            }
        }
    }
}