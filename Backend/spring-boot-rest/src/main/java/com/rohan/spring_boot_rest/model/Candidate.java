package com.rohan.spring_boot_rest.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.util.Map;


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
    private String name;
    @JdbcTypeCode(SqlTypes.JSON)
    private Map<String,String> socialLinks;
    private String about;
    private Boolean isProfileComplete;
}
