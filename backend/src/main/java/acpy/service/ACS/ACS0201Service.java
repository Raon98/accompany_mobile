package acpy.service.ACS;

import java.util.Map;

import org.springframework.stereotype.Service;

import acpy.api.support.AcpyLogger;
import acpy.api.utils.AesUtil;
import acpy.api.utils.JwtUtil;
import acpy.models.db.ACS.ACS02REQ;
import acpy.models.service.ACS.ACS0201IN;
import acpy.models.service.ACS.ACS0201OUT;

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
        JwtUtil jwtUtils = new JwtUtil();
        Map<String, String> result = null;
        //1. DB 정보저장
        
        //1-1 pass 암호화
        String pass = AesUtil.encrypt(in.getSignData().getPass());

        ACS02REQ userReq = new ACS02REQ();

        userReq.setUid(in.getSignData().getUid());
        userReq.setPass(pass);
        userReq.setMail(in.getSignData().getMail());
        userReq.setName(in.getSignData().getName());
        userReq.setMohp(in.getSignData().getMohp());
        userReq.setBirth(in.getSignData().getBirth());
        userReq.setGend(in.getSignData().getGend());
        userReq.setIdty("1");
        userReq.setDjch_flag("N");
        userReq.setWedd_flag("N");
        userReq.setFnrl_flag("N");
        userReq.setPiin_agrm(in.getSignData().getPriv());

        if(!userReq.getUid() && !userReq.getIdty()){
            AcpyLogger.error("=============== DB저장 START ================");
            //DB MST저장
            int save1 = AcpyMapper.insert("insertMstUserInfo",userReq)
            int save2 = AcpyMapper.insert("insertPrivUserInfo",userReq)
            AcpyLogger.error("=============== DB저장 END ================");

            if(save1 > 0 && save2 > 0) {
                // 2. 토큰 발행
                AcpyLogger.error("=============== TOKEN 발행 START ================")
                result = jwtUtils.generateToken(in.getSignData().getUid());
                AcpyLogger.error("=============== TOKEN 발행 END ================")
            }
        }

        out.setData(result);
        return true;
    }
}
