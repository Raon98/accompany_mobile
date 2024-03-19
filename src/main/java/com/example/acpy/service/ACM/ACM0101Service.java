package com.example.acpy.service.ACM;

import com.example.acpy.models.service.ACM.ACM0101IN;
import com.example.acpy.models.service.ACM.ACM0101OUT;
import com.example.acpy.support.AcpyMapper;
import com.example.acpy.support.LowerKeyMap;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("ACM0101Service")
public class ACM0101Service {
    /**
     *
     * @param ACM0101IN in
     * @param ACM0101OUT out
     * @return
     * @throws Exception
     */
    public boolean ACM0101S01(ACM0101IN in, ACM0101OUT out) throws Exception {
        List<LowerKeyMap> map = AcpyMapper.selectList("selectAll",in);
        out.setData(map);
        return true;
    }
}
