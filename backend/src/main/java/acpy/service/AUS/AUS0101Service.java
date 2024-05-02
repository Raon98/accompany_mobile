package acpy.service.AUS;

import acpy.api.support.AcpyLogger;
import acpy.api.support.AcpyMapper;
import acpy.models.service.AUS.AUS0101IN;
import acpy.models.service.AUS.AUS0101OUT;
import org.springframework.stereotype.Service;


@Service("AUS0101Service")
public class AUS0101Service {
    /**
     * 모바일 화면 경로
     * @param AUS0101IN in
     * @param AUS0101OUT out
     * @return
     * @throws Exception
     */
    public boolean AUS0101S01(AUS0101IN in, AUS0101OUT out) throws Exception {
        try {
            int successIst =  AcpyMapper.insert("insertRouterMenuPath",in);
            if (successIst > 0) {
                out.setCode("000");
            }
        }catch (Exception e){
            out.setCode("999");
            AcpyLogger.error("error" + e);
        }
        return true;
    }
}