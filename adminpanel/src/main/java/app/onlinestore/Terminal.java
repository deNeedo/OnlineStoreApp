package app.onlinestore;

import javax.websocket.Session;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

public class Terminal
{
    @FXML
    Label result_field;

    @FXML
    TextField query_field;

    @FXML
    Button execute_button;

    @FXML
    Button leave_button;

    public Scene2 previous;
    public Session session;
    public Parent base;
    public Stage stage;
    public Scene scene;

    public void leave(ActionEvent event) throws Exception{
        base = FXMLLoader.load(getClass().getResource("scene2.fxml"));
        stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        scene = new Scene(base);
        stage.setScene(scene);
        stage.show();
    }

    public void psql(ActionEvent event) throws Exception{
        //writing a query
        String query = query_field.getText();
    }

    public void execute(ActionEvent event) throws Exception{
        //execute the query
    }

    public void show(ActionEvent event) throws Exception{
        //showing a result 
    }
}
