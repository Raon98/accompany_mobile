import { useNavigate } from "react-router-dom";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

const ASU0101P01 = () => {
  const navigate = useNavigate();

  console.log("회원가입화면");
  return (
    <div>
      회원가입페이지.
      <button onClick={() => navigate("/ALI0101P01")}>
        로그인페이지로 돌아가기
      </button>
    </div>
  );
};

export default ASU0101P01;
