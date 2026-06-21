package com.rohan.spring_boot_rest.dto;

public record UserLoginDto(
        String email,
        String password
) {
}
