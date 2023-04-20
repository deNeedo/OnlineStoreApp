package app.onlinestore;

import java.util.logging.Logger;
import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.CloseReason.CloseCodes;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/onlinestore")
public class AppServerEndpoint
{
    private Logger logger = Logger.getLogger(this.getClass().getName());
    @OnOpen
    public void onOpen(Session session) {logger.info("Connection " + session.getId() + " established.");}
    @OnMessage
    public String onMessage(Session session, String message) throws Exception
    {
        logger.info(message);
        if (message.contains("admin-login-try")) {return App.admin_login(message);}
        else if (message.contains("client-login-try")) {return App.client_login(message);}
        else if (message.contains("client-register-try")) {return App.client_register(message);}
        else {session.close(new CloseReason(CloseCodes.NORMAL_CLOSURE, "")); return null;}
    }
    @OnClose
    public void onClose(Session session, CloseReason closeReason) {logger.info("Connection " + session.getId() + " closed.");}
}