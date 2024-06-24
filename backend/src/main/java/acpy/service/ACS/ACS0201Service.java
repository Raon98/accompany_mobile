package acpy.service.ACS;

import java.util.Map;

import org.springframework.stereotype.Service;

import acpy.api.support.AcpyLogger;
import acpy.api.utils.JwtUtil;
import acpy.models.service.ACS.ACS0201IN;
import acpy.models.service.ACS.ACS0201OUT;

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

            Map<String, String> result = jwtUtils.generateToken(in.getUid());
            System.out.println("serviceTester " + result);
        // 1. DB 정보조회
        // AcpyLogger.error("getPriv_token 존재 여부 : {}", in.getPriv_token().isEmpty());
        // if (in.getPriv_token().isEmpty()) {
        //     // 2-1. 토큰이 없을경우 JWT 토큰 발행
        //     Map<String, String> result = jwtUtils.generateToken(in.getUid());
        //     System.out.println("serviceTester " + result);
        // } else {

        // }

        // 2-2. 토큰이 없을경우 JWT 토큰 발행
        out.setData(result);
        return true;
    }
}
