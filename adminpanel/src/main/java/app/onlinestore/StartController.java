package app.onlinestore;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.paint.Color;
import javafx.scene.shape.Circle;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class StartController
{
    @FXML Circle connect_indicator;
    @FXML Label connect_status;
    @FXML Button connect_button;
    @FXML Text connect_message;
    @FXML Button start_button;

    private FXMLLoader loader = new FXMLLoader();
    private Scene1 scene1;
    public Stage stage;
    public Scene scene;
    public Parent root;

    public void connect(ActionEvent event) throws Exception
    {
        if (this.root == null) {this.root = this.loader.load(getClass().getResource("scene1.fxml").openStream()); this.scene1 = this.loader.getController();}
        if (connect_button.getText().contains("Disconnect"))
        {
            this.scene1.getSession().getBasicRemote().sendText("connection-close-try");
            connect_indicator.setFill(new Color(1, 0, 0, 1));
            connect_status.setText("Disconnected");
            connect_button.setText("Connect");
            start_button.setDisable(true);
        }
        else
        {
            String status = this.scene1.connect();
            if (status.contains("Success"))
            {
                connect_message.setText("");
                connect_indicator.setFill(new Color(0, 1, 0, 1));
                connect_status.setText("Connected");
                connect_button.setText("Disconnect");
                start_button.setDisable(false);
            }
            else {connect_message.setText("Cannot connect");}
        }
    }

    public void enter(ActionEvent event) throws Exception
    {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.scene = new Scene(this.root);
        this.stage.setScene(this.scene);
        this.stage.show();
    }
}
