package edu.eci.arsw.pintureci.controller;

import edu.eci.arsw.pintureci.PintureciApplication;
import edu.eci.arsw.pintureci.model.User;
import edu.eci.arsw.pintureci.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping(value = "/v1/user")
public class UserController {

    @Autowired
    UserService uss;

    @PostMapping ("/saveUser")
    public ResponseEntity<?> saveUser(@RequestBody User user){
        try{
            System.out.println("Usuario Agregado: "+ user.getName());
            uss.saveUser(user);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }catch (Exception e ){
            Logger.getLogger(PintureciApplication.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("No se pudo crear ", HttpStatus.FORBIDDEN);
        }
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getUser (@PathVariable String name){
        try{
            return new ResponseEntity<>(uss.getUser(name),HttpStatus.ACCEPTED);
        }catch (Exception e){
            Logger.getLogger(PintureciApplication.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("User no encontrado", HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(){
        try{
            return  new ResponseEntity<>(uss.getAllUsers(),HttpStatus.ACCEPTED);

        }catch (Exception e){
            Logger.getLogger(PintureciApplication.class.getName()).log(Level.SEVERE, null, e);
            return new ResponseEntity<>("User no encontrado", HttpStatus.NOT_FOUND);
        }
    }
}
