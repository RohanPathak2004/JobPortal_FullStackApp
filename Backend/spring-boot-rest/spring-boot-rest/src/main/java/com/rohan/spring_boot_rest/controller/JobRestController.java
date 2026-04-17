package com.rohan.spring_boot_rest.controller;

import com.rohan.spring_boot_rest.model.Applications;
import com.rohan.spring_boot_rest.model.JobPost;
import com.rohan.spring_boot_rest.service.ApplicationsService;
import com.rohan.spring_boot_rest.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController //(controller+response body)
@CrossOrigin
public class JobRestController {
    @Autowired
    private JobService service;

    @Autowired
    private ApplicationsService applicationsService;

    @GetMapping("jobPosts") //return the job from repo->service->controller
    public List<JobPost> getAllJobs(){
        return service.getAllJobs();
    }

    @GetMapping("jobPost/{postId}")
    public JobPost getJob(@PathVariable("postId") int postId){
        return service.getJob(postId);
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/admin/jobPosts")
    public List<JobPost> getAllJobPostedByRecruiter(Principal principal){

        return service.getAllJobPostedByRecruiter(principal.getName());
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping("jobPost") //posts job object into database
    public void addJob(@RequestBody JobPost job){
        service.addJob(job);
    }


    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("jobPost")
    public String updateJob(@RequestBody JobPost job){
        service.updateJob(job);
        return service.getJob(job.getPostId()).toString();
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @DeleteMapping("jobPost/{postId}")
    public void deleteJob(@PathVariable("postId") Long id){
        service.deleteJob(Math.toIntExact(id));
    }

    @GetMapping("load")
    public String load(){
        service.load();
        return "success";
    }

    @GetMapping("jobPosts/keyword/{keyword}")
    public List<JobPost> searchByKeyword(@PathVariable("keyword") String Keyword){
        return service.search(Keyword);
    }

    @PostMapping("/apply")
    public String apply(@RequestParam String name, @RequestParam String email, @RequestParam int jobId, @RequestParam MultipartFile resumeFile)
    {

        try{
            applicationsService.apply(name,email,jobId,resumeFile);
            return "applied Successfully";
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping("/applications")
    @PreAuthorize("hasRole('RECRUITER')")
    public List<Applications> getAllApplications(Principal principal){
        return applicationsService.getAllApplications(principal);
    }

    @GetMapping("/application/{appId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public Applications getApplicationById(@PathVariable("appId") Integer appId){
        return applicationsService.getApplicationById(appId);
    }

    @GetMapping("/candidate/applications")
    @PreAuthorize("hasRole('CANDIDATE')")
    public List<Applications> getAllApplicationsByCandidate(Principal principal){
        return applicationsService.getAllApplicationsByCandidate(principal);
    }

}
