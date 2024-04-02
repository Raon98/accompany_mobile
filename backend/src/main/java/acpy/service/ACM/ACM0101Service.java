package acpy.service.ACM;

import acpy.models.service.ACM.ACM0101IN;
import acpy.models.service.ACM.ACM0101OUT;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


@Service("ACM0101Service")
public class ACM0101Service {
    /**
     *
     * @param ACM0101IN in
     * @param ACM0101OUT out
     * @return
     * @throws Exception
     */
    public boolean ACM0101S01(ACM0101IN in, ACM0101OUT out) throws Exception {
        try {
            // 베이스64로 인코딩된 이미지를 바이트 배열로 디코딩
            byte[] imageBytes = Files.readAllBytes(Paths.get(in.getImagePath()));

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

                // 추출된 텍스트를 out 객체에 설정하여 리턴
                out.setData(resultText.toString());
                return true;
            }
        } catch (IOException e) {
            // 에러 발생 시 처리
            e.printStackTrace();
            return false;
        }
    }
}
