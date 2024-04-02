package acpy.models.db.AUI;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class AUI01REQ {
    private String uid;
    private String name;
}
