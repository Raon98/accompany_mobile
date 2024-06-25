package acpy.api.controller;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import acpy.api.support.AcpyLogger;

@RequestMapping("/api")
@RestController
public class AccompanyApiController {
    private final ObjectMapper objectMapper;
    private final ApplicationContext applicationContext;

    @Autowired
    public AccompanyApiController(ObjectMapper objectMapper, ApplicationContext applicationContext) {
        this.objectMapper = objectMapper;
        this.applicationContext = applicationContext;
    }

    @PostMapping("/{serviceId}")
    public ResponseEntity<Object> postServiceAPiRequest(
            @PathVariable(required = false) String serviceId,
            @RequestBody Map<String, Object> params
    ) {
        AcpyLogger.info("============= Service CALL START ==============");
        try {
            String ServiceId = serviceId.substring(0, 7);
            String Service = ServiceId + "Service";
            AcpyLogger.info("============= ServiceID : {}==============", Service);
            AcpyLogger.info("============= MethodId : {}==============", serviceId);

            Object serviceBean = applicationContext.getBean(Service);
            Method method = findMethod(serviceBean, serviceId);
            AcpyLogger.info("============= method : {}==============", method);

            if (method != null) {
                Map<String, Object> datParams = (Map<String, Object>) params.get("REQ_DAT");
                Map<String, Object> modifiedParams = datParams != null ? datParams : params;

                Object inObj = inObjectCreate(ServiceId + "IN", modifiedParams);
                Object outObj = applicationContext.getBean(ServiceId + "OUT");

                AcpyLogger.info("============= Service inObj {} ==============", inObj);
                AcpyLogger.info("============= Service outObj {} ==============", outObj);
                AcpyLogger.info("============= Service CALL END ==============");
                method.invoke(serviceBean, inObj, outObj);

                return ResponseEntity.ok(objectMapper.writeValueAsString(outObj));
            } else {
                AcpyLogger.info("============= Service CALL ERROR ==============");
                return ResponseEntity.badRequest().body("Method not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request");
        }
    }

    private Method findMethod(Object serviceBean, String methodName) {
        for (Method method : serviceBean.getClass().getDeclaredMethods()) {
            if (method.getName().equals(methodName)) {
                return method;
            }
        }
        return null;
    }

    private Object inObjectCreate(String inClassName, Map<String, Object> params) throws ClassNotFoundException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        Class<?> inClass = Class.forName("acpy.models.service." + inClassName.substring(0, 3) + "." + inClassName);
        Object inObj = inClass.getDeclaredConstructor().newInstance();

        for (Field field : inClass.getDeclaredFields()) {
            field.setAccessible(true);
            if (params.containsKey(field.getName())) {
                Object paramValue = params.get(field.getName());
                if (isPrimitiveOrWrapper(field.getType()) || field.getType().equals(String.class)) {
                    field.set(inObj, paramValue);
                } else if (paramValue instanceof Map) {
                    Object nestedObj = inObjectCreate(inClassName + "$" + field.getType().getSimpleName(), (Map<String, Object>) paramValue);
                    field.set(inObj, nestedObj);
                }
            }
        }
        return inObj;
    }

    private boolean isPrimitiveOrWrapper(Class<?> type) {
        return type.isPrimitive() ||
                type.equals(Boolean.class) ||
                type.equals(Integer.class) ||
                type.equals(Character.class) ||
                type.equals(Byte.class) ||
                type.equals(Short.class) ||
                type.equals(Double.class) ||
                type.equals(Long.class) ||
                type.equals(Float.class);
    }
}
