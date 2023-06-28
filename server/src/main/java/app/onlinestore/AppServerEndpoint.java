package app.onlinestore;

import java.util.logging.Logger;
import javax.websocket.CloseReason;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.CloseReason.CloseCodes;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint(value = "/veggiestore")
public class AppServerEndpoint
{
    private Logger logger = Logger.getLogger(this.getClass().getName());
    @OnMessage
    public String onMessage(Session session, String message) throws Exception
    {
        logger.info(message + "\n");
        if (message.contains("admin-login")) {return App.login(message);}
        else if (message.contains("employee-login")) {return App.login(message);}
        else if (message.contains("client-login")) {return App.login(message);}
        else if (message.contains("employee-register")) {return App.register(message);}
        else if (message.contains("client-register")) {return App.register(message);}
        else if (message.contains("admin-query")) {return App.admin_query(message);}
        else if (message.contains("get-products")) {return App.get_products(message);}
        else {session.close(new CloseReason(CloseCodes.NORMAL_CLOSURE, "")); return null;}
    }
}