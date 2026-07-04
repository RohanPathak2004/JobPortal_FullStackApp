package com.rohan.spring_boot_rest.repo;


import com.rohan.spring_boot_rest.dto.JobPostDto;
import com.rohan.spring_boot_rest.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface JobRepo extends JpaRepository<JobPost, Long> {


    @Query(value = " select j.*, "
            + " recruiter.company_name,recruiter.company_logo_url,recruiter.company_url, recruiter.profile_picture_url " + " From job_post as j join recruiter on j.email = recruiter.email WHERE " +
            "LOWER(j.post_profile) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "LOWER(j.post_desc) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
            "EXISTS (" +
            "  SELECT 1 FROM unnest(j.post_tech_stack) AS stack " +
            "  WHERE stack ILIKE '%' || :keyword || '%'" +
            ")",
            nativeQuery = true)
    List<JobPostDto> searchJobPost(@Param("keyword") String keyword);

    @Query(value = "select j.* ," +
            "recruiter.company_name, recruiter.company_logo_url, recruiter.company_url, recruiter.profile_picture_url from job_post as j  join recruiter on j.email = recruiter.email and recruiter.email = :email", nativeQuery = true)
    List<JobPostDto> findByEmail(@Param("email") String email);


    @Query(value = "select j.* , "
            + " recruiter.company_name,recruiter.company_logo_url,recruiter.profile_picture_url,recruiter.company_url From job_post as j join recruiter on j.email = recruiter.email", nativeQuery = true)
    List<JobPostDto> findAllJobs();

    @Query(value = " select j.* , " +
            "recruiter.company_name, recruiter.company_logo_url, recruiter.profile_picture_url, recruiter.company_url from job_post as j left join recruiter on j.email = recruiter.email where j.post_id = :id", nativeQuery = true)
    JobPostDto findJobById(@Param("id") Long id);

}