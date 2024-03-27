package acpy.models.service.AUS;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AUS0101IN {
    private String chnl;
    private String component_id;
    private String component_path;
    private String header_flag;
    private String footer_flag;
}
