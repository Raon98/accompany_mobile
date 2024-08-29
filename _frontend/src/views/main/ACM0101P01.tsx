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
          <div className="logo">
          <img
                  src={require(`assets/images/noti.png`)}
                  alt="arrow"
                  style={{ height: "1.75rem" }}
                ></img>
                <img
                  src={require(`assets/images/logout.png`)}
                  alt="arrow"
                  style={{ height: "1.75rem" }}
                ></img>
          </div>
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
          <div className="schedule__contents marry">
            <div className="schedule__item">
              <div className="item__top-content">
                <div className="item__title">
                  <span className="name">임정훈</span>
                  <span>님의 </span>
                  <span className="event">결혼</span>
                </div>
                <img
                  src={require(`assets/images/rightArrow_gray.png`)}
                  alt="arrow"
                  style={{ height: "0.85rem" }}
                ></img>
              </div>
              <div className="item__content">
                <div className="date__block">
                  <div className="dDay">D-50</div>
                  <div className="date">2025-03-16</div>
                </div>
                <div className="contents__block">
                  <div className="family">
                    <div>임홍규·이미진</div>
                    <div className="children">자녀 임정훈</div>
                  </div>
                  <div className="family">
                    <div>이노혁·박미주</div> 
                    <div className="children">지녀 이유리</div>
                  </div>
                </div>
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
