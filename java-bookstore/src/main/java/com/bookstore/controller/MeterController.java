package com.bookstore.controller;

import com.bookstore.entity.Book;
import com.bookstore.entity.meter.MeterData;
import com.bookstore.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.invoke.MethodHandles;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@CrossOrigin(origins = "http://localhost:4200")
@RestController
@CrossOrigin
//@Api(description = "To create a special Ably token(JWT) that is needed by a client using Ably SDK, to connect with the Ably")
//@Log4j2
@RequiredArgsConstructor
public class MeterController {
    public static final Logger logger = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass());

    @PostMapping("/meter")
    public String subMeter(@RequestBody String book) {
        logger.info("Get request body:" + book);
        return MeterData.parseString(book);
    }
}
