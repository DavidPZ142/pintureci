package edu.eci.arsw.pintureci.persistence.impl;

import edu.eci.arsw.pintureci.model.User;
import edu.eci.arsw.pintureci.persistence.UserPersistence;
import edu.eci.arsw.pintureci.persistence.UserPersistenceException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@Qualifier("Memory")
public class InMemoryUserPersistence implements UserPersistence {

    private final Map<String, User> users = new ConcurrentHashMap<>();
    public InMemoryUserPersistence(){
        User user = new User("David", "1");
        User user2= new User("Prueba", "2");
        users.put(user.getName(), user );
        users.put(user2.getName(), user2);



    }

    @Override
    public void saveUser(User user) throws UserPersistenceException {
        users.put(user.getName(), user);
    }

    @Override
    public User getUser(String name) throws UserPersistenceException {
        return  users.get(name);
    }

    @Override
    public Set<User> getAllUsers() throws UserPersistenceException {
        Set<User> hs = new HashSet<>();
        for(String i : users.keySet()){
            hs.add(users.get(i));
        }
        return hs;
    }
}
