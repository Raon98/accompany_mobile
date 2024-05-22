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

import java.io.FileWriter;
import java.io.IOException;

@Configuration
public class CloudVisionConfig {
    private static final String VisionKey = "visionKey.json";

    @Bean
    public ImageAnnotatorClient imageAnnotatorClient() throws IOException {
        // Gson 객체 생성
        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        // JSON 문자열 생성
        String jsonString = gson.toJson(createJsonObject());

        // JSON 문자열을 파일에 쓰기
        try (FileWriter file = new FileWriter(VisionKey)) {
            file.write(jsonString);
            file.flush();
        } catch (IOException e) {
            e.printStackTrace();
        }

        // 이미지 어노테이터 클라이언트 생성
        Resource credentialsResource = new ClassPathResource(VisionKey);
        AcpyLogger.info("credentialsResource {} ", credentialsResource);
        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsResource.getInputStream());
        ImageAnnotatorSettings settings = ImageAnnotatorSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        return ImageAnnotatorClient.create(settings);
    }

    // JSON 객체 생성 메서드
    private Object createJsonObject() {
        return new Object() {
            String type = "service_account";
            String project_id = "accompanyocr";
            String private_key_id = "799e649f5dbc273447fb43c18f533616878f964d";
            String private_key = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCoaI1s0uTGIR0K\nWYi57eJDxPyzn8fDsmud8DlQdxLiupFaaNG8Ufc8DI/Gq2HEKGBQ7GMvlXGfymDt\nALkim2v3vHfDJex+mwFZjlyjj082A5gSvX86MCMVtEK2dnuMWpUN/NfOkD0ZkLyT\nO7JsvQhRryfemdlw3QkAadkiay55HX6qHI7ReSRhE1q+1UXyRd+BdUqACse+d/f9\n8XY6FQjGn4dcALuMjarrtGdjCZ4YwoU3Jorj6TT0XtpdXRUJvBgkb0Bnl4CzaBih\nDgOEnaFwXb/zjAM9Gb58L6aNXFk7tvT9xN1Pm7zY5HtHNuIKFjWtlJoH+V/azXOs\nHsu9JBNnAgMBAAECggEADodmnBrdrdIxhTEQQKorORmHi5+fRlzgN/H/n9eGA5WA\n8MHWRl7z63RR+xvSBXBOTuz16acE9HorPocvcbLi766MzoM5EfshdK55g4rblJde\nyU8b6NM6U6cHkmJKamNuNJS5sZJ0Ev6PpkwiKotsak+oKuYvAjOvkR+Qog2JJt2m\nucLsRdA4n3OR6sGIBa6Tunqa4NXODgnIPSsBd0u9Qu+tbkRyQa3imayn0DDI4oY7\ntOQfmhb7ocWxZjexwD1kpqFEnD3/ZI8pNpeVnR/vtH1AA/+UeioPMFAeh16l2Sl+\nkKjrq7hNwA0JJIfWkivTJf0oc6yxBpTJs3KMrIk1QQKBgQDRq/H9ofDYzivs/7NM\nW1Bw0bq+GAr8Zl1TKFUq0OMJUQpXwpG4acKQq4ZRukR8kXOYmxsd9EuwPBBzDzBk\nS6ZaXjzuof0/d6YEfKmjeeijrKqD9RjbksWuV2ySDxzUf8unQe+2YOk8ruPcL8Il\nl9ImsAcW3/xxtB1zMUegAn8etwKBgQDNno5EXIQcIz2TT/Spe9sEU55qM6CUkLVj\n9ClxEXuvSYfEYmGtSKOblW0iY6Yz8UxJpkj7GSdbNh5D/iooAcS+lpFv28LXE8xS\nXWflwo4Dz/jwagxDNKwz5WeUviB+UDAjWMnRVB7ULvKIBQdiy86jmagGbHyU5X7/\np3kUC4QA0QKBgGl2Fy3/+mjSqv12T/UkKP3WQBvFdCEoS+C79Lqofsn83TrvPuSH\nLboezFznV/NgJciom6chbcCjNZLqHOkVtALYS8Wr7PmzcOno2lrDwuQwwUPGUE6B\nMLVUe+OrflDURtdGLxCJBkfjn/Dsh";
            String client_email = "cheol1998@accompanyocr.iam.gserviceaccount.com";
            String client_id = "101424226541611167628";
            String auth_uri = "https://accounts.google.com/o/oauth2/auth";
            String token_uri = "https://oauth2.googleapis.com/token";
            String auth_provider_x509_cert_url = "https://www.googleapis.com/oauth2/v1/certs";
            String client_x509_cert_url = "https://www.googleapis.com/robot/v1/metadata/x509/cheol1998%40accompanyocr.iam.gserviceaccount.com";
            String universe_domain = "googleapis.com";
        };
    }
}
