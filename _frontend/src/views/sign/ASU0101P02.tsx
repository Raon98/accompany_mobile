import { BackBtnHeader } from "components/layout/CustomHeader";
import { useNavigate } from "react-router-dom";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입 약관화면
 * @작성자:김성철
 ********************************/



const ASU0101P02 = () => {
  const navigate = useNavigate();
  const func = {
    onClickTerms : (type:string) => {
      if(type === 'use'){

      }
      if(type === 'private'){
        
      }
    }
  };
  return (
    <>
      <BackBtnHeader title={"이용약관"} />
      <div className="sgin-terms">
        <div className="sgin-terms__subject">
          <div className="title__sub1">
            <span>동행인</span>으로서 첫 발걸음에
            <div className="sub__logo"/>
          </div>
          <div className="title__sub2">진심으로 환영합니다.</div>
        </div>
        <div className="sgin-terms__contents">
          <div className="sgin-terms__agreement">
            <button className="option__btn" />
            <div className="option__text all">약관 전체동의</div>
          </div>
          <div className="borderline"></div>
          <div className="sgin-terms__agreements">
            <div className="sgin-terms__agreement">
              <button className="option__btn" />
              <div className="option__text">이용약관 동의(필수)</div>
              <div className="terms__btn" onClick={()=>func.onClickTerms('use')}/>
            </div>
           
            <div className="sgin-terms__agreement">
              <button className="option__btn" />
              <div className="option__text">
                개인정보 수집 및 이용동의(필수)
              </div>
              <div className="terms__btn" onClick={()=>func.onClickTerms('private')}/>
            </div>
          </div>
        </div>
        <button
          className="sign-term__btn"
          onClick={() => navigate("/ASU0101P01")}
        >
          <div>시작하기</div>
        </button>
      </div>
    </>
  );
};
export default ASU0101P02;
