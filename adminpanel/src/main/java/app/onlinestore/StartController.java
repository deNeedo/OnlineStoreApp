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
    private AdminPanel previous;
    private Session session;
    public Scene1 next;
    private Parent base;
    private Stage stage;

    public Session getSession() {return this.session;}
    public void setPrevious(AdminPanel previous) {this.previous = previous;}
    public void connect(ActionEvent event) throws Exception
    {
        if (this.base == null)
        {
            this.base = this.loader.load(getClass().getResource("scene1.fxml").openStream());
            this.next = this.loader.getController(); this.next.setPrevious(this); 
        }
        if (connect_button.getText().contains("Disconnect"))
        {
            this.session.getBasicRemote().sendText("connection-close-try");
            connect_indicator.setFill(new Color(1, 0, 0, 1));
            connect_status.setText("Disconnected");
            connect_button.setText("Connect");
            start_button.setDisable(true);
        }
        else
        {
            String status = this.previous.connect();
            if (status.contains("success"))
            {
                this.session = this.previous.getSession();
                connect_message.setText("");
                connect_indicator.setFill(new Color(0, 1, 0, 1));
                connect_status.setText("Connected");
                connect_button.setText("Disconnect");
                start_button.setDisable(false);
            }
            else
            {
                connect_message.setText("Cannot connect");
            }
        }
    }

    public void enter(ActionEvent event) throws Exception
    {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setScene(new Scene(this.base)); this.stage.show();
    }
}
