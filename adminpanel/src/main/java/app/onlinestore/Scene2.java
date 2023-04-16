package app.onlinestore;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.event.ActionEvent;
import javafx.stage.Stage;
import javafx.scene.Parent;
import javafx.scene.Scene;

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
        dos.close();
        br.close();
        socket.close();
    }

    public void displayName(String username)
    {
        nameLabel.setText("Welcome to Admin Panel");
    }
}
