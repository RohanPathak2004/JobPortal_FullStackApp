package com.rohan.spring_boot_rest.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.util.List;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer recruiter_id;

    @OneToOne
    private User user;

    private String name;

    private String companyName;

    private String companyLogoUrl;
    private String companyLogoPublicId;
    private String companyUrl;

    private String profilePictureUrl;
    private String ProfilePicturePublicId;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isProfileComplete = false;

}
