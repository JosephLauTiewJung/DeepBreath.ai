package com.example.medvisionbackend.repositories;

import com.example.medvisionbackend.configurations.FireStoreConfig;
import com.example.medvisionbackend.pojo.UserPojo;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.WriteResult;
import org.springframework.stereotype.Repository;

import java.util.concurrent.ExecutionException;

@Repository
public class UserRepository {
    Firestore db;
    public UserRepository(FireStoreConfig fireStoreConfig) {
        this.db = fireStoreConfig.initializeFirestore();
    }

    // save
    public String saveUser(UserPojo userPojo) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> collectionsApiFuture = db.collection("users").document(userPojo.getUsername()).set(userPojo);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    // update
    public String updateUser(UserPojo userPojo) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> collectionsApiFuture = db.collection("users").document(userPojo.getUsername()).set(userPojo);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    // delete
    public String deleteUser(String username) {
        db.collection("users").document(username).delete();
        return "Document with ID " + username + " has been deleted";
    }

    // find by id
    public UserPojo getUser(String username) throws ExecutionException, InterruptedException {
        DocumentReference docRef = db.collection("users").document(username);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();
        if(document.exists()) {
            return document.toObject(UserPojo.class);
        } else {
            return null;
        }
    }
}
