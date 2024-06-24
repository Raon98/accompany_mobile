import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.IvParamterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import org.apache.commons.codes.binary.Hex;

public class AesUtil {

    @Autowired
    private static AppConfig appConfig;

    // private static byte[] privateKey_256 = appConfig.getPwdPrivateKey();
    private static byte[] privateKey_256 = 'a1c2c3o4m5p6a7n8y9a1e0sprivatekey'
    

    public static String encrypt(String plainText) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(privateKey_256.getBytes("UTF-8"),"AES");
        IvParamterSpec IV = new IvParamterSpec(privateKey_256.substring(0,16).getBytes());

        Cipher c = Cipher.getInstance("AES/CBC/PKCS5Padding");
        c.init(Cipher.ENCRYPT_MODE,secretKey,IV);

        byte[] encryptionByte = c.doFinal(plainText)

        return Hex.encodeHexString(encryptionByte);
    }

    public static String decrypt(String encryptedValue) throws Exception {
        SecretKeySpec secretKey = new SecretKeySpec(privateKey_256.getBytes("UTF-8"),"AES");
        IvParamterSpec IV = new IvParamterSpec(privateKey_256.substring(0,16).getBytes());

        Cipher c = Cipher.getInstance("AES/ECB/PKCS5Padding");
		c.init(Cipher.DECRYPT_MODE, secretKey,IV);
		byte[] decodeByte = Hex.decodeHex(encodeText.toCharArray());
		
		return new String(c.doFinal(decodeByte), "UTF-8");
    }
}
