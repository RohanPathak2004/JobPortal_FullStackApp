package com.rohan.spring_boot_rest.repo;

import com.rohan.spring_boot_rest.dto.ApplicationDto;
import com.rohan.spring_boot_rest.dto.ApplicationForRecruiterDto;
import com.rohan.spring_boot_rest.dto.ResumeFileDto;
import com.rohan.spring_boot_rest.model.Applications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationsRepo extends JpaRepository<Applications,Integer> {

    @Query(value = "SELECT * FROM applications WHERE job_post_id = :id", nativeQuery = true)
    Applications findByJobId(@Param("id") Integer id);

//    Applications findByEmail();

    @Query("SELECT new com.rohan.spring_boot_rest.dto.ApplicationDto(a.name, a.email, a.job )"+ "FROM Applications a WHERE a.email = :email")
    List<ApplicationDto> findBYEmail(@Param("email") String email);


    @Query("SELECT new com.rohan.spring_boot_rest.dto.ResumeFileDto(a.resumeName, a.resumeType, a.resumeFile) " +
            "FROM Applications a WHERE a.id = :appId")
    ResumeFileDto findResumeFileById(@Param("appId") Integer appId);

    @Query("SELECT new com.rohan.spring_boot_rest.dto.ApplicationForRecruiterDto(j, CAST(a.id as string), a.name, a.email) " +
    "FROM Applications a JOIN a.job j " +
    "WHERE j.email = :email ")
    List<ApplicationForRecruiterDto> getAllApplications(@Param("email") String email);
}
