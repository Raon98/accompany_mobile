package com.example.acpy.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Parameter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
public class ApiController {

    private final ApplicationContext applicationContext;

    @Autowired
    public ApiController(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @GetMapping("/api/{serviceId}/{methodName}")
    public <T> T handleGetRequest(
            @PathVariable String serviceId,
            @PathVariable String methodName
    ) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        Object serviceBean = applicationContext.getBean(serviceId);
        Method method;
        method = serviceBean.getClass().getMethod(methodName);
        return (T) method.invoke(serviceBean);
    }


    // 변경된 컨트롤러 메서드
    @PostMapping("/api/{serviceId}/{methodName}")
    public ResponseEntity<Object> handlePostRequest(
            @PathVariable String serviceId,
            @PathVariable String methodName,
            @RequestBody Map<String, Object> requestBody
    ) {
        try {
            // 요청된 서비스 빈 가져오기
            Object serviceBean = applicationContext.getBean(serviceId);

            // 요청된 메서드 가져오기
            Method method = findMethod(serviceBean, methodName);

            if (method != null) {
                // 메서드 실행
                Object result = method.invoke(serviceBean, extractArguments(method, requestBody));
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body("Method not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request");
        }
    }

    // 메서드 찾기
    private Method findMethod(Object serviceBean, String methodName) {
        for (Method method : serviceBean.getClass().getMethods()) {
            if (method.getName().equals(methodName)) {
                return method;
            }
        }
        return null;
    }

    private Object[] extractArguments(Method method, Map<String, Object> requestBody) throws JsonProcessingException {
        List<Object> arguments = new ArrayList<>();
        for (Parameter parameter : method.getParameters()) {
            if (requestBody.containsKey(parameter.getName())) {
                Object value = requestBody.get(parameter.getName());
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

