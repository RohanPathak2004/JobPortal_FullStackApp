package com.rohan.spring_boot_rest.dto;

import com.rohan.spring_boot_rest.model.JobPost;
import jakarta.persistence.Lob;

public interface JobPostDto{
        Integer getPostId();
        String getPostDesc();
        String getPostProfile();
        String getPostTechStack();
        Integer getRequiredExp();
        String getCompanyLogoUrl();
        String getProfilePictureUrl();
        String getCompanyUrl();
        String getCompanyName();
}