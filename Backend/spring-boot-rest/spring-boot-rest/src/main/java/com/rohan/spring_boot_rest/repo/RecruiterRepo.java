package com.rohan.spring_boot_rest.repo;

import com.rohan.spring_boot_rest.model.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruiterRepo extends JpaRepository<Recruiter,Integer> {



}
