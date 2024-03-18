package com.example.acpy.mapper;

import com.example.acpy.models.DemoVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@Mapper
public interface DemoMapper {
    List<DemoVo> select();
}
