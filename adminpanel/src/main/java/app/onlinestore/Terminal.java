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
import javafx.scene.control.Button;
import javafx.scene.control.ComboBox;
import javafx.scene.control.RadioButton;
import javafx.scene.control.TextArea;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class Terminal
{
    @FXML Button selectButton;
    @FXML ComboBox<String> targetSelect;
    @FXML TextArea message_box;
    @FXML Text error_message;
    @FXML Button addButton;
    @FXML Button deleteButton;
    @FXML Button modifyButton;
    @FXML RadioButton add_user_radio;
    @FXML RadioButton add_item_radio;

    public String content;
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
        this.message_box.setText(null); this.error_message.setText(null);
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
    }
    public void select_add_option(ActionEvent event) throws Exception
    {
        if ((event.getTarget().toString()).contains("User")) {
            this.add_user_radio.selectedProperty().setValue(true);
            this.add_item_radio.selectedProperty().setValue(false);
        } else {
            this.add_item_radio.selectedProperty().setValue(true);
            this.add_user_radio.selectedProperty().setValue(false);
        }
    }
    public void refresh_elements(ActionEvent event) throws Exception
    {
        this.error_message.setText(null);
        if (this.selectButton.getText().equals("Get Items")) {
            this.selectButton.setText("Get Users"); this.get_elements("items");
        } else {
            this.selectButton.setText("Get Items"); this.get_elements("users");
        }
    }
    public void get_elements(String type) throws Exception
    {
        this.session = this.previous.getSession(); this.message = null;
        this.targetSelect.setValue(null); this.targetSelect.setItems(null);
        ObservableList<String> options = FXCollections.observableArrayList();
        if (type.equals("users")) {
            this.content = "users"; this.session.getBasicRemote().sendText("admin-query get-elements terminal users");
        } else {
            this.content = "items"; this.session.getBasicRemote().sendText("admin-query get-elements terminal items");
        } while (this.message == null) {
            TimeUnit.MILLISECONDS.sleep(1);
        } String[] data = this.message.split("\n");
        for (int m = 0; m < data.length; m++) {
            options.add(data[m]);
        } this.targetSelect.setItems(options);
    }
    public void get_info(ActionEvent event) throws Exception
    {
        if (this.targetSelect.getValue() != null) {
            this.session = this.previous.getSession(); this.message = null; this.error_message.setText(null);
            if (this.content.equals("users")) {
                this.session.getBasicRemote().sendText("admin-query get-info terminal user " + this.targetSelect.getValue());
            } else {
                this.session.getBasicRemote().sendText("admin-query get-info terminal item " + this.targetSelect.getValue());
            } while (this.message == null) {
                TimeUnit.MILLISECONDS.sleep(1);
            } this.message_box.setText(this.message);
        }
    }
    public void modify_record(ActionEvent event) throws Exception
    {
        this.session = this.previous.getSession();
        this.error_message.setText(null); this.message = null;
        if (this.targetSelect.getValue() != null) {
            if (this.targetSelect.getValue().equals("admin@veggiestore.app")) {
                this.error_message.setText("Cannot modify administrator!");
            } else {
                if (this.content.equals("users")) {
                    this.session.getBasicRemote().sendText("admin-query modify user " + this.targetSelect.getValue() + " " + this.message_box.getText());
                } else {
                    this.session.getBasicRemote().sendText("admin-query modify item " + this.targetSelect.getValue() + " " + this.message_box.getText());
                } while (this.message == null) {TimeUnit.MILLISECONDS.sleep(1);}
                if (!this.message.equals("0")) {
                    this.error_message.setText("Modified an element"); this.get_elements(this.content);
                } else {
                    this.error_message.setText("Wrong data types!");
                }
            }
        } else {
            this.error_message.setText("Select something!");
        }     
    }
    public void delete_record(ActionEvent event) throws Exception
    {
        this.session = this.previous.getSession();
        this.error_message.setText(null); this.message = null;
        if (this.targetSelect.getValue() != null) {
            if (this.targetSelect.getValue().equals("admin@veggiestore.app")) {
                this.error_message.setText("Cannot delete administrator!");
            } else {
                if (this.content.equals("users")) {
                    this.session.getBasicRemote().sendText("admin-query delete user " + this.targetSelect.getValue());
                } else {
                    this.session.getBasicRemote().sendText("admin-query delete item " + this.targetSelect.getValue());
                } while (this.message == null) {TimeUnit.MILLISECONDS.sleep(1);}
                if (!this.message.equals("0")) {
                    this.error_message.setText("Deleted an element"); this.get_elements(this.content);
                } else {
                    this.error_message.setText("Unknown error while deleting!");
                }
            }
        } else {
            this.error_message.setText("Select something!");
        }
    }
    public void add_record(ActionEvent event) throws Exception
    {
        // this.session = this.previous.getSession();
        // this.error_message.setText(null); this.message = null;
        // if (this.content.equals("users")) {
        //     this.session.getBasicRemote().sendText("admin-query add user " + this.message_box.getText());
        // } else {
        //     this.session.getBasicRemote().sendText("admin-query add item " + this.message_box.getText());
        // } while (this.message == null) {TimeUnit.MILLISECONDS.sleep(1);}
        // if (!this.message.equals("0")) {
        //     this.error_message.setText("Added an element"); this.get_elements(this.content);
        // } else {
        //     this.error_message.setText("Unknown error while adding!");
        // }
    }
}
