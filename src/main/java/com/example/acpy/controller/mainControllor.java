package com.example.acpy.controller;

import com.example.acpy.models.service.TEST01IN;
import com.example.acpy.models.service.TEST01OUT;
import com.example.acpy.service.CMM.DemoService;
import com.example.acpy.support.LowerKeyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class mainControllor {
    @Autowired
    private DemoService demoservice;

    @GetMapping("/selectAll")
    public List<LowerKeyMap> getSelectList() throws Exception {
        TEST01IN in = new TEST01IN();
        in.setUid("sungcheol1998");
        TEST01OUT out = new TEST01OUT();
        return demoservice.selectAll(in,out);
    }


    @GetMapping("/select")
    public List<LowerKeyMap> getSelectList1() throws Exception {
        TEST01IN in = new TEST01IN();
        TEST01OUT out = new TEST01OUT();
        return demoservice.select(in,out);
    }


    @GetMapping("/insertMst")
    public boolean insertMst() throws Exception {
        TEST01IN in = new TEST01IN();
        TEST01OUT out = new TEST01OUT();
        in.setUid("minjuuu");
        in.setPass("cheolLove");
        in.setIdty("1");
        in.setName("차민주");
        in.setMail("minju@gmail.com");
        in.setMohp("010-2222-4444");
        in.setUage("25");
        in.setUsex("여");
        in.setUars("인천광역시");
        return demoservice.insert(in,out);
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