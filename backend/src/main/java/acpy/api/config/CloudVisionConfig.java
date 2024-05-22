package acpy.api.config;

import acpy.api.support.AcpyLogger;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.vision.v1.ImageAnnotatorClient;
import com.google.cloud.vision.v1.ImageAnnotatorSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Configuration
public class CloudVisionConfig {

    @Value("${google.cloud.vision.project-id}")
    private String projectId;

    @Value("${google.cloud.vision.private-key-id}")
    private String privateKeyId;

    @Value("${google.cloud.vision.private-key}")
    private String privateKey;

    @Value("${google.cloud.vision.client-email}")
    private String clientEmail;

    @Value("${google.cloud.vision.client-id}")
    private String clientId;

    @Value("${google.cloud.vision.auth-uri}")
    private String authUri;

    @Value("${google.cloud.vision.token-uri}")
    private String tokenUri;

    @Value("${google.cloud.vision.auth-provider-x509-cert-url}")
    private String authProviderX509CertUrl;

    @Value("${google.cloud.vision.client-x509-cert-url}")
    private String clientX509CertUrl;

    @Value("${google.cloud.vision.universe-domain}")
    private String universeDomain;

    @Bean
    public ImageAnnotatorClient imageAnnotatorClient() throws IOException {
        // JSON 문자열 생성
        String credentialsJson = String.format(
                "{" +
                        "\"type\": \"service_account\"," +
                        "\"project_id\": \"%s\"," +
                        "\"private_key_id\": \"%s\"," +
                        "\"private_key\": \"%s\"," +
                        "\"client_email\": \"%s\"," +
                        "\"client_id\": \"%s\"," +
                        "\"auth_uri\": \"%s\"," +
                        "\"token_uri\": \"%s\"," +
                        "\"auth_provider_x509_cert_url\": \"%s\"," +
                        "\"client_x509_cert_url\": \"%s\"," +
                        "\"universe_domain\": \"%s\"" +
                        "}",
                projectId, privateKeyId, privateKey, clientEmail, clientId, authUri, tokenUri, authProviderX509CertUrl, clientX509CertUrl, universeDomain
        );

        AcpyLogger.info("Generated credentials JSON: {} ", credentialsJson);

        // GoogleCredentials 객체 생성
        GoogleCredentials credentials = GoogleCredentials.fromStream(new ByteArrayInputStream(credentialsJson.getBytes(StandardCharsets.UTF_8)));
        ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();

        return ImageAnnotatorClient.create(settings);
    }
}
