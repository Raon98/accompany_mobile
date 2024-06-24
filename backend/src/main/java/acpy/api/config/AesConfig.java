import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${aes.key}")
    private String AccompanyPwdKey;

    public String getAccompanyPwdKey() {
        return AccompanyPwdKey;
    }
}