package com.example.acpy.controller;

import com.example.acpy.models.DemoVo;
import com.example.acpy.service.CMM.DemoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class mainControllor {
    @Autowired
    private DemoService demoservice;

    @GetMapping("/select")
    public List<DemoVo> getSelectList(){
        return demoservice.select();
    }


    @GetMapping("/hello")
    public String hello(){
        return "HI";
    }

    @GetMapping(value = "/",produces = "application/json;charset=utf-8")
    public String Main(){
        return "MainPage입니다.";
    }

}