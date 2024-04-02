package acpy.service.CMM;

import acpy.api.support.AcpyLogger;
import acpy.api.support.AcpyMapper;
import acpy.api.support.LowerKeyMap;
import acpy.models.service.ACM.ACM0101IN;
import acpy.models.service.ACM.ACM0101OUT;
import acpy.models.service.CMM.CMM0101IN;
import acpy.models.service.CMM.CMM0101OUT;
import com.google.cloud.vision.v1.*;
import com.google.protobuf.ByteString;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;


@Service("CMM0101Service")
public class CMM0101Service {
    /**
     * 모바일 화면 경로
     * @param CMM0101IN in
     * @param CMM0101OUT out
     * @return
     * @throws Exception
     */
    public boolean CMM0101S01(CMM0101IN in, CMM0101OUT out) throws Exception {
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
