package com.rohan.spring_boot_rest.dto;

import com.rohan.spring_boot_rest.model.JobPost;

public record ApplicationForRecruiterDto(
        JobPost jobPost,
        String id,
        String name,
        String email,
        String status
) {
}
