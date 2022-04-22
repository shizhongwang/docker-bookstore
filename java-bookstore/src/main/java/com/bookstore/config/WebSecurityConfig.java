//package com.onlinebookstore.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
//@Configuration
//@EnableWebSecurity
//@EnableGlobalMethodSecurity(prePostEnabled = true)
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//    private static final String[] AUTH_WHITELIST = {
//            // -- swagger ui
//            "/",
//            "/csrf",
//            "/v2/api-docs",
//            "/swagger-resources",
//            "/swagger-resources/**",
//            "/swagger-ui.html",
//            "/webjars/**",
//            "/csrf",
//            "/configuration/*",
//            "/configuration/ui",
//            "/configuration/security",
//            // -- web api
//            "/**",
//            // -- other
//            "favicon.ico"
//    };
//
//
//    @Override
//    public void configure(HttpSecurity http) throws Exception {
//        // disable CSRF check
//        http.csrf()
//                .disable()
//                .authorizeRequests()
//                .antMatchers(AUTH_WHITELIST).permitAll()
//                .anyRequest().authenticated();
//    }
//}
