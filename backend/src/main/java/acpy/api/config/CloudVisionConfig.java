package acpy.api.config;

import acpy.api.support.AcpyLogger;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

@Configuration
public class CloudVisionConfig {
    private static final String VisionKey = "visionKey.json";
    private static final String FILE_PATH = "src/main/resources/application.properties";
    private static final Properties properties = new Properties();

    static {
        try {
            properties.load(new FileInputStream(FILE_PATH));
            AcpyLogger.info("Loaded properties from file: {}", FILE_PATH);

            // 로드된 프로퍼티들을 로깅합니다.
            properties.forEach((key, value) -> AcpyLogger.info("Property: {} = {}", key, value));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static String getProjectId() {
        return properties.getProperty("vision.projectId");
    }

    public static String getPrivateKeyId() {
        return properties.getProperty("vision.privateKeyId");
    }

    public static String getPrivateKey() {
        return properties.getProperty("vision.privateKey");
    }

    public static String getClientEmail() {
        return properties.getProperty("vision.clientEmail");
    }

    public static String getClientId() {
        return properties.getProperty("vision.clientId");
    }

    public static String getAuthUri() {
        return properties.getProperty("vision.authUri");
    }

    public static String getTokenUri() {
        return properties.getProperty("vision.tokenUri");
    }

    public static String getAuthProviderX509CertUrl() {
        return properties.getProperty("vision.authProviderX509CertUrl");
    }

    public static String getClientX509CertUrl() {
        return properties.getProperty("vision.clientX509CertUrl");
    }

    public static String getUniverseDomain() {
        return properties.getProperty("vision.universeDomain");
    }

    public static String getJwtSecretKey() {
        return properties.getProperty("jwt.secretKey");
    }

    @Bean
    public ImageAnnotatorClient imageAnnotatorClient() throws IOException {
        Map<String, String> credentialsMap = new HashMap<>();
        credentialsMap.put("type", "service_account");
        credentialsMap.put("project_id", getProjectId());
        credentialsMap.put("private_key_id", getPrivateKeyId());
        credentialsMap.put("private_key", getPrivateKey());
        credentialsMap.put("client_email", getClientEmail());
        credentialsMap.put("client_id", getClientId());
        credentialsMap.put("auth_uri", getAuthUri());
        credentialsMap.put("token_uri", getTokenUri());
        credentialsMap.put("auth_provider_x509_cert_url", getAuthProviderX509CertUrl());
        credentialsMap.put("client_x509_cert_url", getClientX509CertUrl());
        credentialsMap.put("universe_domain", getUniverseDomain());

        Gson gson = new GsonBuilder().create();

        try (FileWriter fileWriter = new FileWriter("src/main/resources/" + VisionKey)) {
            gson.toJson(credentialsMap, fileWriter);
        } catch (IOException e) {
            e.printStackTrace();
        }

        
        Resource resource = new ClassPathResource(VisionKey);
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
        ImageAnnotatorSettings clientSettings = ImageAnnotatorSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();

        return ImageAnnotatorClient.create(clientSettings);
    }
}
