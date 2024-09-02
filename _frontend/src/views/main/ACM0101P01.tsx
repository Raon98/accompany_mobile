import { clearSessionStorage } from "components/utils/store/Storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "state/useUser";
import { Swiper as SwiperCore } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
/******************************
 * @공통 메인화면 (ACCOMPANY COMMON MAIN)
 * @화면명:메인화면
 * @작성자:김성철
 ********************************/

const scheduleItem = [
  {
    idx: 1,
    userName: "임정훈",
    Evt: "M",
    EvtName: "결혼",
    dDay: "D-24",
    date: "2024-12-25",
    mainColor: "#f57676",
    content1: "임홍규·이미진",
    content2: "자녀 임정훈",
    content3: "이노혁·박미주",
    content4: "자녀 이유리",
  },
  {
    idx: 2,
    userName: "유이진",
    Evt: "F",
    EvtName: "부고",
    dDay: "D-50",
    date: "2025-01-21",
    mainColor: "#374151",
    content1: "故 유강남",
    content2: "",
    content3: "",
    content4: "",
  },
];
const ACM0101P01 = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const func = {
    logout: () => {
      clearSessionStorage("userInfo");
      navigate("/ALI0101P01");
    },
    onSlideChange: (swiper: SwiperCore) => {
      setCurrentSlideIdx(swiper.activeIndex);
    },
  };
  return (
    <div className="main">
      <div className="main__top">
        <div className="top__block">
          <div className="logo">
              <div className="logo__title">ACCOMPANY:D</div>
          </div>
          <div className="option">
            <img
              src={require(`assets/images/noti.png`)}
              alt="notice"
              className="notice"
            ></img>
            <img
              src={require(`assets/images/logout.png`)}
              alt="logout"
              className="logout"
              onClick={() => func.logout()}
            ></img>
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
          <Swiper
            centeredSlides={true}
            spaceBetween={15}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            style={
              {
                width: "100%",
                "--schedule-border":
                  scheduleItem?.length > 0
                    ? scheduleItem[currentSlideIdx].mainColor
                    : "#535a9c44",
              } as React.CSSProperties
            }
            modules={[Pagination]}
            onSlideChange={(swiper: SwiperCore) => func.onSlideChange(swiper)}
          >
            {scheduleItem.map((schedule, idx) => (
              <SwiperSlide key={schedule.idx}>
                {schedule.Evt === "M" && (
                  <div className="schedule__contents marry">
                    <div className="schedule__item">
                      <div className="item__top-content">
                        <div className="item__title">
                          <span className="name">{schedule.userName}</span>
                          <span>님의 </span>
                          <span className="event">{schedule.EvtName}</span>
                        </div>
                        <img
                          src={require(`assets/images/rightArrow_gray.png`)}
                          alt="arrow"
                          style={{ height: "0.85rem" }}
                        ></img>
                      </div>
                      <div className="item__content">
                        <div className="date__block">
                          <div className="dDay">{schedule.dDay}</div>
                          <div className="date">{schedule.date}</div>
                        </div>
                        <div className="contents__block">
                          <div className="family">
                            <div>{schedule.content1}</div>
                            <div className="children">{schedule.content2}</div>
                          </div>
                          <div className="family">
                            <div>{schedule.content3}</div>
                            <div className="children">{schedule.content4}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {schedule.Evt === "F" && (
                  <div className="schedule__contents funeral">
                    <div className="schedule__item">
                      <div className="item__top-content">
                        <div className="item__title">
                          <span className="name">{schedule.userName}</span>
                          <span>님의 </span>
                          <span className="event">{schedule.EvtName}</span>
                        </div>
                        <img
                          src={require(`assets/images/rightArrow_gray.png`)}
                          alt="arrow"
                          style={{ height: "0.85rem" }}
                        ></img>
                      </div>
                      <div className="item__content">
                        <div className="date__block">
                          <div className="dDay">{schedule.dDay}</div>
                          <div className="comment">
                            삼가 故人의 冥福을 빕니다.
                          </div>
                        </div>
                        <div className="contents__block">
                          <div className="date">{schedule.date}</div>
                          <div className="deceased">{schedule.content1}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
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
