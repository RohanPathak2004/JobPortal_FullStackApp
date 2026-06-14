package com.rohan.spring_boot_rest.controller;

import com.rohan.spring_boot_rest.dto.*;
import com.rohan.spring_boot_rest.model.JobPost;
import com.rohan.spring_boot_rest.service.ApplicationsService;
import com.rohan.spring_boot_rest.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.security.Principal;
import java.util.List;

@RestController //(controller+response body)
@CrossOrigin
public class JobRestController {

    private final JobService service;
    private final ApplicationsService applicationsService;


    //constructor injection
    public JobRestController(JobService service,ApplicationsService applicationsService){
        this.applicationsService = applicationsService;
        this.service = service;
    }

    //get all job posting
    @GetMapping("jobPosts") //return the job from repo->service->controller
    public List<JobPostDto> getAllJobs(){
        return service.getAllJobs();
    }


    //get job by id
    @GetMapping("jobPost/{postId}")
    public ResponseEntity<?> getJob(@PathVariable("postId") int postId){
        return service.getJob(postId);
    }



    //dummy values
    @GetMapping("load")
    public String load(){
        service.load();
        return "success";
    }


    //RECRUITER ROUTES


    //recruiter profile
    @PutMapping(value = "/admin/profile",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateRecruiterProfile(@ModelAttribute RecruiterProfileDto recruiterProfileDto){
        return service.updateRecruiterProfile(recruiterProfileDto);
    }


    //job post search implementation
    @GetMapping("jobPosts/keyword/{keyword}")
    public List<JobPostDto> searchByKeyword(@PathVariable("keyword") String Keyword){
        return service.search(Keyword);
    }


    //get all the job posted by the recruiter
    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/admin/jobPosts")
    public List<JobPostDto> getAllJobPostedByRecruiter(Principal principal){

        return service.getAllJobPostedByRecruiter(principal.getName());
    }


    //create a new job post
    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping("jobPost") //posts job object into database
    public void addJob(@RequestBody JobPost post){
        service.addJob(post);
    }


    //update an existing job post
    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("jobPost")
    public String updateJob(@RequestBody JobPost job){
        service.updateJob(job);
        return service.getJob(job.getPostId()).toString();
    }


    //deleting a job post
    @PreAuthorize("hasRole('RECRUITER')")
    @DeleteMapping("jobPost/{postId}")
    public void deleteJob(@PathVariable("postId") Long id){
        service.deleteJob(Math.toIntExact(id));
    }

    //get all the applications of job posted by recruiter
    @GetMapping("/applications")
    @PreAuthorize("hasRole('RECRUITER')")
    public List<ApplicationForRecruiterDto> getAllApplications(Principal principal){
        String email = principal.getName();
        return applicationsService.getAllApplications(email);
    }

    //get a job application by id
    @GetMapping("/application/{appId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ApplicationDto getApplicationById(@PathVariable("appId") Integer appId){
        return applicationsService.getApplicationById(appId);
    }

    //resume of candidate for review
    @GetMapping("/resume/{appId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResumeFileDto getResumeFile(@PathVariable Integer appId){
        return applicationsService.getResumeFile(appId);
    }


    //changing application status->(review,success,reject)
    @PatchMapping("status")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<String> updateApplicationStatus(@RequestParam Integer id, @RequestParam String status){
        try{
            String s = applicationsService.updateApplicationStatus(id,status);
            return new ResponseEntity<>(s,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





    //CANDIDATE ROUTES

    //get applications applied by candidate for the Job Post
    @GetMapping("/candidate/applications")
    @PreAuthorize("hasRole('CANDIDATE')")
    public List<ApplicationDto> getAllApplicationsForCandidate(Principal principal){
        return applicationsService.getAllApplicationsForCandidate(principal);
    }


    //candidate to apply on a job post
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

}
