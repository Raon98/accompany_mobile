package acpy.api.utils;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import acpy.api.config.AesConfig;
import java.nio.charset.StandardCharsets;

@Component
public class AesUtil {

    private final AesConfig aesConfig;
    private static byte[] privateKey_256;

    @Autowired
    public AesUtil(AesConfig aesConfig) {
        this.aesConfig = aesConfig;
        privateKey_256 = aesConfig.getPwdPrivateKey().getBytes(StandardCharsets.UTF_8);
    }

    public static String encrypt(String plainText) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(privateKey_256, "AES");
        IvParameterSpec IV = new IvParameterSpec(privateKey_256, 0, 16);

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE, secretKey, IV);

        byte[] encryptionByte = c.doFinal(plainText.getBytes(StandardCharsets.UTF_8));

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
