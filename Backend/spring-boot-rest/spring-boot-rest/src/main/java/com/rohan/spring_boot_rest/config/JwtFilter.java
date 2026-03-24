package com.rohan.spring_boot_rest.config;

import com.rohan.spring_boot_rest.service.JwtService;
import com.rohan.spring_boot_rest.service.MyUserDetailService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private ApplicationContext applicationContext;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        String token = null;
        String username = null;
        String role = null;

        try {
            if(authHeader !=null && authHeader.startsWith("Bearer ")){
                token = authHeader.substring(7);
                username = jwtService.extractUserName(token);
            }

            if(username !=null && SecurityContextHolder.getContext().getAuthentication() == null){
                UserDetails userDetails = (UserDetails) applicationContext.getBean(MyUserDetailService.class).loadUserByUsername(username);
                
                if(jwtService.validateToken(token,userDetails)){
                    role = jwtService.extractRole(token);
                    Collection<? extends GrantedAuthority> authorities = Collections.singleton(new SimpleGrantedAuthority(role));
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null,authorities);
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
            }
        } catch (Exception e) {
            // Log the exception but continue the filter chain
            // This ensures endpoints like /login still work even if an old/invalid token was sent
            System.out.println("JWT Verification failed: " + e.getMessage());
        }

        filterChain.doFilter(request,response);
    }
}
