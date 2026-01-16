package com.rohan.spring_boot_rest;

import com.rohan.spring_boot_rest.model.JobPost;
import com.rohan.spring_boot_rest.service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController //(controller+response body)
@CrossOrigin(origins = "http://localhost:5173")
public class JobRestController {
    @Autowired
    private JobService service;


    @GetMapping("jobPosts") //return the job from repo->service->controller
    public List<JobPost> getAllJobs(){
        return service.getAllJobs();
    }

    @GetMapping("jobPost/{postId}")
    public JobPost getJob(@PathVariable("postId") int postId){
        return service.getJob(postId);
    }

    @PostMapping("jobPost") //posts job object into data base
    public void addJob(@RequestBody JobPost job){
        service.addJob(job);
    }

    @PutMapping("jobPost")
    public String updateJob(@RequestBody JobPost job){
        service.updateJob(job);
        return service.getJob(job.getPostId()).toString();
    }

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

}
