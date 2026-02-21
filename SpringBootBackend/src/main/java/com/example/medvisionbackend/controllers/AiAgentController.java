package com.example.medvisionbackend.controllers;

import com.example.medvisionbackend.mappers.AnalyzedResponseMapper;
import com.example.medvisionbackend.pojo.UserPojo;
import com.example.medvisionbackend.repositories.UserRepository;
import com.example.medvisionbackend.services.FileService;
import com.google.api.Http;
import com.google.cloud.firestore.Blob;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.io.InputStream;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.logging.Logger;

@RestController
@CrossOrigin(
        origins = "*",
        allowedHeaders = "*"
)
public class AiAgentController {
    private final ObjectMapper objectMapper;
    private UserRepository userRepository;
    private final HttpClient httpClient;
    private final ObjectMapper mapper = new ObjectMapper();
    FileService fileService;
    private static final Logger logger = Logger.getLogger(AiAgentController.class.getName());
    public AiAgentController(UserRepository userRepository, FileService fileService, ObjectMapper objectMapper) {
        this.userRepository = userRepository;
        this.httpClient = HttpClient.newHttpClient();
        this.fileService = fileService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/analyzedXray")
    public ResponseEntity<String> analyzeXray(@RequestParam String userId) {
        // get the user's document and send the xray to fast api for analysis
        try {
            UserPojo user = userRepository.getUser(userId);
            byte[] bytes = Files.readAllBytes(Paths.get(user.getXrayPath()));
            HttpRequest httpRequest = HttpRequest.newBuilder().uri(new URI("http://localhost:8000/analyzeXray"))
                    .POST(HttpRequest.BodyPublishers.ofByteArray(bytes))
                    .header("Content-Type", "application/octet-stream")
                    .build();
            HttpResponse<byte[]> send = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofByteArray());
            if (send.statusCode() == 200) {
                // find the user
                UserPojo userPojo = userRepository.getUser(userId);
                // save the annotated xray path to firestore
                String annotatedXrayPath = userPojo.getAnnotatedXrayPath();
                userPojo.setAnnotatedXrayPath(annotatedXrayPath);
                 userRepository.updateUser(userPojo);
                 // save the annotated xray to local storage
                fileService.saveAnnotatedXrayFile(userId, send.body());
                return ResponseEntity.ok("Xray analyzed successfully");
            }
            else {
                System.out.println("Error analyzing xray: " + send.toString());
                return ResponseEntity.internalServerError().body("Error analyzing xray: " + send.toString());
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error analyzing xray: " + e.getMessage());
        }
    }

    @GetMapping("/analyzedReport")
    public void analyzeReport(@RequestParam String userId) {
        // get the user's document and send the report to fast api for analysis
        try {
            UserPojo user = userRepository.getUser(userId);
            String reportPath = user.getReportPath();
            byte[] byteArr = Files.readAllBytes(Path.of(reportPath));
            HttpRequest httpRequest = HttpRequest.newBuilder().uri(new URI("http://localhost:8000/analyzeAndEvaluateReport?userId=" + userId))
                    .POST(HttpRequest.BodyPublishers.ofByteArray(byteArr))
                    .header("Content-Type", "application/pdf")
                    .build();
            HttpResponse<String> send = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            if (send.statusCode() == 200) {
                logger.info("Report analyzed successfully: " + send.body().toString());
                ObjectMapper mapper = new ObjectMapper();
                AnalyzedResponseMapper response = mapper.readValue(send.body(), AnalyzedResponseMapper.class);
                logger.info("Response: " + response.toString());
                UserPojo userPojo = userRepository.getUser(userId);
                userPojo.setEvaluatedReport(response);
                userRepository.updateUser(userPojo);
            } else {
                System.out.println("Error analyzing report: " + send.toString());
            }
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/getDoctorReport")
    public ResponseEntity<String> getDoctorReport(@RequestParam String userId) {
        try {
            UserPojo user = userRepository.getUser(userId);
            if (user != null && user.getEvaluatedReport() != null) {
                HttpClient client = HttpClient.newHttpClient();
                AnalyzedResponseMapper evaluatedReport = user.getEvaluatedReport();
                String report = objectMapper.writeValueAsString(evaluatedReport);
                logger.info("report: " + report);
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(new URI("http://localhost:8000/doctorReport"))
                        .POST(HttpRequest.BodyPublishers.ofString(report))
                        .build();
                HttpResponse<String> send = client.send(request, HttpResponse.BodyHandlers.ofString());
                return ResponseEntity.ok(send.body().toString());
            }
            else {
                return ResponseEntity.ok("No evaluated report found for user: " + userId);
            }
        }
        catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error getting doctor report: " + e.getMessage());
        }
    }
}
