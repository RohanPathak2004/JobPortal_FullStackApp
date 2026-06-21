package com.rohan.spring_boot_rest.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Candidate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer candidate_id;

    @OneToOne
    private User user;

    @Lob
    private byte[] resumeFile;

    private String resumeFileName;

    private String resumeFileType;

    @Lob
    private byte[] profilePicture;

    private String name;
    private List<String> publicUrls;
    private String about;


    private Boolean isProfileComplete;
}
