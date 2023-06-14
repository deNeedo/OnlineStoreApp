package app.onlinestore;

import javax.websocket.Session;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Node;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.text.Text;
import javafx.stage.Stage;

public class Scene2
{
    @FXML Text error_message;

    private FXMLLoader loader = new FXMLLoader();
    private FXMLLoader loader2 = new FXMLLoader();
    public Scene1 previous;
    public Session session;
    public Terminal next;
    public Stats next2;
    public Parent base;
    public Parent base2;
    public Stage stage;
    public Scene scene;
    public Scene scene2;

    public Session getSession() {return this.session;}
    public void setPrevious(Scene1 previous) {this.previous = previous;}
    public void logout(ActionEvent event) throws Exception
    {
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        this.stage.setScene(this.previous.previous.scene); this.stage.show();
    }
    public void terminal(ActionEvent event) throws Exception
    {
        this.session = this.previous.getSession();
        if (this.base == null)
        {
            this.base = this.loader.load(getClass().getResource("terminal.fxml").openStream());
            this.next = this.loader.getController(); this.next.setPrevious(this);
        }
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        if (this.scene == null) {this.scene = new Scene(this.base);}
        this.stage.setScene(this.scene); this.stage.show();
        this.next.selectButton.setText("Get Items"); this.next.get_elements("users"); this.next.content = "users";
    }
    public void stats(ActionEvent event) throws Exception
    {
        this.session = this.previous.getSession();
        if (this.base2 == null)
        {
            this.base2 = this.loader2.load(getClass().getResource("stats.fxml").openStream());
            this.next2 = this.loader2.getController(); this.next2.setPrevious(this);
        }
        this.stage = (Stage)((Node)event.getSource()).getScene().getWindow();
        this.stage.setResizable(false);
        if (this.scene2 == null) {this.scene2 = new Scene(this.base2);}
        this.next2.get_elements(); this.stage.setScene(this.scene2); this.stage.show();
    }
}
