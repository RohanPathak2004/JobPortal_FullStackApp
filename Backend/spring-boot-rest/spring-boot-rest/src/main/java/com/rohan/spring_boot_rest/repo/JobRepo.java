package com.rohan.spring_boot_rest.repo;


import com.rohan.spring_boot_rest.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public interface JobRepo extends JpaRepository<JobPost,Integer> {



    List<JobPost> findByPostProfileContainingOrPostDescContaining(String profile,String postDescription);



//    List<JobPost> jobs = new ArrayList<>(Arrays.asList(
//            new JobPost(1, "Java Developer", "Must have good experience in core Java and advanced Java", 2,
//                    List.of("Core Java", "J2EE", "Spring Boot", "Hibernate")),
//
//
//            new JobPost(2, "Frontend Developer", "Experience in building responsive web applications using React", 3,
//                    List.of("HTML", "CSS", "JavaScript", "React")),
//
//
//            new JobPost(3, "Data Scientist", "Strong background in machine learning and data analysis", 4,
//                    List.of("Python", "Machine Learning", "Data Analysis")),
//
//
//            new JobPost(4, "Network Engineer", "Design and implement computer networks for efficient data communication", 5,
//                    List.of("Networking", "Cisco", "Routing", "Switching")),
//
//
//            new JobPost(5, "Mobile App Developer", "Experience in mobile app development for iOS and Android", 3,
//                    List.of("iOS Development", "Android Development", "Mobile App"))
//    ));
//
//    public List<JobPost> getAllJobs(){
//        return jobs;
//    }
//    public void addJob(JobPost job){
//        jobs.add(job);
//
//        System.out.println(job);
//    }
//
//    public JobPost getJob(int i) {
//        for(JobPost job: jobs){
//            if(job.getPostId()==i) return job;
//        }
//        return jobs.getFirst();
//    }
//
//    public void updateJob(JobPost job) {
//        for(JobPost j: jobs){
//            if(j.getPostId()==job.getPostId()){
//                j.setPostProfile(job.getPostProfile());
//                j.setPostTechStack(job.getPostTechStack());
//                j.setPostDesc(job.getPostDesc());
//                j.setReqExperience(job.getReqExperience());
//
//            }
//        }
//    }
//
//    public void deleteJob(int id) {
//        int idx = 0;
//
//        for(int i = 0 ; i<jobs.size() ; i++){
//            if(jobs.get(i).getPostId()== id){
//                jobs.remove(jobs.get(i)); //checking if the object is there, if it is present then directly delete it.
//                break;
//            }
//        }
//
//    }
}
