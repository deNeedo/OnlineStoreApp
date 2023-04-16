package app.onlinestore;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.event.ActionEvent;

public class Scene2
{
    @FXML
    Label nameLabel;

    public void logout(ActionEvent event) throws Exception
    {
        
    }

    public void displayName(String username)
    {
        nameLabel.setText("Welcome to Admin Panel");
    }
}
