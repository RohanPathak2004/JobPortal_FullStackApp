package com.rohan.spring_boot_rest.dto;

import com.rohan.spring_boot_rest.model.JobPost;
import jakarta.persistence.Lob;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface JobPostDto{
        long getPostId();
        String getPostDesc();
        String getPostProfile();
        List<String> getPostTechStack();
        Integer getReqExperience();
        String getCompanyLogoUrl();
        String getProfilePictureUrl();
        String getCompanyUrl();
        String getCompanyName();
        LocalDateTime getCreatedAt();
        Boolean getIsExpire();
        String getLocation();
}