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
import javafx.stage.Stage;

public class Scene2
{
    @FXML Label nameLabel;
    @FXML Button Terminal;

    private FXMLLoader loader = new FXMLLoader();
    public Scene1 previous;
    public Session session;
    public Terminal next;
    public Parent base;
    public Stage stage;
    public Scene scene;

    public Session getSession() {return this.session;}
    public void setPrevious(Scene1 previous) {this.previous = previous;}
    public void logout(ActionEvent event) throws Exception
    {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
    }

    public void Term(ActionEvent event) throws Exception
    {
        if (this.base == null)
        {
            this.base = this.loader.load(getClass().getResource("terminal.fxml").openStream());
            this.next = this.loader.getController(); this.next.setPrevious(this); this.session = this.previous.getSession();
        }
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        if (this.scene == null) {this.scene = new Scene(this.base);}
        this.stage.setScene(this.scene); this.stage.show();
    }
}
