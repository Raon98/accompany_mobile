package com.example.acpy.demo.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class mainControllor {
    @GetMapping("/hello")
    public String hello(){
        return "HI";
    }

    @GetMapping(value = "/",produces = "application/json;charset=utf-8")
    public String Main(){
        return "MainPage입니다.";
    }

}