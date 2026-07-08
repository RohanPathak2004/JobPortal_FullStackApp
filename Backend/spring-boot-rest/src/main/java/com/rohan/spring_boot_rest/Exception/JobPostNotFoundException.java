package com.rohan.spring_boot_rest.Exception;

public class JobPostNotFoundException extends RuntimeException {
    public JobPostNotFoundException(String message) {
        super(message);
    }
}
