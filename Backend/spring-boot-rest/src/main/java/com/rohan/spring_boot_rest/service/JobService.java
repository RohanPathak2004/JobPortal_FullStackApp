package com.rohan.spring_boot_rest.service;


import com.rohan.spring_boot_rest.Mapper.Mapper;
import com.rohan.spring_boot_rest.dto.JobPostDto;
import com.rohan.spring_boot_rest.dto.JobPostRequestDto;
import com.rohan.spring_boot_rest.dto.RecruiterProfileDto;
import com.rohan.spring_boot_rest.dto.RecruiterResponseDto;
import com.rohan.spring_boot_rest.model.JobPost;
import com.rohan.spring_boot_rest.model.Recruiter;
import com.rohan.spring_boot_rest.repo.JobRepo;
import com.rohan.spring_boot_rest.repo.RecruiterRepo;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class JobService {


    private static final Logger log = LoggerFactory.getLogger(JobService.class);
    private final RecruiterRepo recruiterRepo;
    private final JobRepo jobRepo;
    private final CloudinaryService cloudinaryService;

    public JobService(JobRepo jobRepo, RecruiterRepo recruiterRepo, CloudinaryService cloudinaryService) {
        this.jobRepo = jobRepo;
        this.recruiterRepo = recruiterRepo;
        this.cloudinaryService = cloudinaryService;
    }


    public void addJob(JobPostRequestDto jobPostRequestDto, Principal principal) {
        JobPost jobPost = new JobPost();
        jobPost.setPostProfile(jobPostRequestDto.postProfile());
        jobPost.setPostDesc(jobPostRequestDto.postDesc());
        jobPost.setReqExperience(jobPostRequestDto.reqExperience());
        jobPost.setLocation(jobPostRequestDto.location());
        jobPost.setPostTechStack(jobPostRequestDto.postTechStack());
        jobPost.setEmail(principal.getName());
        jobPost.setCreatedAt(LocalDateTime.now());
        jobPost.setIsExpire(false);
        JobPost savedJobPost = jobRepo.save(jobPost);
    }

    public List<JobPostDto> getAllJobs() {
        return jobRepo.findAllJobs();
    }

    public JobPostDto getJob(Long postId) {
        Optional<JobPostDto> o = Optional.ofNullable(jobRepo.findJobById(postId));
        return o.orElseThrow(() -> new EntityNotFoundException("job post not found"));
    }

    public void updateJob(JobPost job) {
        jobRepo.save(job);
    }

    public void deleteJob(Long postId) {
        jobRepo.deleteById(postId);
    }

    public List<JobPostDto> search(String Keyword) {

        return jobRepo.searchJobPost(Keyword);
    }

    public List<JobPostDto> getAllJobPostedByRecruiter(String email) {
        return jobRepo.findByEmail(email);
    }


    public ResponseEntity<String> updateRecruiterProfile(RecruiterProfileDto recruiterProfileDto, Principal principal) throws IOException {

        //required fields
        String name = recruiterProfileDto.name();
        String companyName = recruiterProfileDto.companyName();
        String companyUrl = recruiterProfileDto.companyUrl();
        String email = principal.getName();

        //optional fields
        MultipartFile profilePicture = recruiterProfileDto.profilePicture();
        MultipartFile companyLogo = recruiterProfileDto.companyLogo();

        if (Objects.equals(name, "") || Objects.equals(companyName, "") || Objects.equals(companyUrl, ""))
            return ResponseEntity.badRequest().body("All the fields are Required");

        Recruiter recruiter = recruiterRepo.findByEmail(email);
        recruiter.setName(name);
        recruiter.setCompanyName(companyName);
        recruiter.setCompanyUrl(companyUrl);

        try {
            if (!profilePicture.isEmpty()) {
                String profilePicturePublicId = recruiter.getProfilePicturePublicId();
                Map result;
                if (profilePicturePublicId == null || profilePicturePublicId.isEmpty()) {
                    result = cloudinaryService.upload(profilePicture);
                } else {
                    result = cloudinaryService.updateImage(profilePicturePublicId, profilePicture);
                }
                recruiter.setProfilePicturePublicId((String) result.get("public_id"));
                recruiter.setProfilePictureUrl((String) result.get("secure_url"));

            }
            if (!companyLogo.isEmpty()) {
                String companyLogoPublicId = recruiter.getCompanyLogoPublicId();
                Map result;
                if (companyLogoPublicId == null || companyLogoPublicId.isEmpty()){
                    result = cloudinaryService.upload(companyLogo);
                }else{
                    result = cloudinaryService.updateImage(companyLogoPublicId,companyLogo);
                }
                recruiter.setCompanyLogoPublicId((String)result.get("public_id"));
                recruiter.setCompanyLogoUrl((String)result.get("secure_url"));
            }
        } catch (Exception e) {
            System.out.println("inside the exception");

            return ResponseEntity.internalServerError().body("File Upload Failed");
        }


        recruiter.setProfileComplete(true);
        recruiterRepo.save(recruiter);

        return ResponseEntity.ok("Profile Updated Successfully.");


    }

    public RecruiterResponseDto getRecruiterProfile(Principal principal) {
        Recruiter recruiter = recruiterRepo.findByEmail(principal.getName());
        return Mapper.recruiterProfileToDto(recruiter);
    }


    public Boolean isProfileComplete(String email) {
        return recruiterRepo.isProfileComplete(email);
    }


}
