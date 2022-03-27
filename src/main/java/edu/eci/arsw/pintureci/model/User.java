package edu.eci.arsw.pintureci.model;

public class User {
    private String name = null;
    private String id= null;

    public User(String name, String id){
        this.name = name;
        this.id = id;
    }
    public User() {
    }
    public String getName(){
        return  name;
    }
    public String getId(){
        return id;
    }
}
