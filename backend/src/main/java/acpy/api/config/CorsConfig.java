package acpy.api.config;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class CorsConfig {
    private static final String FILE_PATH = "src/main/resources/application.properties";
    private static final Properties properties = new Properties();

    static {
        try {
            properties.load(new FileInputStream(FILE_PATH));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getAllowedOrigins() {
        return properties.getProperty("cors.allowedOrigins");
    }

    public static String getAllowedHeaders() {
        return properties.getProperty("cors.allowedHeaders");
    }

    public static String getAllowedMethods() {
        return properties.getProperty("cors.allowedMethods");
    }

    public static boolean isAllowCredentials() {
        return Boolean.parseBoolean(properties.getProperty("cors.allowCredentials"));
    }

}
