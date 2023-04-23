package app.onlinestore;

import javax.websocket.Session;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class Scene2
{
    @FXML
    Label nameLabel;

    private FXMLLoader loader = new FXMLLoader();
    private Scene1 previous;
    private Session session;
    private Parent base;
    private Stage stage;

    public void setPrevious(Scene1 previous) {this.previous = previous;}
    public void logout(ActionEvent event) throws Exception
    {
        if (this.base == null)
        {
            this.base = this.loader.load(getClass().getResource("scene1.fxml").openStream());
            this.session = this.previous.getSession();
        }
        this.session.getBasicRemote().sendText("connection-close-try");
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(new Scene(this.base)); this.stage.show();
    }
}
