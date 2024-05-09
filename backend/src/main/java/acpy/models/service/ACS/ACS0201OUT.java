package acpy.models.service.ACS;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class ACS0201OUT {

   private Object data;
   private String code;
   private String msg;

}
