package com.example.medvisionbackend.mappers;

import lombok.Data;

@Data
public class AnalyzedResponseMapper {
    private int criticalLevel;
    private String message;
    private String evaluation;
    private String recommendations;
}
