package com.example.medvisionbackend.services;

import com.google.cloud.firestore.Blob;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.logging.Logger;

@Service
public class FileService {
    private Logger logger = Logger.getLogger(FileService.class.getName());
    public void saveXrayFile(String userId, MultipartFile xray) throws IOException {
        // save the xray to local storage and save the path to firestore
        String xrayPath = "src/main/resources/static/xrays/" + userId + "/xray.png";
        logger.info(xrayPath);
        Path path = Paths.get(xrayPath);
        Files.createDirectories(path.getParent());
        Files.copy(xray.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
    }

    public void saveReportFile(String userId, MultipartFile report) throws Exception {
        String reportPath = "src/main/resources/static/reports/" + userId + "/report.pdf";
        if (report != null) {
            Path pathReport = Paths.get(reportPath);
            Files.createDirectories(pathReport.getParent());
            Files.copy(report.getInputStream(), pathReport, StandardCopyOption.REPLACE_EXISTING);
        }
    }
    public void saveAnnotatedXrayFile(String userId, byte[] annotatedXray) throws Exception {
        String annotatedXrayPath = "src/main/resources/static/annotatedXray/" + userId + "/annotatedXray.png";
        if (annotatedXray != null) {
            Path pathAnnotatedXray = Paths.get(annotatedXrayPath);
            Files.createDirectories(pathAnnotatedXray.getParent());
            InputStream inputStream = new ByteArrayInputStream(annotatedXray);
            Files.copy(inputStream, pathAnnotatedXray, StandardCopyOption.REPLACE_EXISTING);
        }
    }
    public void saveEvaluatedReportFile(String userId, byte[] evaluatedReport) throws Exception {
        String evaluatedReportPath = "src/main/resources/static/evaluatedReport" + userId;
        if (evaluatedReport != null) {
            Path pathEvaluatedReport = Paths.get(evaluatedReportPath);
            Files.createDirectories(pathEvaluatedReport.getParent());
            InputStream inputStream = new ByteArrayInputStream(evaluatedReport);
            Files.copy(inputStream, pathEvaluatedReport, StandardCopyOption.REPLACE_EXISTING);
        }
    }
}
