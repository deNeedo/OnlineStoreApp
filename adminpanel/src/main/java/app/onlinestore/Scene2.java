package app.onlinestore;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Label;
import javafx.event.ActionEvent;
import javafx.stage.Stage;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.Node;

import java.io.*;
import java.net.*;

public class Scene2
{
    @FXML
    Label nameLabel;

    public Stage stage;
    public Scene scene;
    public Parent root;
    public Socket socket;
    public DataOutputStream dos;
    public BufferedReader br;

    public void logout(ActionEvent event) throws Exception
    {
            FXMLLoader loader = new FXMLLoader(getClass().getResource("scene1.fxml"));
            root = loader.load();
            loader.getController();
            stage = (Stage) ((Node) event.getSource()).getScene().getWindow();
            scene = new Scene(root);
            stage.setScene(scene);
            stage.show();
        dos.close();
        br.close();
        socket.close();
    }

    public void displayName(String username)
    {
        nameLabel.setText("Welcome to Admin Panel");
    }
}
