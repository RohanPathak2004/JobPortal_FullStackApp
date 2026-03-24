package com.rohan.spring_boot_rest.dto;

public record ApplicationDto(
        String name,
        String email,
        String resumeName,
        String resumeType,
        int jobId,
        byte[] resumeFile
) {
}
