package acpy.models.service.ACS;

import lombok.Data;
import org.springframework.stereotype.Component;

@Data
@Component
public class ACS0201IN {

    private String uid; /*아이디*/
    private String pass; /*비밀번호*/
    private String idty; /*신분 0:관리자 1:일반이용자 2:주최자 */
    private String name; /*이름*/
    private String mail; /*메인*/
    private String mohp; /*휴대폰번호*/
    private String gend; /*성별*/
    private String adrs; /*주소*/
    private String djch_flag;
    private String wedd_flag;
    private String fnrl_flag;

}
