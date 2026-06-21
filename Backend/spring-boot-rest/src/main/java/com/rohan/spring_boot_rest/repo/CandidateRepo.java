package com.rohan.spring_boot_rest.repo;

import com.rohan.spring_boot_rest.model.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandidateRepo extends JpaRepository<Candidate,Integer> {

}
