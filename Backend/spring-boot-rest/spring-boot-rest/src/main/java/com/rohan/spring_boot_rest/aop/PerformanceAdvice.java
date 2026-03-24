package com.rohan.spring_boot_rest.aop;


import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
@Aspect
public class PerformanceAdvice {


    private static final Logger LOGGER = LoggerFactory.getLogger(PerformanceAdvice.class);


    @Around("execution(* com.rohan.spring_boot_rest.service.JobService.*(..))")
    public Object moniterTime(ProceedingJoinPoint jp) throws Throwable {
        long start_time = System.currentTimeMillis();
        Object obj = jp.proceed();
        long finish_time = System.currentTimeMillis();
        LOGGER.info("Time Taken "+(finish_time-start_time)+ "ms");
        return obj;
    }

}
