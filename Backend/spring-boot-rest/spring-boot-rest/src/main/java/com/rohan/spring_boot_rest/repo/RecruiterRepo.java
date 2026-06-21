package com.rohan.spring_boot_rest.repo;

import com.rohan.spring_boot_rest.model.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepo extends JpaRepository<Recruiter,Integer> {


    @Query(value = "select * from recruiter where email  = :email",nativeQuery = true)
    Recruiter findByEmail(@Param("email") String email);



    @Query(value = " select recruiter.is_profile_complete "+
            "from recruiter where email = :email ",nativeQuery = true)
    Boolean isProfileComplete(@Param("email") String email);

}
