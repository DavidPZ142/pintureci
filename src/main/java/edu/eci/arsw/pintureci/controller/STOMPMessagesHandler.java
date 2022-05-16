package edu.eci.arsw.pintureci.controller;



import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.SecureRandom;
import java.util.Random;

@Controller
public class STOMPMessagesHandler {
    @Autowired
    SimpMessagingTemplate msgt;

    @MessageMapping("/draw")
    public void handleDrawEvent(String a) throws Exception {

        msgt.convertAndSend("/topic/draw", a);
    }

    @MessageMapping("/color")
    public void handleColorEvent(String color) throws Exception {

        msgt.convertAndSend("/topic/color", color);
    }

    @MessageMapping("/word")
    public void handleWord(String word) throws Exception {
        String[] lista = {"Decano","Manchas","EdificioG","Puente","K1","Laboratorio","AGEO"};
        Random rand = new SecureRandom();
        int number = rand.nextInt(lista.length);
        String wordSend = lista[number];
        msgt.convertAndSend("/topic/word", wordSend);
    }

    @MessageMapping("/message")
    public void handleChat(String mensaje) {
        System.out.println("message: "+ mensaje);
        msgt.convertAndSend("/topic/message", mensaje);
    }
}



