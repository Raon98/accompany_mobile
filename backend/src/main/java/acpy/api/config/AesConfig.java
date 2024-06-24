package acpy.api.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AesConfig {

    @Value("${aes.key}")
    private String PWD_PRIVATE_KEY;

    public String getPwdPrivateKey() {
        return PWD_PRIVATE_KEY;
    }
}
