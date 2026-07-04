package com.rohan.spring_boot_rest.dto;

import java.util.List;

public record JobPostRequestDto(
        String postProfile,
        String postDesc,
        int reqExperience,
        String location,
        List<String> postTechStack

) {
}
