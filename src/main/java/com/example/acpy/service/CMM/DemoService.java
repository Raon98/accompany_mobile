package com.example.acpy.service.CMM;

import com.example.acpy.mapper.DemoMapper;
import com.example.acpy.models.DemoVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DemoService {
    @Autowired
    private DemoMapper mapper;

    public List<DemoVo> select() {
        return mapper.select();
    }
}
