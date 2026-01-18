package com.rohan.spring_boot_rest.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.IdGeneratorType;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class JobPost {
    @Id
    private Integer postId;
    private String postProfile;
    private String postDesc;
    private int reqExperience;

    private List<String> postTechStack;



}
