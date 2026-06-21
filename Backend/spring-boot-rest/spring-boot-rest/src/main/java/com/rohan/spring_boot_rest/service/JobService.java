package com.rohan.spring_boot_rest.service;


import com.rohan.spring_boot_rest.dto.JobPostDto;
import com.rohan.spring_boot_rest.dto.RecruiterProfileDto;
import com.rohan.spring_boot_rest.model.JobPost;
import com.rohan.spring_boot_rest.model.Recruiter;
import com.rohan.spring_boot_rest.repo.JobRepo;
import com.rohan.spring_boot_rest.repo.RecruiterRepo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.*;

@Service
public class JobService {


    private final RecruiterRepo recruiterRepo;
    private final JobRepo jobRepo;

    public JobService(JobRepo jobRepo,RecruiterRepo recruiterRepo){
        this.jobRepo = jobRepo;
        this.recruiterRepo = recruiterRepo;
    }


    private Integer generateRandomId(){
        return Math.abs((int)(Math.random()*1000));
    }
    public void addJob(JobPost jobpost){
        Integer randomId = generateRandomId();
        jobpost.setPostId(randomId);
        jobRepo.save(jobpost);
    }

    public List<JobPostDto> getAllJobs(){
        return jobRepo.findAllJobs();
    }

    public ResponseEntity<?> getJob(int postId) {
        Optional<JobPostDto> o = Optional.ofNullable(jobRepo.findJobById(postId));
        if(o.isEmpty()){
            return new ResponseEntity<>("Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<JobPostDto>(o.get(),HttpStatus.FOUND);
    }

    public void updateJob(JobPost job) {
       jobRepo.save(job);
    }

    public void deleteJob(int postId) {
        jobRepo.deleteById(postId);
    }

    public List<JobPostDto> search(String Keyword){

        return jobRepo.searchJobPost(Keyword);
    }

    @Transactional
    public List<JobPostDto> getAllJobPostedByRecruiter(String email) {
        return jobRepo.findByEmail(email);
    }



    public ResponseEntity<String> updateRecruiterProfile(RecruiterProfileDto recruiterProfileDto,Principal principal) throws IOException {

        //required fields
        String name = recruiterProfileDto.name();
        String companyName = recruiterProfileDto.companyName();
        String companyUrl = recruiterProfileDto.companyUrl();
        String email = principal.getName();

        //optional fields
        MultipartFile profilePicture = recruiterProfileDto.profilePicture();
        MultipartFile companyLogo = recruiterProfileDto.companyLogo();
        byte[] profilePictureFile = profilePicture.getBytes();
        byte[] companyLogoFile = companyLogo.getBytes();


        if(Objects.equals(name, "") ||Objects.equals(companyName, "")||Objects.equals(companyUrl, "")) return ResponseEntity.badRequest().body("All the fields are Required");



        Recruiter recruiter = recruiterRepo.findByEmail(email);
        recruiter.setName(name);
        recruiter.setCompanyName(companyName);
        recruiter.setCompanyUrl(companyUrl);
        recruiter.setProfilePicture(profilePictureFile);
        recruiter.setCompanyLogo(companyLogoFile);
        recruiter.setProfileComplete(true);
        recruiterRepo.save(recruiter);

        return ResponseEntity.ok("Profile Updated Successfully.");


    }


    public Boolean isProfileComplete(String email){
        return recruiterRepo.isProfileComplete(email);
    }


    public void load(){
        List<JobPost> jobs = new ArrayList<>(Arrays.asList(
                new JobPost(1, "Java Developer", "Must have good experience in core Java and advanced Java", 2,
                        List.of("Core Java", "J2EE", "Spring Boot", "Hibernate"),"rohanpathak258@gmail.com"),


                new JobPost(2, "Frontend Developer", "Experience in building responsive web applications using React", 3,
                        List.of("HTML", "CSS", "JavaScript", "React"),"rohanpathak258@gmail.com"),


                new JobPost(3, "Data Scientist", "Strong background in machine learning and data analysis", 4,
                        List.of("Python", "Machine Learning", "Data Analysis"),"rohanpathak258@gmail.com"),


                new JobPost(4, "Network Engineer", "Design and implement computer networks for efficient data communication", 5,
                        List.of("Networking", "Cisco", "Routing", "Switching"),"rohanpathak258@gmail.com"),


                new JobPost(5, "Mobile App Developer", "Experience in mobile app development for iOS and Android", 3,
                        List.of("iOS Development", "Android Development", "Mobile App"),"rohanpathak258@gmail.com")
        ));
        jobRepo.saveAll(jobs);
    }
}
