package com.rohan.spring_boot_rest.controller;


import com.rohan.spring_boot_rest.dto.*;
import com.rohan.spring_boot_rest.model.JobPost;
import com.rohan.spring_boot_rest.service.ApplicationsService;
import com.rohan.spring_boot_rest.service.JobService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.security.Principal;
import java.util.List;


@RestController //(controller+response body)
@CrossOrigin(value = "http://localhost:5173")
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
    public ResponseEntity<List<JobPostDto>> getAllJobs(){
        return ResponseEntity.ok(service.getAllJobs());
    }


    //get job by id
    @GetMapping("jobPost/{postId}")
    public ResponseEntity<?> getJob(@PathVariable("postId") Long postId){
        try{
            return ResponseEntity.ok(service.getJob(postId));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    //job post status change
    @PreAuthorize("hasRole('RECRUITER')")
    @PatchMapping("/admin/job/status")
    public ResponseEntity<String> changeJobPostStatus(@RequestBody JobPostStatusChangeDto jobPostStatusChangeDto, Principal principal) {
        try{
            String res = service.changeJobPostStatus(jobPostStatusChangeDto,principal);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //RECRUITER ROUTES


    //recruiter profile
    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping(value = "/admin/profile",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> updateRecruiterProfile(@ModelAttribute RecruiterProfileDto recruiterProfileDto,Principal principal){
        System.out.println(recruiterProfileDto.toString());
        try{
            return service.updateRecruiterProfile(recruiterProfileDto,principal);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("file processing failed, please try again after few time");
        }
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/admin/profile")
    public ResponseEntity<RecruiterResponseDto> getRecruiterProfile(Principal principal){
        return ResponseEntity.ok(service.getRecruiterProfile(principal));
    }

    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/admin/profileStatus")
    public ResponseEntity<Boolean> isProfileComplete(Principal principal){
        String email = principal.getName();
        return ResponseEntity.ok(service.isProfileComplete(email));
    }

    //job post search implementation
    @GetMapping("jobPosts/keyword/{keyword}")
    public ResponseEntity<List<JobPostDto>> searchByKeyword(@PathVariable("keyword") String Keyword){
        return ResponseEntity.ok(service.search(Keyword));
    }


    //get all the job posted by the recruiter
    @PreAuthorize("hasRole('RECRUITER')")
    @GetMapping("/admin/jobPosts")
    public ResponseEntity<List<JobPostDto>> getAllJobPostedByRecruiter(Principal principal){

        return ResponseEntity.ok(service.getAllJobPostedByRecruiter(principal.getName()));
    }


    //create a new job post
    @PreAuthorize("hasRole('RECRUITER')")
    @PostMapping("jobPost") //posts job object into database
    public ResponseEntity<String> addJob(@RequestBody JobPostRequestDto jobPostRequestDto,Principal principal){
        service.addJob(jobPostRequestDto,principal);
        return ResponseEntity.status(HttpStatus.CREATED).body("job posted Successfully");
    }


    //update an existing job post
    @PreAuthorize("hasRole('RECRUITER')")
    @PutMapping("jobPost")
    public ResponseEntity<String> updateJob(@RequestBody JobPost job){
        service.updateJob(job);
        return ResponseEntity.status(HttpStatus.CREATED).body("job post updated Successfully");
    }


    //deleting a job post
    @PreAuthorize("hasRole('RECRUITER')")
    @DeleteMapping("jobPost/{postId}")
    public ResponseEntity<?> deleteJob(@PathVariable("postId") Long id){
        service.deleteJob(id);
        return ResponseEntity.ok("job post deleted Successfully");
    }

    //get all the applications of job posted by recruiter
    @GetMapping("/applications")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<List<ApplicationForRecruiterDto>> getAllApplications(Principal principal){
        String email = principal.getName();
        return ResponseEntity.ok(applicationsService.getAllApplications(email));
    }

    //get a job application by id
    @GetMapping("/application/{appId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ApplicationDto> getApplicationById(@PathVariable("appId") Integer appId){
        return ResponseEntity.ok(applicationsService.getApplicationById(appId));
    }

    //resume of candidate for review
    @GetMapping("/resume/{appId}")
    @PreAuthorize("hasRole('RECRUITER')")
    public ResponseEntity<ResumeFileDto> getResumeFile(@PathVariable Integer appId){
        return ResponseEntity.ok(applicationsService.getResumeFile(appId));
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
    public ResponseEntity<List<ApplicationDto>> getAllApplicationsForCandidate(Principal principal){
        return ResponseEntity.ok(applicationsService.getAllApplicationsForCandidate(principal));
    }


    //candidate to apply on a job post
    @PostMapping("/apply")
    public ResponseEntity<String> apply(@RequestParam String name, @RequestParam String email, @RequestParam Long jobId, @RequestParam MultipartFile resumeFile)
    {

        try{
            applicationsService.apply(name,email,jobId,resumeFile);
            return ResponseEntity.ok("applied Successfully");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Something went wrong please try again.");
        }

    }

}
