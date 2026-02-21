package com.example.medvisionbackend.configurations;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Logger;

@Configuration
public class FireStoreConfig {
    private Firestore db;
    private FirebaseOptions options;
    private boolean initialized = false;
    private static final Logger logger = Logger.getLogger(FireStoreConfig.class.getName());
    @Value("classpath:med-vision-dd803-firebase-adminsdk-fbsvc-b2d1e45f07.json")
    private Resource serviceJson;
    public Firestore initializeFirestore() {
        // Firestore initialization logic
        try {
            InputStream serviceAccount = serviceJson.getInputStream();
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            logger.info("service account" + serviceAccount.toString());
            logger.info("credentails: " + credentials.toString());
            options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .build();

            // Check if FirebaseApp already exists
            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
            }

            db = FirestoreClient.getFirestore();
            initialized = true;
            return db;

        } catch (IOException e) {
            System.err.println("Warning: Could not initialize Firestore with default credentials.");
            System.err.println("Please set up Application Default Credentials: https://cloud.google.com/docs/authentication/external/set-up-adc");
            System.err.println("Application will continue but Firestore operations will fail.");
            // Don't throw exception - allow app to start
            return null;
        }
    }
}
