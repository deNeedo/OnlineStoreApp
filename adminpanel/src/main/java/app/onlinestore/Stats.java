package app.onlinestore;

import java.util.concurrent.TimeUnit;

import javax.websocket.Session;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextArea;
import javafx.stage.Stage;

public class Stats
{
    @FXML TextArea message_box;
    @FXML ComboBox<String> targetSelect;

    public Scene2 previous;
    public Session session;
    public String message;
    public Parent base;
    public Stage stage;
    public Scene scene;

    public Session getSession() {return this.session;}
    public void setPrevious(Scene2 previous) {this.previous = previous;}
    public void leave(ActionEvent event) throws Exception
    {
        this.message_box.setText(null);
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
    }
    public void get_elements() throws Exception
    {
        this.session = this.previous.getSession(); this.message = null;
        this.targetSelect.setValue(null); this.targetSelect.setItems(null);
        ObservableList<String> options = FXCollections.observableArrayList();
        this.session.getBasicRemote().sendText("admin-query get-elements stats users");
        while (this.message == null) {TimeUnit.MILLISECONDS.sleep(1);}
        String[] data = this.message.split("\n");
        for (int m = 0; m < data.length; m++) {
            options.add(data[m]);
        } this.targetSelect.setItems(options);
    }
    public void get_info(ActionEvent event) throws Exception
    {
        if (this.targetSelect.getValue() != null) {
            this.session = this.previous.getSession(); this.message = null;
            this.session.getBasicRemote().sendText("admin-query get-info stats user " + targetSelect.getValue());
            while (this.message == null) {
                TimeUnit.MILLISECONDS.sleep(1);
            } this.message_box.setText(this.message);
        }
    }
}
