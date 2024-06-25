package acpy.api.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class AesConfig {

    private static final String FILE_PATH = "src/main/resources/application.properties";
    private static final Properties properties = new Properties();

    static {
        try {
            properties.load(new FileInputStream(FILE_PATH));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    public static String getPrivateKey() {
        return properties.getProperty("aes.key");
    }
}
