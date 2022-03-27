package edu.eci.arsw.pintureci.persistence;

import edu.eci.arsw.pintureci.model.User;

import java.util.Set;

public interface UserPersistence {

    public void saveUser(User user) throws UserPersistenceException;
    public User getUser(String name) throws UserPersistenceException;
    public Set<User> getAllUsers() throws UserPersistenceException;

}
