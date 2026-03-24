package com.rohan.spring_boot_rest.service;


import com.rohan.spring_boot_rest.model.User;
import com.rohan.spring_boot_rest.model.UserPrincipal;
import com.rohan.spring_boot_rest.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service //it is service so yes we use this annotation
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo; //fetches the user from the database

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(username);

        if (user==null) throw new UsernameNotFoundException(username);
        System.out.println(user.toString());
        return new UserPrincipal(user);
    }
}
