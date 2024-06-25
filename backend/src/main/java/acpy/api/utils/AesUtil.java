package acpy.api.utils;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.springframework.stereotype.Component;

import acpy.api.config.AesConfig;
import acpy.api.support.AcpyLogger;

@Component
public class AesUtil {


    static String privKey = AesConfig.getPrivateKey();
    final static byte[] privateKey_256 = Arrays.copyOf(privKey.getBytes(StandardCharsets.UTF_8), 32); 

    public static String encrypt(String plainText) throws Exception {
        AcpyLogger.error("=============== 비밀번호 암호화 START ================");
        AcpyLogger.error("=============== privateKEY {} ================", privateKey_256);

        SecretKeySpec secretKey = new SecretKeySpec(privateKey_256, "AES");
        IvParameterSpec IV = new IvParameterSpec(privateKey_256, 0, 16);

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, secretKey, IV);

        byte[] encryptionByte = c.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
        AcpyLogger.error("=============== 비밀번호 암호화 END ================");
        return Hex.encodeHexString(encryptionByte);
    }

    public static String decrypt(String encryptedValue) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(privateKey_256, "AES");
        IvParameterSpec IV = new IvParameterSpec(privateKey_256, 0, 16);

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.DECRYPT_MODE, secretKey, IV);
        byte[] decodeByte = Hex.decodeHex(encryptedValue.toCharArray());

        return new String(c.doFinal(decodeByte), StandardCharsets.UTF_8);
    }
}
