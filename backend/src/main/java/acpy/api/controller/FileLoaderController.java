package acpy.api.controller;

import acpy.api.support.AcpyLogger;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RequestMapping("/file")
@RestController
public class FileLoaderController {

    @GetMapping("/test")
    public String test(){
        AcpyLogger.info("=============  CALL test START ==============");
        return "HELLO";
    }

    @PostMapping("/Directory")
    public ResponseEntity<List<String>> fileInDirectory() {
        AcpyLogger.info("=============  CALL fileInDirectory START TEST입니다==============");
        String path = "C:\\Users\\LG\\Desktop\\portfoilo\\accompany_mobile\\frontend\\src\\views";
        AcpyLogger.info("path {}", path);
        File directory = new File(path);
       AcpyLogger.info("directory {}", directory);
        if (directory.exists() && directory.isDirectory()) {
            String[] files = directory.list();
            if (files != null) {
                return ResponseEntity.ok(Arrays.asList(files));
            } else {
                return ResponseEntity.noContent().build();
            }
        } else {
            return ResponseEntity.badRequest().body(new ArrayList<>());
        }
    }
}
