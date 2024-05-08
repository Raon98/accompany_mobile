package acpy.models.db.ACC;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class ACC01REQ {
    private String uid;
    private String name;
}
