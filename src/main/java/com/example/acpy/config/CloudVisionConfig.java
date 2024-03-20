import com.example.acpy.controller.AccompanyApiController;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

@Configuration
public class CloudVisionConfig {
    private static final Logger LOGGER = LogManager.getLogger(CloudVisionConfig.class);
    @Bean
    public ImageAnnotatorClient imageAnnotatorClient() throws IOException {

        Resource credentialsResource = new FileSystemResource("visionKey.json");
        LOGGER.info("credentialsResource {} " , credentialsResource);
        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsResource.getInputStream());
        ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        return ImageAnnotatorClient.create(settings);
    }
}
