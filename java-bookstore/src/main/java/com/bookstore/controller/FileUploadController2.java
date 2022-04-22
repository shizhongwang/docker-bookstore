package com.bookstore.controller;

import cn.hutool.core.lang.UUID;
import org.apache.logging.log4j.LogManager;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.logging.Logger;


@RestController
@CrossOrigin
public class FileUploadController2 {
    private DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");

    @Value("${file.path}")
    private String filePath;

//    @PostMapping("/upload")
//    public String upload(MultipartFile file, HttpServletRequest request) {
//        // 把文件保存到当前项目的路径下面
//        String rootPath = request.getSession().getServletContext().getRealPath("/uploadfile/");
//        String format = LocalDateTime.now().format(formatter);
//        File dir = new File(rootPath + format);
//        if (!dir.isDirectory()) {
//            dir.mkdirs();
//        }
//        // 通过 UUID 生成新的文件名防止文件名重复
//        String oldName = file.getOriginalFilename();
//        String newName = UUID.randomUUID().toString() + oldName.substring(oldName.lastIndexOf("."), oldName.length());
//
//        LogManager.getLogger().debug(oldName + "---" + newName);
//        try {
//            // 保存文件
//            file.transferTo(new File(dir, newName));
//            // 返回文件路径
//            String filePath = String.format("%s://%s:%d/uploadfile/%s/%s", request.getScheme(),
//                    request.getServerName(), request.getServerPort(),
//                    format, newName);
//
//            LogManager.getLogger().debug(filePath);
//
//            return filePath;
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        return "上传失败!";
//    }
}


//@RestController
//public class FileUploadController {
//
//    //    private final Log log = LogFactory.get();
//    private final Logger log = LogManager.getLogger();
//    /**
//     * 配置的上传路径
//     */
//    @Value("${file.path}")
//    private String filePath;
//
//    /**
//     * 普通文件上传
//     *
//     * @param files
//     * @param request
//     * @return
//     */
//    @PostMapping("/uploadFile")
//    @ApiOperation("普通文件上传")
//    public JsonResult uploadFile(@RequestParam("files") List<CommonsMultipartFile> files, HttpServletRequest request) {
//        StringBuffer buffer = new StringBuffer();
//        for (CommonsMultipartFile file : files) {
//            //获取原文件名称和后缀
//            String originalFilename = file.getOriginalFilename();
//            // 获取文件后缀名
//            String fil_extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
//
//            LocalDateTime now = LocalDateTimeUtil.now();
//            int year = now.getYear();
//            int month = now.getMonthValue();
//            int day = now.getDayOfMonth();
//            long milli = now.toInstant(ZoneOffset.of("+8")).toEpochMilli();
//            String path = StrUtil.format("{}/{}/{}/{}", year, month, day, milli + originalFilename);
//            try {
//                File file1 = new File(filePath + path);
//                boolean mkdirs = file1.mkdirs();
//                log.info("文件夹{}创建{}", file1.getAbsolutePath(), mkdirs ? "成功" : "失败");
//                file.transferTo(file1);
//                log.info("{} 上传成功！", originalFilename);
//                if (StrUtil.isBlank(buffer)) {
//                    path = StrUtil.format("{}://{}:{}/{}/{}",
//                            request.getScheme(),
//                            StrUtil.equals(SystemUtil.getHostInfo().getAddress(), "127.0.0.1") ? "192.168.31.120" : SystemUtil.getHostInfo().getAddress(),
//                            request.getServerPort(),
//                            "upload",
//                            path);
//                } else {
//                    path = StrUtil.format(",{}://{}:{}/{}/{}", request.getScheme(), StrUtil.equals(SystemUtil.getHostInfo().getAddress(), "127.0.0.1") ? "192.168.31.120" : SystemUtil.getHostInfo().getAddress(), request.getServerPort(), "upload", path);
//                }
//                buffer.append(path);
//            } catch (IOException e) {
//                e.printStackTrace();
//                log.error("{} 上传失败！", originalFilename);
//                continue;
//            }
//
//        }
//        return new JsonResult(buffer);
//    }
//
////    /**
////     * 获取上传进度
////     *
////     * @param request
////     * @return
////     */
////    @GetMapping(value = "/uploadStatus")
////    @ApiOperation("获取上传进度")
////    public JsonResult uploadStatus(HttpServletRequest request) {
////        HttpSession session = request.getSession();
////        ProgressEntity percent = (ProgressEntity) session.getAttribute("status");
////        return new JsonResult(percent);
////    }
//
//    /**
//     * 删除文件
//     *
//     * @param url http://127.0.0.1:8080/upload/2020/7/19/1595158527436video.mp4
//     * @return
//     */
//    @GetMapping(value = "/deleteFile")
//    @ApiOperation("删除文件")
//    public JsonResult deleteFile(String url) throws Exception {
//        //截取第四个“/”后面的字符串
//        int i1 = url.indexOf('/');
//        int i2 = url.indexOf('/', i1 + 1);
//        int i3 = url.indexOf('/', i2 + 1);
//        int i4 = url.indexOf("/", i3 + 1);
//        String substring = url.substring(i4 + 1, url.length());
//        String relPath = filePath + substring;
//        File file = new File(relPath);
//        if (file.isFile() && file.exists()) {
//            boolean delete = file.delete();
//            if (!delete) {
//                log.error("{} 删除失败！", substring);
//                throw new Exception("faile to delete file.");
//            } else {
//                log.info("{} 删除成功！", substring);
//            }
//        } else {
//            log.error("{} 文件不存在！", substring);
//            throw new Exception("file does not exist.");
//        }
//        return new JsonResult("删除成功");
//    }
//}


//
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.UUID;
//
//import static com.bookstore.service.SaveFile.getRealPath;
//import static com.bookstore.service.SaveFile.saveFile;
//
//@RestController
//@CrossOrigin
//@RequestMapping("/FileUpload")
//public class FileUploadController {
////	@Autowired
////	private FileService fileService;
//
//    @RequestMapping(value = "/Index", method = RequestMethod.GET)
//    public String Index() {
//        return "FileUpload/Index";
//    }
//
//    @ResponseBody
//    @RequestMapping(value = "/FileUp", method = RequestMethod.POST)
//    public String fileUpload(@RequestParam("id") String id,
//                             @RequestParam("name") String name,
//                             @RequestParam("type") String type,
//                             @RequestParam("lastModifiedDate") String lastModifiedDate,
//                             @RequestParam("size") int size,
//                             @RequestParam("file") MultipartFile file) {
//        String fileName;
//
//        try {
//            String ext = name.substring(name.lastIndexOf("."));
//            fileName = UUID.randomUUID().toString() + ext;
//            saveFile(getRealPath(), fileName, file);
//        } catch (Exception ex) {
//            return "{\"error\":true}";
//        }
////		try {
////			fileService.save(new File(fileName, createMd5(file).toString(), new Date()));
////		} catch (Exception e) {
////			return "{\"error\":true}";
////		}
//
//        return "{jsonrpc = \"2.0\",id = id,filePath = \"/Upload/\" + fileFullName}";
//    }
//}
