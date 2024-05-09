package acpy.models.service.AAS;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AAS0101IN {
    private String chnl;
    private String component_id;
    private String component_path;
    private String header_flag;
    private String footer_flag;
}