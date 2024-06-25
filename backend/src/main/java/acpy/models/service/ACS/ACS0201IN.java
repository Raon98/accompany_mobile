package acpy.models.service.ACS;

import lombok.Data;

@Data
public class ACS0201IN {

    private SignData signData;

    private String idty; /* 신분 0:관리자 1:일반이용자 2:주최자 */
    private String djch_flag;
    private String wedd_flag;
    private String fnrl_flag;

    private String priv_token;
    private String rfes_token;

    @Data
    public static class SignData {
        private String uid; // 아이디
        private String pass; // 비밀번호
        private String mail; // 메일
        private String name; // 이름
        private String mohp; // 휴대폰번호
        private String birth; // 생년월일
        private String gend; // 성별
    }

}
