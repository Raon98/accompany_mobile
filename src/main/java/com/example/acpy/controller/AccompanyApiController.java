package com.example.acpy.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.gax.rpc.ApiException;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;


@RestController
public class AccompanyApiController {
    private final ObjectMapper objectMapper;
    private final ApplicationContext applicationContext;
    private static final Logger LOGGER = LogManager.getLogger(AccompanyApiController.class); // Logger 초기화

    @Autowired
    public AccompanyApiController(ObjectMapper objectMapper, ApplicationContext applicationContext) {
        this.objectMapper = objectMapper;
        this.applicationContext = applicationContext;
    }
    @PostMapping("/api/vision")
    public ResponseEntity<String> detectTextFromImage(@RequestBody String filePath) {
        String path = "C:\\Users\\LG\\Desktop\\portfoilo\\accompany_mobile\\src\\main\\resources\\132.png";
        try {

            byte[] imageData = readImageDataFromFile(path);

            String detectedText = detectText(imageData);

            // 추출된 텍스트 반환
            return ResponseEntity.ok(detectedText);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error occurred while processing the image: " + e.getMessage());
        }
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
                // 이미지에서 추출된 텍스트 결과 처리
                for (EntityAnnotation annotation : res.getTextAnnotationsList()) {
                    resultText.append(annotation.getDescription()).append("\n");
                }
            }
            return resultText.toString();
        }
    }


    @PostMapping("/api/{serviceId}")
    public ResponseEntity<Object> postServiceAPiRequest(
            @PathVariable String serviceId,
            @RequestBody Map<String, Object> params
    ) {
        LOGGER.info("============= Service CALL START ==============");
        try {

            /* ServiceID : AUI0101S01
             * 서비스 아이디만 입력할시 AUI0101Service파일 안에 AUI0101S01이있어야함
             * AUI0101S01 => AUI0101Service
             * */

            String ServiceId = serviceId.substring(0,7);
            String Service =ServiceId + "Service";
            LOGGER.info("============= ServiceID : {}==============", Service);
            LOGGER.info("============= MethodId : {}==============", serviceId);

            // 요청된 서비스 빈 가져오기
            Object serviceBean = applicationContext.getBean(Service);

            // 요청된 메서드 가져오기
            Method method = findMethod(serviceBean, serviceId);

            if (method != null) {
                Map<String, Object> datParams = (Map<String, Object>) params.get("REQ_DAT");
                Map<String, Object> modifiedParams = datParams != null ? datParams : params;

                Object inObj = mapParamsToInObject(ServiceId + "IN",modifiedParams);
                Object outObj = applicationContext.getBean(ServiceId + "OUT");

                LOGGER.info("============= Service inObj {} ==============",inObj);
                LOGGER.info("============= Service outObj {} ==============",outObj);
                LOGGER.info("============= Service CALL END ==============");
                Object result = method.invoke(serviceBean,inObj,outObj);;
                return ResponseEntity.ok(objectMapper.writeValueAsString(outObj));

            } else {
                LOGGER.info("============= Service CALL ERROR ==============");
                return ResponseEntity.badRequest().body("Method not found");
            }

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request");
        }


    }

    // 메서드 찾기
    private Method findMethod(Object serviceBean, String methodName) {
        for (Method method : serviceBean.getClass().getDeclaredMethods()) {
            if (method.getName().equals(methodName)) {
                return method;
            }
        }
        return null;
    }

    private Object mapParamsToInObject(String inClassName, Map<String, Object> params) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        Class<?> inClass = Class.forName("com.example.acpy.models.service."+inClassName.substring(0,3)+"."+ inClassName);
        Object inObj = inClass.getDeclaredConstructor().newInstance();

        // 파라미터 매핑
        for (Field field : inClass.getDeclaredFields()) {
            if (params.containsKey(field.getName())) {
                field.setAccessible(true);
                field.set(inObj, params.get(field.getName()));
            }
        }
        return inObj;
    }

}

