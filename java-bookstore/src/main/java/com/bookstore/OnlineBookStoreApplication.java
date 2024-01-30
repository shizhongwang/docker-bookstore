package com.bookstore;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;

@SpringBootApplication
//@ComponentScans({
//		@ComponentScan(value = "com.bookstore.config"),
//})
//public class OnlineBookStoreApplication {
//    public static void main(String[] args) {
//        SpringApplication.run(OnlineBookStoreApplication.class, args);
//    }
//}

public class OnlineBookStoreApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(OnlineBookStoreApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(OnlineBookStoreApplication.class);
    }
}