package com.rohan.spring_boot_rest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class JobPost {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "postIdGenerator")
    @SequenceGenerator(name = "postIdGenerator", allocationSize = 1)  // good!
    @Column(name = "post_id")
    private Integer postId;  // Integer is fine
    private String postProfile;
    private String postDesc;
    private int reqExperience;
    private List<String> postTechStack;



}
