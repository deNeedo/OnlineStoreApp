package app.onlinestore;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javax.websocket.Session;
import javafx.event.ActionEvent;
import javafx.stage.Stage;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.Node;

public class Scene2
{
    @FXML
    Label nameLabel;

    public Stage stage;
    public Scene scene;
    public Parent root;
    public Session session;

    public void logout(ActionEvent event) throws Exception
    {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("scene1.fxml"));
        root = loader.load();
        loader.getController();
        stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();
    }

    public void displayName()
    {
        nameLabel.setText("Welcome to Admin Panel");
    }
}
