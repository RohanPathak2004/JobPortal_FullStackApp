package com.rohan.spring_boot_rest.dto;

public record UserRegisterRequestDto(
        String email,
        String password,
        String authority
) {
}
