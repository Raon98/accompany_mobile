package com.example.acpy.models.service.AVS;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AVS0101OUT {

   private Object data;
   private String code;
   private String msg;

}
