package com.example.medvisionbackend.controllers;
import com.example.medvisionbackend.mappers.AnalyzedResponseMapper;
import com.example.medvisionbackend.pojo.UserPojo;
import com.example.medvisionbackend.repositories.UserRepository;
import com.example.medvisionbackend.services.FileService;
import com.google.cloud.firestore.Blob;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

@RestController
@CrossOrigin(
        origins = "*",
        allowedHeaders = "*"
)

public class UserController {
    UserRepository userRepository;
    FileService fileService;
    private static final Logger logger = Logger.getLogger(UserController.class.getName());
    public UserController(UserRepository userRepository, FileService fileService) {
        this.userRepository = userRepository;
        this.fileService = fileService;
    }

    // upload document
    @PostMapping("/saveUser")
    public ResponseEntity<String> uploadDocument(@RequestParam MultipartFile xray,
                                 @RequestParam MultipartFile report,
                                 @RequestParam String userId) {
        // save xray and report to local storage and save the paths to firestore
        try {
            fileService.saveReportFile(userId, report);
            fileService.saveXrayFile(userId, xray);
            String xrayPath = "src/main/resources/static/xrays/" + userId + "/xray.png";
            String reportPath = "src/main/resources/static/reports/" + userId + "/report.pdf";
            String annotatedXrayPath = "src/main/resources/static/annotatedXray/" + userId + "/annotatedXray.png";
            logger.info(xrayPath);
            UserPojo userPojo = new UserPojo(userId, xrayPath, reportPath, annotatedXrayPath, null);
            if (userRepository.getUser(userId) != null) {
                userRepository.updateUser(userPojo);
                return ResponseEntity.ok("User updated successfully");
            }
            else {
                userRepository.saveUser(userPojo);
                return ResponseEntity.ok("User saved successfully");
            }
        }
        catch (Exception e) {
            logger.warning(e.getMessage());
            return ResponseEntity.internalServerError().body("Error saving user: " + e.getMessage());
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<UserPojo> getUser(@RequestParam String userId) {
        try {
            UserPojo user = userRepository.getUser(userId);
            return ResponseEntity.ok(user);
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/userXray")
    public ResponseEntity<Resource> getUserXray(@RequestParam String userId) {
        // get the file url from firestore and return the file from the local storage
        try {
            UserPojo user = userRepository.getUser(userId);
            if (user != null && user.getXrayPath() != null) {
                Resource resource = new FileUrlResource(user.getXrayPath());
                logger.info("url: " + user.getAnnotatedXrayPath());
                if (resource.exists()) {
                    MediaType mediaType = MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM);
                    logger.info("Media type: " + mediaType.toString());
                    return ResponseEntity.ok().contentType(mediaType).body(resource);
                }
                else {
                    return ResponseEntity.notFound().build();
                }
            }
            else {
                return ResponseEntity.notFound().build();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            // return internal server error
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/userAnnotatedXray")
    public ResponseEntity<Resource> getUserAnnotatedXray(@RequestParam String userId) {
        // get the file url from firestore and return the file from the local storage
        try {
            UserPojo user = userRepository.getUser(userId);
            if (user != null && user.getAnnotatedXrayPath() != null) {
                Resource resource = new FileUrlResource(user.getAnnotatedXrayPath());
                if (resource.exists()) {
                    MediaType mediaType = MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM);
                    logger.info("Media type: " + mediaType.toString());
                    return ResponseEntity.ok().contentType(mediaType).body(resource);
                }
                else {
                    return ResponseEntity.notFound().build();
                }
            }
            else {
                return ResponseEntity.notFound().build();
            }
        }
        catch (Exception e) {
            logger.warning(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/userEvaluationReport")
    public ResponseEntity<AnalyzedResponseMapper> getUserEvaluationReport(@RequestParam String userId) {
        try {
            UserPojo user = userRepository.getUser(userId);
            if (user != null && user.getEvaluatedReport() != null) {
                return ResponseEntity.ok(user.getEvaluatedReport());
            }
            else {
                return ResponseEntity.notFound().build();
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

}
