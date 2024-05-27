package acpy.service.ACS;

import acpy.api.utils.JwtUtil;
import acpy.models.service.ACS.ACS0201IN;
import acpy.models.service.ACS.ACS0201OUT;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.JwtBuilder;

@Service("ACS0201Service")
public class ACS0201Service {
    private final String baseKey = "accompanylogintestaccompanylogintestaccompanylogintestaccompanylogintest";


    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public boolean ACS0201S01(ACS0201IN in, ACS0201OUT out) throws Exception {


        //1. DB 정보조회
        

        //2. DB 조회 성공시 JWT 토큰 발행
        String result = JwtUtil.generateToken(in.getUid());
        System.out.println("serviceTester " + result);

        out.setData(result);
        return true;
    }
}
