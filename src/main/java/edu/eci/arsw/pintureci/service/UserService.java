package edu.eci.arsw.pintureci.service;

import edu.eci.arsw.pintureci.model.User;
import edu.eci.arsw.pintureci.persistence.UserPersistence;
import edu.eci.arsw.pintureci.persistence.UserPersistenceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class UserService {
    @Autowired
    @Qualifier("Memory")
    private UserPersistence upp;

    public void saveUser(User user) throws UserPersistenceException {
        upp.saveUser(user);
    }

    public User getUser(String name) throws UserPersistenceException{
        return upp.getUser(name);
    }

    public Set<User> getAllUsers() throws UserPersistenceException{
        return upp.getAllUsers();
    }
}
