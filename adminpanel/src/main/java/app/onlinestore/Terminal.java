package app.onlinestore;

import javax.websocket.Session;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
// import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextArea;
import javafx.scene.control.TextField;
import javafx.stage.Stage;

import java.util.concurrent.TimeUnit;

public class Terminal
{
    @FXML TextArea result_field;
    @FXML TextField query_field;
    @FXML Button execute_button;
    @FXML Button leave_button;

    // private FXMLLoader loader = new FXMLLoader();
    public Scene2 previous;
    public Session session;
    public String message;
    public Parent base;
    public Stage stage;
    public Scene scene;

    public Session getSession() {return this.session;}
    public void setPrevious(Scene2 previous) {this.previous = previous;}

    public void leave(ActionEvent event) throws Exception {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
        this.result_field.setText(""); this.query_field.setText("");
    }

    public void execute(ActionEvent event) throws Exception {
        this.result_field.setText("");
        if (this.session == null) {this.session = this.previous.getSession();}
        // execute the query
        String query = this.query_field.getText();
        this.session.getBasicRemote().sendText("admin-query:" + query);
        while (this.message == null) {TimeUnit.MILLISECONDS.sleep(1);}
        this.result_field.setText(this.message);
    }

    public void show(ActionEvent event) throws Exception {
        // showing a result 
    }
}
