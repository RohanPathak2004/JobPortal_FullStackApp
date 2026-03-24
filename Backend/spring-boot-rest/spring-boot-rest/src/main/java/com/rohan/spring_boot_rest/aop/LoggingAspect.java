package com.rohan.spring_boot_rest.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;


@Component
@Aspect //aspect
public class LoggingAspect {

    private static final Logger LOGGER = LoggerFactory.getLogger(LoggingAspect.class);


    //return type, class name.method Name, args

    //advice
    @Before("execution(* com.rohan.spring_boot_rest.service.JobService.getJob(..))") //inside the annotation this in point cut
    public void logMethodCall(JoinPoint jp){ //target the specific class
        LOGGER.info("Method called "+jp.getSignature().getName());
    }
    @After("execution(* com.rohan.spring_boot_rest.service.JobService.getJob(..))") //inside the annotation this in point cut
    public void logMethodExecuted(JoinPoint jp){ //target the specific class
        LOGGER.info("Method executed  "+jp.getSignature().getName());
    }

    @AfterThrowing("execution(* com.rohan.spring_boot_rest.service.JobService.getJob(..))")
    public void logMethodCrashed(JoinPoint jp){
        LOGGER.info("Method has some issues "+jp.getSignature().getName());
    }

    @AfterReturning("execution(* com.rohan.spring_boot_rest.service.JobService.getJob(..))")
    public void logMethodSuccess(JoinPoint jp){
        LOGGER.info("Method is successfully executed "+jp.getSignature().getName());
    }

}
