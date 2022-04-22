package com.bookstore.service;

import cn.hutool.core.lang.UUID;
import org.apache.logging.log4j.LogManager;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

@Service
public class FileUploadService {

    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
    private final Path location = Paths.get("upload");

    public void storeFile(MultipartFile file, HttpServletRequest request) {
        try {
//            // 把文件保存到当前项目的路径下面
//            String rootPath = request.getSession().getServletContext().getRealPath("/uploadfile/");
//            String format = LocalDateTime.now().format(formatter);
//            File dir = new File(rootPath + format);
//            if (!dir.isDirectory()) {
//                dir.mkdirs();
//            }
//            // 通过 UUID 生成新的文件名防止文件名重复
//            String oldName = file.getOriginalFilename();
//            String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());
//
//            LogManager.getLogger().debug(oldName + "--->>>" + dir + "/" + newName);
//
//            //保存文件
//            file.transferTo(new File(dir, newName));
//            // 返回文件路径
//            String filePath = String.format("%s://%s:%d/uploadfile/%s/%s", request.getScheme(),
//                    request.getServerName(), request.getServerPort(),
//                    format, newName);


            File dir = getDir(request);
            String oldName = file.getOriginalFilename();
            file.transferTo(new File(dir, oldName));
            // 返回文件路径
            String filePath = String.format("%s://%s:%d/uploadfile/%s",
                    request.getScheme(),
                    request.getServerName(),
                    request.getServerPort(),
                    oldName);
            LogManager.getLogger().debug(filePath);

//            Path filePath = this.location.resolve(Objects.requireNonNull(file.getOriginalFilename()));
//            Files.copy(file.getInputStream(), filePath);
        } catch (Exception e) {
            throw new RuntimeException("Failed");
        }
    }

    private File getDir(HttpServletRequest request){
        String rootPath = request.getSession().getServletContext().getRealPath("/uploadfile/");
        File dir = new File(rootPath);
        if (!dir.isDirectory()) {
            dir.mkdirs();
        }
        return dir;
    }

    public Resource loadFile(String fileName) {
        try {

            Path file = location.resolve(fileName);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Failed");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Failed");
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(location.toFile());
    }

    public void init() {
        try {
            Files.createDirectory(location);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize storage!");
        }
    }

}
