package acpy.api.controller;


import acpy.api.support.AcpyLogger;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;


@RequestMapping("/v1/ext")
@RestController
public class GoogleVisionController {

    @GetMapping("/test")
    public String test(){
        return "HELLO";
    }
    @PostMapping("/GoogleVision")
    public ResponseEntity<String> GoogleVisionImgToText(@RequestBody Map<String, Object> requestBody){

        try {
            AcpyLogger.info("=============  CALL GoogleVision START ==============");
            Map<String, Object> datParams = (Map<String, Object>) requestBody.get("REQ_DAT");
            String base64EncodedImage = (String) datParams.get("base64Image");

            // 이미지 파일로 저장
            String filePath = saveBase64ImageToFile(base64EncodedImage);
            AcpyLogger.info("============= GoogleVision filePath {} ==============",filePath);
            byte[] imageData = readImageDataFromFile(filePath);
            AcpyLogger.info("============= GoogleVision imageData {} ==============",imageData);
            String detectedText = detectText(imageData);
            AcpyLogger.info("============= GoogleVision detectedText {} ==============",detectedText);
            AcpyLogger.info("=============  GoogleVision END ==============");
            // 추출된 텍스트 반환
            return ResponseEntity.ok(detectedText);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while processing the image: " + e.getMessage());
        }
    }

    private String saveBase64ImageToFile(String base64EncodedImage) throws IOException {
        // 임시 이미지 파일 경로
        String tempFilePath = "C:\\Users\\LG\\Desktop\\portfoilo\\accompany_mobile\\src\\main\\resources\\image\\image.png";

        // Base64 디코딩된 이미지 데이터를 바이트 배열로 변환
        byte[] imageBytes = Base64.getDecoder().decode(base64EncodedImage);

        // 임시 이미지 파일로 저장
        FileOutputStream fileOutputStream = new FileOutputStream(tempFilePath);
        fileOutputStream.write(imageBytes);
        fileOutputStream.close();

        return tempFilePath;
    }

    // 파일로부터 이미지 데이터 읽어오기
    private byte[] readImageDataFromFile(String filePath) throws IOException {
        // 파일에서 이미지 바이트 데이터를 읽어옴
        try (FileInputStream fileInputStream = new FileInputStream(filePath)) {
            byte[] imageData = new byte[fileInputStream.available()];
            fileInputStream.read(imageData);
            return imageData;
        }
    }

    // Vision API를 사용하여 텍스트 감지
    private String detectText(byte[] imageData) throws IOException {
        List<AnnotateImageRequest> requests = new ArrayList<>();

        // 이미지 바이트 데이터를 사용하여 Image 객체 생성
        Image img = Image.newBuilder().setContent(ByteString.copyFrom(imageData)).build();

        // Feature와 AnnotateImageRequest 생성
        Feature feat = Feature.newBuilder().setType(Feature.Type.TEXT_DETECTION).build();
        AnnotateImageRequest request = AnnotateImageRequest.newBuilder().addFeatures(feat).setImage(img).build();
        requests.add(request);

        // Vision API 클라이언트 생성
        try (ImageAnnotatorClient client = ImageAnnotatorClient.create()) {
            // 이미지에서 텍스트 감지 요청 보내기
            BatchAnnotateImagesResponse response = client.batchAnnotateImages(requests);
            // 응답 받은 결과 중에서 감지된 텍스트 추출
            StringBuilder resultText = new StringBuilder();
            for (AnnotateImageResponse res : response.getResponsesList()) {
                if (res.hasError()) {
                    // 에러가 발생한 경우 에러 메시지 반환
                    return "Error: " + res.getError().getMessage();
                }
                if (res.getTextAnnotationsList().size() > 0){
                    resultText.append(res.getTextAnnotationsList().get(0).getDescription());
                }
            }
            return resultText.toString();
        }
    }
}
