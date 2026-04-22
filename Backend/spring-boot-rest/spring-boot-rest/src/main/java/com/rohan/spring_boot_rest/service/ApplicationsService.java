package com.rohan.spring_boot_rest.service;


import com.rohan.spring_boot_rest.dto.ResumeFileDto;
import com.rohan.spring_boot_rest.model.Applications;
import com.rohan.spring_boot_rest.model.JobPost;
import com.rohan.spring_boot_rest.repo.ApplicationsRepo;
import com.rohan.spring_boot_rest.repo.JobRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ApplicationsService {

    @Autowired
    private JobRepo jobRepo;

    @Autowired
    private ApplicationsRepo applicationsRepo;

    public void apply(String name, String email, int jobId, MultipartFile resumeFile) throws IOException {
        Applications apply = new Applications();
        JobPost job = jobRepo.findById(jobId).orElse(new JobPost());
        apply.setName(name);
        apply.setEmail(email);
        apply.setJob(job);
        apply.setResumeName(resumeFile.getOriginalFilename());
        apply.setResumeType(resumeFile.getContentType());
        apply.setResumeFile(resumeFile.getBytes());

        applicationsRepo.save(apply);

    }

    @Transactional
    public List<Applications> getAllApplications(Principal principal) {

        String email = principal.getName();
        List<JobPost> jobs = jobRepo.findByEmail(email);
        List<Applications> applications = new ArrayList<>();
        for(JobPost post:jobs){
            Applications app = applicationsRepo.findByJobId(post.getPostId());
            if(app!=null){
                applications.add(app);
            }
        }
        return applications;
    }

    @Transactional
    public List<Applications> getAllApplicationsByCandidate(Principal principal) {
        String email = principal.getName();
        return applicationsRepo.findBYEmail(email);
    }

    @Transactional
    public Applications getApplicationById(Integer appId) {
       Optional<Applications> app = applicationsRepo.findById(appId);
        return app.orElse(new Applications());
    }

    @Transactional
    public ResumeFileDto getResumeFile(Integer appId){
        return applicationsRepo.findResumeFileById(appId);

    }
}
