package acpy.service.ACS;

import acpy.models.service.ACS.ACS0201IN;
import acpy.models.service.ACS.ACS0201OUT;
import acpy.api.support.AcpyMapper;
import acpy.api.support.LowerKeyMap;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("ACS0201Service")
public class ACS0201Service {
    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public boolean ACS0201S01(ACS0201IN in, ACS0201OUT out) throws Exception {
        List<LowerKeyMap> map = AcpyMapper.selectList("selectAll",in);
        out.setData(map);
        return true;
    }
}
