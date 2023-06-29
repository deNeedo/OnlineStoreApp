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
    public StartController previous;
    public Session session;
    public String message;
    public Scene2 next;
    public Parent base;
    public Stage stage;
    public Scene scene;

    public Session getSession() {return this.session;}
    public void setPrevious(StartController previous) {this.previous = previous;}
    public void login(ActionEvent event) throws Exception
    {
        this.session = this.previous.getSession();
        if (this.base == null)
        {
            this.base = this.loader.load(getClass().getResource("scene2.fxml").openStream());
            this.next = this.loader.getController(); this.next.setPrevious(this);
        }
        String login = txtButton.getText();
        String pass = passButton.getText();
        if (login.isEmpty()) {errMess.setText("Write your username");}
        else
        {
            if (pass.isEmpty()) {errMess.setText("Write your password");}
            else
            {
                this.session.getBasicRemote().sendText("admin-login " + login + " " + pass);
                while (this.message == null) {TimeUnit.MILLISECONDS.sleep(1);}
                if (this.message.equals("success"))
                {
                    this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
                    this.stage.setResizable(false); errMess.setText(""); txtButton.setText(""); passButton.setText("");
                    if (this.scene == null) {this.scene = new Scene(this.base);}
                    this.stage.setScene(this.scene); this.stage.show();
                }
                else {errMess.setText("Wrong login/password");}
                this.message = null;
            }
        }
    }
    public void exit(ActionEvent event)
    {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
    }
}