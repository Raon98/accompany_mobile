package acpy.models.db.ACS;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class ACS02REQ {
    private String uid; // 아이디
    private String pass; // 비밀번호
    private String mail; // 메일
    private String name; // 이름
    private String mohp; // 휴대폰번호
    private String birth; // 생년월일
    private String gend; // 성별
    private String idty;
    private String djch_flag;
    private String wedd_flag;
    private String fnrl_flag;
    private String piin_agrm;
}
