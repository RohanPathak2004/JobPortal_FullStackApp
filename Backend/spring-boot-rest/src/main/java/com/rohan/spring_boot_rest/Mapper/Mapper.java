package com.rohan.spring_boot_rest.Mapper;

import com.rohan.spring_boot_rest.dto.RecruiterResponseDto;
import com.rohan.spring_boot_rest.model.Recruiter;

public class Mapper {
    public static RecruiterResponseDto recruiterProfileToDto(Recruiter recruiter){
        return new RecruiterResponseDto(
                recruiter.getName(),
                recruiter.getCompanyName(),
                recruiter.getCompanyUrl(),
                recruiter.getCompanyLogoUrl(),
                recruiter.getProfilePictureUrl());
    }
}
