package com.example.medvisionbackend.controllers;

import com.example.medvisionbackend.mappers.AnalyzedResponseMapper;
import com.example.medvisionbackend.pojo.UserPojo;
import com.example.medvisionbackend.repositories.UserRepository;
import org.springframework.core.io.FileUrlResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.MediaTypeFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.ObjectMapper;

import java.net.MalformedURLException;
import java.util.concurrent.ExecutionException;
import java.util.logging.Logger;

@RestController
public class TestController {
    private static final Logger logger = Logger.getLogger(TestController.class.getName());
    private final UserRepository userRepository;

    public TestController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/getImage")
    public ResponseEntity<Resource> getImage() throws MalformedURLException {
        // dynamically get the content type of the image and return it as a response entity
        Resource resource = new FileUrlResource("src/main/resources/static/dummies/Normal.jpg");
        MediaType mediaType = MediaTypeFactory.getMediaType(resource).orElse(MediaType.APPLICATION_OCTET_STREAM);
        logger.info(mediaType.toString());
        return ResponseEntity.ok().contentType(mediaType).body(resource);
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() throws ExecutionException, InterruptedException {
        UserPojo user = userRepository.getUser("admin@gmail.com");
        AnalyzedResponseMapper evaluatedReport = user.getEvaluatedReport();
        ObjectMapper mapper = new ObjectMapper();
        String s = mapper.writeValueAsString(user.getEvaluatedReport());
        return ResponseEntity.ok(s);
    }
}
