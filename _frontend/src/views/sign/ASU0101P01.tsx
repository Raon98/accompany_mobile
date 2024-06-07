import { useNavigate } from "react-router-dom";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

const ASU0101P01 = () => {
  const navigate = useNavigate();

  return (
      <>
          <header>
              <button className="header-prev__btn"></button>
              <div className="header__title">
                  회원가입
              </div>
          </header>
          <div className="sign">

          </div>
      </>
  );
};

export default ASU0101P01;
