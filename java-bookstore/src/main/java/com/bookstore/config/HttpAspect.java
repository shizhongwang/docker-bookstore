package com.bookstore.config;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.invoke.MethodHandles;

@Aspect
@Component
public class HttpAspect {
    public static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @Pointcut("execution(public * com.bookstore.*.*.*(..))")
    public void log() {
    }

    @Before("log()")
    public void logBefore(JoinPoint joinPoint) {
        try {
            System.out.println("拦截了getInfo方法");

            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            HttpServletRequest request = attributes.getRequest();

            logger.info("Request URL: {}", request.getRequestURL().toString());
            logger.info("HTTP Method: {}", request.getMethod());
            logger.info("IP Address: {}", request.getRemoteAddr());
            logger.info("Class Method: {}.{}", joinPoint.getSignature().getDeclaringTypeName(), joinPoint.getSignature().getName());
            logger.info("Request Parameters: {}", request.getParameterMap());
        } catch (Exception e) {
            System.out.println(e.toString());
        }
    }

    @After("log()")
    public void logAfter() {
        System.out.println("拦截了getInfo方法.之后");
    }

    @AfterReturning(returning = "object", pointcut = "log()")
    public void doAfterReturning(Object object) {
        System.out.println(object);
    }
}