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

import java.io.*;
import java.net.*;

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
    public Socket socket;
    public DataOutputStream dos;
    public BufferedReader br;

    public void login(ActionEvent event) throws Exception
    {
        // Create client socket
        socket = new Socket("localhost", 888);
        // to send data to the server
        dos = new DataOutputStream(socket.getOutputStream());
        // to read data coming from the server
        br = new BufferedReader(new InputStreamReader(socket.getInputStream()));

        String username = txtButton.getText();
        String pass = passButton.getText();
        FXMLLoader loader = new FXMLLoader(getClass().getResource("scene2.fxml"));
        this.root = loader.load();

        Scene2 scene2 = loader.getController();
        scene2.socket = socket;
        scene2.dos = dos;
        scene2.br = br;
        scene2.displayName(username);
        this.stage = (Stage) ((Node) event.getSource()).getScene().getWindow();

        if(username.isEmpty())
        {
            errMess.setText("Write your username");
            dos.close();
            br.close();
            socket.close();
        }
        else
        {
            if(pass.isEmpty())
            {
                errMess.setText("Write your password");
                dos.close();
                br.close();
                socket.close();
            }
            else
            {
                dos.writeBytes(username + " " + pass + "\n");
                if (br.readLine().equals("one"))
                {
                    scene = new Scene(root);
                    stage.setScene(scene);
                    stage.show();
                }
                else
                {
                    errMess.setText("Wrong login/password");
                    dos.close();
                    br.close();
                    socket.close();
                }
            }
        }
    }
}