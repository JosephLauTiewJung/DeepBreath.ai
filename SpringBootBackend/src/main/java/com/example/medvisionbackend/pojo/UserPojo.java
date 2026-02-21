package com.example.medvisionbackend.pojo;


import com.example.medvisionbackend.mappers.AnalyzedResponseMapper;
import com.google.cloud.firestore.Blob;
import lombok.*;

import java.nio.file.Path;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserPojo {
    private String username;
    private String xrayPath;
    private String reportPath;
    private String annotatedXrayPath;
    private AnalyzedResponseMapper evaluatedReport;
}
