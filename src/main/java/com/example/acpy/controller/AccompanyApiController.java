package com.example.acpy.controller;

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

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
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

                LOGGER.info("============= Service modifiedParams {} ==============",modifiedParams);
                LOGGER.info("============= Service einObj {}==============",inObj);
                LOGGER.info("============= Service outObject {}==============",outObj);
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
        Class<?> inClass = Class.forName("com.example.acpy.models.service.AUI." + inClassName);
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

