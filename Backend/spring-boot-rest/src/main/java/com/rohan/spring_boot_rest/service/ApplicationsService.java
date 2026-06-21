package com.rohan.spring_boot_rest.service;


import com.rohan.spring_boot_rest.dto.ApplicationDto;
import com.rohan.spring_boot_rest.dto.ApplicationForRecruiterDto;
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


    private final JobRepo jobRepo;
    private final ApplicationsRepo applicationsRepo;
    private final StatusMailSender mailSender;


    public ApplicationsService(StatusMailSender mailSender,ApplicationsRepo applicationsRepo,JobRepo jobRepo){
        this.mailSender = mailSender;
        this.applicationsRepo = applicationsRepo;
        this.jobRepo = jobRepo;
    }

    public void apply(String name, String email, int jobId, MultipartFile resumeFile) throws IOException {
        Applications apply = new Applications();
        JobPost job = jobRepo.findById(jobId).orElse(new JobPost());
        apply.setName(name);
        apply.setEmail(email);
        apply.setJob(job);
        apply.setStatus("review");
        apply.setResumeName(resumeFile.getOriginalFilename());
        apply.setResumeType(resumeFile.getContentType());
        apply.setResumeFile(resumeFile.getBytes());

        applicationsRepo.save(apply);

    }


    public List<ApplicationForRecruiterDto> getAllApplications(String email) {

        return applicationsRepo.getAllApplications(email);
    }

    public List<ApplicationDto> getAllApplicationsForCandidate(Principal principal) {
        String email = principal.getName();
        return applicationsRepo.findByEmail(email);
    }

    public ApplicationDto getApplicationById(Integer appId) {
        ApplicationDto apd = applicationsRepo.findApplicationById(appId);
        if (apd != null) return apd;
        return new ApplicationDto("not found", "not found", null,null);
    }

    @Transactional
    public ResumeFileDto getResumeFile(Integer appId) {
        return applicationsRepo.findResumeFileById(appId);

    }

    public String updateApplicationStatus(int id, String status) throws Exception {
        Optional<Applications> optionalApplication = applicationsRepo.findById(id);
        if (optionalApplication.isPresent()) {
            Applications app = optionalApplication.get();
            app.setStatus(status);
            String s = app.getStatus();
            applicationsRepo.save(app);
            ApplicationDto application = applicationsRepo.findApplicationById(id);
            mailSender.sendStatusMail(application.email(),application.name(),application.status(),application.job().getPostProfile());
            return s;
        } else throw new Exception("User Not Found");
    }
}
