package acpy.service.ACS;

import acpy.api.support.AcpyLogger;
import acpy.api.support.AcpyMapper;
import acpy.api.support.LowerKeyMap;
import acpy.models.service.ACS.ACS0101IN;
import acpy.models.service.ACS.ACS0101OUT;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("ACS0101Service")
public class ACS0101Service {
    /**
     * 모바일 화면 경로
     * @param CMM0101IN in
     * @param CMM0101OUT out
     * @return
     * @throws Exception
     */
    public boolean ACS0101S01(ACS0101IN in, ACS0101OUT out) throws Exception {
        try {
            List<LowerKeyMap> pathList = AcpyMapper.selectList("selectMenuPath",in);
            out.setData(pathList);
            out.setCode("000");

        }catch (Exception e){
            out.setCode("999");
            AcpyLogger.error("error" + e);
        }
        return true;
    }
}
