import asyncApi from "plugins/asyncApi";
import { useNavigate } from "react-router-dom";

/******************************
 * @공통 메인화면 (ACCOMPANY COMMON MAIN)
 * @화면명:메인화면
 * @작성자:김성철
 ********************************/

const ACM0101P01 = () => {
  const { $api } = asyncApi();
  const navigate = useNavigate();
  // const test = $api("api", "ACS0101S01", "", { test: "test" });
  // console.log(test);
  return (
    <div className="main">
      <div className="main__top">
        <div className="top__block">
          <div className="logo"></div>
          <div className="option">
            <div className="setting"></div>
            <div className="logout"></div>
          </div>
        </div>
        <div className="info">
          <div>
            <span className="info__name">관리자님</span> 안녕하세요
          </div>
          <div>
            새로운 동행일정이 <span className="info__alarm">1건</span> 있습니다.
          </div>
        </div>
      </div>

      <div className="main__menu"></div>
    </div>
  );
};

export default ACM0101P01;
