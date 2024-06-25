package acpy.api.utils;
import acpy.api.support.AcpyLogger;
import io.jsonwebtoken.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.util.Calendar.HOUR;

public class JwtUtil {
    
    
    private static final String SECRET_KEY = "accompanylogintestaccompanylogintestaccompanylogintestaccompanylogintestaccompanylogintest";
    private static final long ACC_TOKEN_VALIDITY = HOUR / 2;
    private static final long REF_TOKEN_VALIDITY = HOUR * 24 * 15;

    
    @SuppressWarnings("deprecation")
    public Map<String, String> generateToken(String uid) {
        AcpyLogger.info("============= generateToken CALL START ==============");
        Map<String, String> tokens = new HashMap<>();

        JwtBuilder builder = Jwts.builder();
        builder.setSubject(uid);
        builder.setIssuedAt(new Date());
        builder.setExpiration(new Date(System.currentTimeMillis() + ACC_TOKEN_VALIDITY));
        builder.signWith(SignatureAlgorithm.HS256, SECRET_KEY); 
        String accessToken = builder.compact();

        Date refTokenExpirationTime = new Date(System.currentTimeMillis() + REF_TOKEN_VALIDITY);
        builder.setExpiration(refTokenExpirationTime);
        builder.signWith(SignatureAlgorithm.HS256, SECRET_KEY); 
        String refreshToken = builder.compact();

        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);


        AcpyLogger.info("============= TOKEN : {} ==============" ,tokens);
        AcpyLogger.info("============= generateToken CALL START ==============");
        return tokens;
    }

    public String generateAccessToken(String uid) {
        AcpyLogger.info("============= generateAccessToken CALL START ==============");
        JwtBuilder builder = Jwts.builder();
        builder.setSubject(uid);
        builder.setIssuedAt(new Date());
        builder.setExpiration(new Date(System.currentTimeMillis() + ACC_TOKEN_VALIDITY));
        builder.signWith(SignatureAlgorithm.HS256, SECRET_KEY); 
        String accessToken = builder.compact();
        AcpyLogger.info("============= generateAccessToken CALL END ==============");
        return accessToken;
    }

    public String getUidFromToken(String token) {
        return getAllClaimsFromToken(token).getBody().getSubject();
    }
    
    private Jws<Claims> getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
    }

    public boolean validateToken(String token) {
        try {
            getAllClaimsFromToken(token);
            return true;
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException e) {
            AcpyLogger.error("Invalid JWT Token: {}", e.getMessage());
            return false;
        }
    }

    public Map<String, String> refreshTokens(String refreshToken) {
        AcpyLogger.info("============= refreshTokens CALL START ==============");
        Map<String, String> tokens = new HashMap<>();
        if (validateToken(refreshToken)) {
            String uid = getUidFromToken(refreshToken);
            String newAccessToken = generateAccessToken(uid);
            tokens.put("accessToken", newAccessToken);
            tokens.put("refreshToken", refreshToken); 
        } else {
            throw new RuntimeException("Invalid Refresh Token");
        }
        AcpyLogger.info("============= refreshTokens CALL END ==============");
        return tokens;
    }


}
