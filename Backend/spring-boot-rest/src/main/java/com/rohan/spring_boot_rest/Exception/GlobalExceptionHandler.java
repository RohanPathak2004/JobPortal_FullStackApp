package com.rohan.spring_boot_rest.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UnauthorizedResourceAccessException.class)
    public ResponseEntity<Map<String,String>> handleUnauthorizedResourceAccessException(UnauthorizedResourceAccessException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message",ex.getMessage()));
    }

    @ExceptionHandler(JobPostNotFoundException.class)
    public ResponseEntity<Map<String,String>> handleJobPostNotFound(JobPostNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message",ex.getMessage()));
    }

}
