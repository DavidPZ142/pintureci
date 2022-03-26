package edu.eci.arsw.pintureci.controller;


import edu.eci.arsw.pintureci.model.Point;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class STOMPMessagesHandler {
    @Autowired
    SimpMessagingTemplate msgt;

    @MessageMapping("/draw")
    public void handleDrawEvent(String a) throws Exception{

        msgt.convertAndSend("/topic/draw", a);
    }

    @MessageMapping("/color")
    public void handleColorEvent(String color) throws Exception{

        msgt.convertAndSend("/topic/color", color);
    }

}



