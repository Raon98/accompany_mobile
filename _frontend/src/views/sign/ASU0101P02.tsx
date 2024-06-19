import { SignHeader } from "components/layout/CustomHeader";
import { useNavigate } from "react-router-dom";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입 약관화면
 * @작성자:김성철
 ********************************/
const ASU0101P02 = () => {
  const navigate = useNavigate();
  const func = {};
  return (
    <>
      <SignHeader title={"이용약관"} />
      <div className="sgin-terms">
        <div className="sgin-terms__subject">
          <div className="title-sub1">동행인으로서 첫 발걸음에</div>
          <div className="title-sub1">진심으로 환영합니다.</div>
        </div>
        <div className="sgin-terms__contents">
          <div className="sgin-terms__agreement">
            <button className="option_btn" />
            <div className="option__text">약관 전체동의</div>
          </div>
          <div className="borderline"></div>
          <div className="sgin-terms__agreements">
            <div className="sgin-terms__agreement">
              <button className="option_btn" />
              <div className="option__text">이용약관 동의(필수)</div>
            </div>
            <div className="sgin-terms__agreement">
              <button className="option_btn" />
              <div className="option__text">
                개인정보 수집 및 이용동의(필수)
              </div>
            </div>
          </div>
        </div>
        <button
          className="sign-term__btn"
          onClick={() => navigate("/ASU0101P01")}
        >
          동의하고 다음으로
        </button>
      </div>
    </>
  );
};
export default ASU0101P02;
