package com.example.medvisionbackend;

import com.example.medvisionbackend.services.FileService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileServicesTest {

    private final String userId = "testUser";
    private final String fileName = "testXray.png";
    private final Path targetPath = Paths.get("src/main/resources/static/xrays/" + userId + "/" + fileName);

    @AfterEach
    public void cleanup() throws IOException {
        Files.deleteIfExists(targetPath);
        Files.deleteIfExists(targetPath.getParent());
    }

    @Test
    public void testSaveXrayFile() throws IOException {
        // Arrange
        FileService fileService = new FileService();
        MockMultipartFile xray = new MockMultipartFile("xray", fileName, "image/png", "test content".getBytes());

        // Act
        fileService.saveXrayFile(userId, xray);

        // Assert
        Assertions.assertTrue(Files.exists(targetPath), "File should be saved to the target folder");
    }
}
