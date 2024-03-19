package com.example.acpy.service.AUI;

import com.example.acpy.models.service.TEST01IN;
import com.example.acpy.models.service.TEST01OUT;
import com.example.acpy.support.AcpyMapper;
import com.example.acpy.support.LowerKeyMap;
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
    public List<LowerKeyMap> AUI0101S01(TEST01IN in, TEST01OUT out) throws Exception {
        List<LowerKeyMap> map = AcpyMapper.selectList("selectAll",in);
        out.setData(map);
        return map;
    }

    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public List<LowerKeyMap> select(TEST01IN in, TEST01OUT out) throws Exception {
        in.setIdty("2");
        List<LowerKeyMap> list = AcpyMapper.selectList("selectParamTest",in);
        return list;
    }

    /**
     *
     * @param in
     * @param out
     * @return
     * @throws Exception
     */
    public boolean insert(TEST01IN in, TEST01OUT out) throws Exception {

        int insertTest = AcpyMapper.insert("insertTest",in);
        return true;
    }
}
