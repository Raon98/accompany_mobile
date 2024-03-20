import com.google.api.gax.rpc.ApiException;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class CloudVisionController {

    @PostMapping("/ext/vision")
    public ResponseEntity<String> imageToTextVision(@RequestBody String imageData) {
        try {
            // 이미지 파일을 byte 배열로 변환
            byte[] imageBytes = imageData.getBytes();

            // Google Vision API 클라이언트 생성
            try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
                // 이미지 주석 요청 생성
                AnnotateImageRequest request = AnnotateImageRequest.newBuilder()
                        .setImage(Image.newBuilder().setContent(ByteString.copyFrom(imageBytes)))
                        .addFeatures(Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION))
                        .build();
                List<AnnotateImageRequest> requests = new ArrayList<>();
                requests.add(request);

                // 이미지 주석 처리
                BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);

                // 결과 처리
                StringBuilder resultText = new StringBuilder();
                for (AnnotateImageResponse res : response.getResponsesList()) {
                    for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                        // 이미지에서 추출된 텍스트 추가
                        resultText.append(annotation.getDescription()).append("\n");
                    }
                }

                // 추출된 텍스트 반환
                return ResponseEntity.ok(resultText.toString());
            }
        } catch (IOException | ApiException e) {
            // 에러 발생 시 처리
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + e.getMessage());
        }
    }
}
