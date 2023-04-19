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

import java.io.IOException;

public class StartController {
    @FXML
    Label TopText;

    @FXML
    TextField ClickButton;

    public Stage stage;
    public Scene scene;
    public Parent root;

    public void enter(ActionEvent event) throws IOException {

        FXMLLoader loader = new FXMLLoader(getClass().getResource("scene1.fxml"));
        root = loader.load();
        stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
        scene = new Scene(root);
        stage.setScene(scene);
        stage.show();


    }

}
