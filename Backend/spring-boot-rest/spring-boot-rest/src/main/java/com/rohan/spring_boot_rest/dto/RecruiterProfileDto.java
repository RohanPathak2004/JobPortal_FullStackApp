package com.rohan.spring_boot_rest.dto;

import org.springframework.web.multipart.MultipartFile;

public record RecruiterProfileDto(
        String name,
        String companyName,
        String companyUrl,
        MultipartFile companyLogo,
        MultipartFile profilePicture
) {
}
