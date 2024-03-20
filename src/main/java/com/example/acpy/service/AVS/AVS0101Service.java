import com.example.acpy.models.service.AVS.AVS0101IN;
import com.example.acpy.models.service.AVS.AVS0101OUT;
import com.example.acpy.support.AcpyMapper;
import com.example.acpy.support.LowerKeyMap;
import org.springframework.stereotype.Service;

import java.util.List;


@Service("AVS0101Service")
public class AVS0101Service {
    /**
     *
     * @param AVS0101IN in
     * @param AVS0101OUT out
     * @return
     * @throws Exception
     */
    public boolean AVS0101S01(AVS0101IN in, AVS0101OUT out) throws Exception {
        List<LowerKeyMap> map = AcpyMapper.selectList("selectAll",in);
        out.setData(map);
        return true;
    }
}
