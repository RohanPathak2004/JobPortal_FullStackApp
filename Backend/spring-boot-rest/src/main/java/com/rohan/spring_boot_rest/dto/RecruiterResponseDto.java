package com.rohan.spring_boot_rest.dto;

import org.springframework.web.multipart.MultipartFile;

public record RecruiterResponseDto(
        String name,
        String companyName,
        String companyUrl,
        String companyLogo,
        String profilePicture
) {
}
