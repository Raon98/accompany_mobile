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
    import java.util.Properties;

    @Configuration
    public class CloudVisionConfig {
        private static final String VisionKey = "src/main/resources/visionKey.json";
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

        @Bean
        public ImageAnnotatorClient imageAnnotatorClient() throws IOException {

            Gson gson = new GsonBuilder().setPrettyPrinting().create();

            String jsonString = gson.toJson(createJsonObject());
            AcpyLogger.info("Loaded jsonString : {}", jsonString);
            try (FileWriter file = new FileWriter(VisionKey)) {
                file.write(jsonString);
                file.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }

            Resource credentialsResource = new ClassPathResource(VisionKey);
            AcpyLogger.info("credentialsResource {} ", credentialsResource);
            GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsResource.getInputStream());
            ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
                    .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                    .build();
            return ImageAnnotatorClient.create(settings);
        }

        private Object createJsonObject() {
            return new Object() {
                String type = "service_account";
                String project_id = getProjectId();
                String private_key_id = getPrivateKeyId();
                String private_key = getPrivateKey();
                String client_email = getClientEmail();
                String client_id = getClientId();
                String auth_uri = getAuthUri();
                String token_uri = getTokenUri();
                String auth_provider_x509_cert_url = getAuthProviderX509CertUrl();
                String client_x509_cert_url = getClientX509CertUrl();
                String universe_domain = getUniverseDomain();
            };
        }
    }
