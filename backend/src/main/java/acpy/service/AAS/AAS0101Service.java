package acpy.service.AAS;

import acpy.api.support.AcpyLogger;
import acpy.api.support.AcpyMapper;
import acpy.models.service.AAS.AAS0101IN;
import acpy.models.service.AAS.AAS0101OUT;
import org.springframework.stereotype.Service;


@Service("AAS0101Service")
public class AAS0101Service {
    /**
     * 모바일 화면 경로
     * @param AAS0101IN in
     * @param AAS0101OUT out
     * @return
     * @throws Exception
     */
    public boolean AAS0101S01(AAS0101IN in, AAS0101OUT out) throws Exception {
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