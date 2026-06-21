package com.rohan.spring_boot_rest.dto;

import jakarta.persistence.Lob;

public record ResumeFileDto(
        String resumeName,
        String resumeType,
        @Lob
        byte[] resumeFile
) {
}
