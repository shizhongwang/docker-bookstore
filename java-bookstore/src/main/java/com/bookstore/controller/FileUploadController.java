package com.bookstore.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

import com.bookstore.service.FileUploadService;

import javax.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin
public class FileUploadController {

    @Autowired
    private FileUploadService fileUploadService;

    List<String> fileNames = new ArrayList<String>();

    @PostMapping("/upload")
    public ResponseEntity<String> fileUpload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        fileUploadService.storeFile(file, request);
        fileNames.add(file.getOriginalFilename());
        LogManager.getLogger().debug(file.getOriginalFilename());

        String msg = "File " + file.getOriginalFilename() + " uploaded successfully";
        return ResponseEntity.status(HttpStatus.OK).body(msg);
    }


    @GetMapping("/getFiles")
    public ResponseEntity<List<String>> getFile(Model model) {
        List<String> files = fileNames
                .stream()
                .map(fileName -> MvcUriComponentsBuilder.fromMethodName(FileUploadController.class, "getFileByName", fileName).build().toString())
                .collect(Collectors.toList());
        return ResponseEntity.ok().body(files);
    }

    @GetMapping("/download/{fileName:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFileByName(@PathVariable String fileName) {
        Resource file = fileUploadService.loadFile(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }
}
