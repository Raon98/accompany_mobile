import asyncApi from "plugins/asyncApi";
import { useNavigate } from "react-router-dom";
import useUser from "state/useUser";

/******************************
 * @공통 메인화면 (ACCOMPANY COMMON MAIN)
 * @화면명:메인화면
 * @작성자:김성철
 ********************************/

const ACM0101P01 = () => {
  const { user } = useUser();

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
            <span className="info__name">{user.name}님</span> 안녕하세요
          </div>
          <div>
            새로운 동행일정이 <span className="info__alarm">3건</span> 있습니다.
          </div>
        </div>
      </div>

      <div className="main__container">
        <div className="schedule">
          <div className="schedule__title">동행일정</div>
          <div
            className="schedule__contents"
            style={{ "--schedule-border": "#f57676" } as React.CSSProperties}
          >
            <div className="schedule__item">
              <div className="item__top-content">
                <div className="item__title">
                  <span className="name">임정훈</span>님의{" "}
                  <span className="event">결혼</span>
                </div>
                <img
                  src={require(`assets/images/rightArrow_gray.png`)}
                  alt="arrow"
                  style={{height:"0.85rem"}}
                ></img>
              </div>
              <div
                className="item__content marry"
                style={
                  { "--schedule-border": "#f89c9c" } as React.CSSProperties
                }
              >
                <div className="content__title"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="accountBook">
          <div className="accountBook__user organizer"></div>
          <div className="accountBook__user companion"></div>
        </div>
        <div className="myMenu"></div>
      </div>
    </div>
  );
};

export default ACM0101P01;
