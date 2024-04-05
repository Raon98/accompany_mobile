package acpy.api.config;

import acpy.api.support.AcpyLogger;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

@Configuration
public class CloudVisionConfig {
    private static final String VisionKey = "visionKey.json";

    @Bean
    public ImageAnnotatorClient imageAnnotatorClient() throws IOException {

        Resource credentialsResource = new ClassPathResource(VisionKey);
        AcpyLogger.info("credentialsResource {} " , credentialsResource);
        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsResource.getInputStream());
        ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        return ImageAnnotatorClient.create(settings);
    }
}
