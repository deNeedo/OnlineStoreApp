package app.onlinestore;

import javax.websocket.Session;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class Scene2
{
    @FXML
    Label nameLabel;

    public Scene1 previous;
    public Session session;
    public Parent base;
    public Stage stage;
    public Scene scene;

    public void setPrevious(Scene1 previous) {this.previous = previous;}
    public void logout(ActionEvent event) throws Exception
    {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
    }
}
