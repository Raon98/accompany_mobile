package com.example.acpy.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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

import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
public class AccompanyApiController {

    private final ApplicationContext applicationContext;
    private static final Logger LOGGER = LogManager.getLogger(AccompanyApiController.class); // Logger 초기화

    @Autowired
    public AccompanyApiController(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    // 변경된 컨트롤러 메서드
    @PostMapping("/api/{serviceId}")
    public ResponseEntity<Object> handlePostRequest(
            @PathVariable String serviceId,
            @RequestBody Map<String, Object> Params
    ) {
        LOGGER.info("============= Service CALL START ==============");
        try {

                /* ServiceID : AUI0101S01
                 * 서비스 아이디만 입력할시 AUI0101Service파일 안에 AUI0101S01이있어야함
                 * AUI0101S01 => AUI0101Service
                 * */
            String Service = serviceId.substring(0,7)+"Service";

            LOGGER.info("============= ServiceID : {}==============",Service);
            LOGGER.info("============= MethodId : {}==============",serviceId);

            // 요청된 서비스 빈 가져오기
            Object serviceBean = applicationContext.getBean(Service);

            // 요청된 메서드 가져오기
            Method method = findMethod(serviceBean, serviceId);

            if (method != null) {
                // 메서드 실행
                Object result = method.invoke(serviceBean, extractArguments(method, Params));
                LOGGER.info("============= Service CALL END ==============");
                return ResponseEntity.ok(result);
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

    private Object[] extractArguments(Method method, Map<String, Object> Params) throws JsonProcessingException {
        List<Object> arguments = new ArrayList<>();
        for (Parameter parameter : method.getParameters()) {
            if (Params.containsKey(parameter.getName())) {
                Object value = Params.get(parameter.getName());
                ObjectMapper objectMapper = new ObjectMapper();
                arguments.add(objectMapper.convertValue(value, parameter.getType()));
            } else {
                // 매개변수의 타입에 맞는 빈 객체 생성하여 전달
                arguments.add(createEmptyObject(parameter.getType()));
            }
        }
        return arguments.toArray();
    }

    private Object createEmptyObject(Class<?> type) {
        try {
            return type.getDeclaredConstructor().newInstance();
        } catch (Exception e) {
            return null;
        }
    }
}

