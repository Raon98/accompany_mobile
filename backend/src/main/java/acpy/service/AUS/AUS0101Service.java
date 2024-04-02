package acpy.service.AUS;

import acpy.api.support.AcpyLogger;
import acpy.api.support.AcpyMapper;
import acpy.api.support.LowerKeyMap;
import acpy.models.service.AUS.AUS0101IN;
import acpy.models.service.AUS.AUS0101OUT;
import acpy.models.service.CMM.CMM0101IN;
import acpy.models.service.CMM.CMM0101OUT;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("AUS0101Service")
public class AUS0101Service {
    /**
     * 모바일 화면 경로
     * @param CMM0101IN in
     * @param CMM0101OUT out
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
