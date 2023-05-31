package app.onlinestore;

import javax.websocket.Session;

import org.w3c.dom.events.Event;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class Scene2
{
    @FXML
    Label nameLabel;

    @FXML
    Button Terminal;

    public Scene1 previous;
    public Session session;
    public Parent base;
    public Stage stage;
    public Scene scene;
    public Terminal terminal;

    public void setPrevious(Scene1 previous) {this.previous = previous;}
    public void logout(ActionEvent event) throws Exception
    {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
    }

    public void Term(ActionEvent event) throws Exception{
            base = FXMLLoader.load(getClass().getResource("terminal.fxml"));
            stage = (Stage)((Node)event.getSource()).getScene().getWindow();
            scene = new Scene(base);
            stage.setScene(scene);
            stage.show();
    }
}
