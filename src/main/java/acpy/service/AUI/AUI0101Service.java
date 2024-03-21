package acpy.service.AUI;

import acpy.models.service.AUI.AUI0101IN;
import acpy.models.service.AUI.AUI0101OUT;
import acpy.api.support.AcpyMapper;
import acpy.api.support.LowerKeyMap;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("AUI0101Service")
public class AUI0101Service {
    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public boolean AUI0101S01(AUI0101IN in, AUI0101OUT out) throws Exception {
        List<LowerKeyMap> map = AcpyMapper.selectList("selectAll",in);
        out.setData(map);
        return true;
    }

    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public boolean AUI0101S02(AUI0101IN in, AUI0101OUT out) throws Exception {
        List<LowerKeyMap> list = AcpyMapper.selectList("selectParamTest",in);
        out.setData(list);
        return true;
    }

    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public boolean AUI0101I01(AUI0101IN in, AUI0101OUT out) throws Exception {
        int insertTest = AcpyMapper.insert("insertTest",in);
        return true;
    }
}
