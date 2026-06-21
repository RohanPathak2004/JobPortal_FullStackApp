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

    @Lob
    private byte[] companyLogo;

    private String companyUrl;

    @Lob
    private byte[] profilePicture;

    @Column(nullable = false)
    @ColumnDefault("false")
    private boolean isProfileComplete = false;

}
