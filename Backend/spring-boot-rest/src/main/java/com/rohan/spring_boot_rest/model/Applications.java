package com.rohan.spring_boot_rest.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Applications {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String name;
    private String email;
    private String resumeName;

    private String status;

    private String resumeType;
    @Lob
    private byte[] resumeFile;
    @ManyToOne
    private JobPost job;
}
