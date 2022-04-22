//package com.onlinebookstore.controller;
//
//import com.alibaba.fastjson.JSON;
//import org.aspectj.lang.JoinPoint;
//import org.aspectj.lang.annotation.*;
//import org.springframework.stereotype.Component;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//
//import javax.servlet.http.HttpServletRequest;
//import java.io.BufferedReader;
//
///**
// * 刘运通
// * 20190324
// * 作用实现拦截http请求.
// */
//@Aspect
//@Component //把这个文件引入到Spring容器里面去.
//public class HttpAspect {
//
//    @Pointcut("execution(public * com.onlinebookstore.*.*.*(..))")
//    public void log() {
//
//    }
//
//    /**
//     * 拦截那些方法.请求前.
//     * JoinPoint 获取类方法和类名对象.
//     */
//    @Before("log()")
//    public void logBefore(JoinPoint joinPoint) {
//        try {
//            System.out.println("拦截了getInfo方法");
//            //url,method,ip,类方法,参数.
//            //SpringBoot通过RequestContextHolder获取HttpRequest和HttpResponse
//            ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
//            //javax.servlet.http.HttpServletRequest
//            HttpServletRequest request = attributes.getRequest();
////            BufferedReader br = request.getReader();
////            String str, wholeStr = "";
////            while((str = br.readLine()) != null){
////                wholeStr += str;
////            }
////            System.out.println(wholeStr);
////
//            System.out.println("url" + request.getRequestURL());
//            System.out.println("method" + request.getMethod());
//            System.out.println("ip" + request.getRemoteAddr());
//
//
//            //类方法.
//            System.out.println("类方法" + joinPoint.getSignature().getDeclaringTypeName()
//                    + "." + joinPoint.getSignature().getName()
//            );
//            //参数:
//            System.out.println("Parms:" + JSON.toJSONString(joinPoint.getArgs()));
//        } catch (Exception e) {
//            System.out.println(e.toString());
//        }
//
//
//    }
//
//    /**
//     * 拦截那些方法.请求后.
//     */
//    @After("log()")
//    public void logAfter() {
//        System.out.println("拦截了getInfo方法.之后");
//    }
//
//    /**
//     * 返回参数.
//     *
//     * @param object 入参
//     */
//    @AfterReturning(returning = "object", pointcut = "log()")
//    public void doAfterReturning(Object object) {
//        System.out.println(object);
//    }
//}