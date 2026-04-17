package com.rohan.spring_boot_rest.repo;

import com.rohan.spring_boot_rest.model.Applications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationsRepo extends JpaRepository<Applications,Integer> {

    @Query(value = "SELECT * FROM applications WHERE job_post_id = :id", nativeQuery = true)
    Applications findByJobId(@Param("id") Integer id);

//    Applications findByEmail();

    @Query(value = "SELECT * FROM applications WHERE email = :email", nativeQuery = true)
    List<Applications> findBYEmail(@Param("email") String email);


}
