package com.rohan.spring_boot_rest.dto;

import com.rohan.spring_boot_rest.model.JobPost;

public record ApplicationDto(
        String name,
        String email,
        String status,
        JobPost job
) {
}
