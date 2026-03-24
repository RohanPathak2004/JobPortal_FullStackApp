package com.rohan.spring_boot_rest.service;


import com.rohan.spring_boot_rest.dto.UserRegisterRequestDto;
import com.rohan.spring_boot_rest.dto.UserResponseDto;
import com.rohan.spring_boot_rest.model.Recruiter;
import com.rohan.spring_boot_rest.model.User;
import com.rohan.spring_boot_rest.repo.RecruiterRepo;
import com.rohan.spring_boot_rest.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private RecruiterRepo recruiterRepo;

    @Autowired
    private BCryptPasswordEncoder encoder ;

    public UserResponseDto saveUser(UserRegisterRequestDto userRegisterRequestDto){
        User user = new User();
        user.setEmail(userRegisterRequestDto.email());
        user.setPassword(encoder.encode(userRegisterRequestDto.password()));
        user.setAuthority(userRegisterRequestDto.authority());
        User savedUser  = userRepo.save(user);
        System.out.println(savedUser.getAuthority());
        if(Objects.equals(savedUser.getAuthority(), "RECRUITER")){
            System.out.println("inside the service of recruiter");
            Recruiter recruiter = new Recruiter();
            recruiter.setEmail(savedUser.getEmail());
            recruiterRepo.save(recruiter);
        }


        UserResponseDto userResponseDto = new UserResponseDto(savedUser.getEmail(),savedUser.getAuthority());
        return userResponseDto;
    }

}
