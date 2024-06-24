import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${aes.key}")
    private String PWD_PRIVATE_KEY;

    public String getPwdPrivateKey() {
        return AccompanyPwdKey;
    }
}