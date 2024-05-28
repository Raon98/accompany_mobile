package acpy.service.ACS;


import acpy.api.utils.JwtUtil;
import acpy.models.service.ACS.ACS0201IN;
import acpy.models.service.ACS.ACS0201OUT;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("ACS0201Service")
public class ACS0201Service {

    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public boolean ACS0201S01(ACS0201IN in, ACS0201OUT out) throws Exception {
        JwtUtil jwtUtils = new JwtUtil();

        //1. DB 정보조회
        

        //2. DB 조회 성공시 JWT 토큰 발행
        Map<String, String> result = jwtUtils.generateToken(in.getUid());
        System.out.println("serviceTester " + result);

        out.setData(result);
        return true;
    }
}
