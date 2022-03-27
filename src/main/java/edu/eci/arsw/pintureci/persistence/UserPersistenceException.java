package edu.eci.arsw.pintureci.persistence;



public class UserPersistenceException extends  Exception{

    public UserPersistenceException (String message){
        super (message);
    }

    public UserPersistenceException(String message , Throwable cause ){
        super(message, cause);
    }
}
