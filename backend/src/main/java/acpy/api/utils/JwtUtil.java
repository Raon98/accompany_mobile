package acpy.api.utils;

import io.jsonwebtoken.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.util.Calendar.HOUR;

public class JwtUtil {
    private static final String SECRET_KEY = "accompanylogintestaccompanylogintestaccompanylogintestaccompanylogintestaccompanylogintest";
    private static final long ACC_TOKEN_VALIDITY = HOUR / 2;
    private static final long REF_TOKEN_VALIDITY = HOUR * 24 * 15;


    public Map<String, String> generateToken(String uid) {
        Map<String, String> tokens = new HashMap<>();

        JwtBuilder builder = Jwts.builder();
        builder.setSubject(uid);
        builder.setIssuedAt(new Date());
        builder.setExpiration(new Date(System.currentTimeMillis() + ACC_TOKEN_VALIDITY));
        builder.signWith(SignatureAlgorithm.HS256, SECRET_KEY); //  알고리즘 명시적으로 지정
        String accessToken = builder.compact();

        Date refTokenExpirationTime = new Date(System.currentTimeMillis() + REF_TOKEN_VALIDITY);
        builder.setExpiration(refTokenExpirationTime);
        builder.signWith(SignatureAlgorithm.HS256, SECRET_KEY); // 알고리즘 명시적으로 지정
        String refreshToken = builder.compact();

        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        return tokens;
    }


    private Jws<Claims> getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
    }

}
