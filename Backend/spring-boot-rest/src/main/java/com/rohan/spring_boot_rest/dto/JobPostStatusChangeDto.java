package com.rohan.spring_boot_rest.dto;

public record JobPostStatusChangeDto(
        boolean isExpire,
        long postId
) {
}
