package edu.escuelaing.arsw.tictactoeReact.endpoints;

import java.io.IOException;
import java.util.logging.Level;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

/**
 * @author Vashi
 */
@Component
@ServerEndpoint("/tictactoe")
public class TictactoeEndPoint {

    private static final Logger logger
            = Logger.getLogger(TictactoeEndPoint.class.getName());
    
    static ConcurrentHashMap<String, Session[]> salas = new ConcurrentHashMap<String, Session[]>();

    Session sesion;
    String sala;

    public TictactoeEndPoint() {
        this.sesion = null;
        this.sala = "";
    }
    
    @OnOpen
    public void openConnection(Session session) {

        /* Register this connection in the queue */
        this.sesion = session;
        logger.log(Level.INFO, "Connection opened.");
        try {
            session.getBasicRemote().sendText("Connection established.");
        } catch (IOException ex) {
            Logger.getLogger(TictactoeEndPoint.class.getName()).log(Level.SEVERE, null, ex);
        }
    }


    @OnClose
    public void closedConnection(Session session) {
        /* Remove this connection from the hashmap */
        Session[] competidores = salas.get(sala);
        if (competidores != null) {
            if (competidores[0] == sesion) {
                competidores[0] = null;
            } else {
                competidores[1] = null;
            }
            if (competidores[0] == null && competidores[1] == null) {
                salas.remove(sala);
            }
        }
        logger.log(Level.INFO, "Connection closed.");
    }


    @OnError
    public void error(Session session, Throwable t) {
        /* Remove this connection from the queue */
        salas.remove(session);
        logger.log(Level.INFO, t.toString());
        logger.log(Level.INFO, "Connection error.");
    }
    
}
