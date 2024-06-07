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
  const test = $api("api", "ACS0101S01", "", { test: "test" });
  console.log(test);
  return (
    <div>
      메인페이지입니다
      <button onClick={() => navigate("/ACM0101P02")}>서브페이지로</button>
    </div>
  );
};

export default ACM0101P01;
