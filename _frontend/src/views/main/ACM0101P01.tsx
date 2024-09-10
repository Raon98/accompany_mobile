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
    partyName: "신랑 임정훈·신부 이유리",
    className: "marry",
  },
  {
    idx: 2,
    userName: "유이진",
    Evt: "F",
    EvtName: "부고",
    dDay: "D-50",
    date: "2025-01-21",
    mainColor: "#374151",
    partyName: "故 유강남",
    className: "funeral",
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
        <div className="main__top-block">
          <div className="top__block">
            <div className="logo"></div>
            <div className="option">
              <img
                src={require(`assets/images/menu.png`)}
                alt="menu"
                className="menu"
              ></img>
              {/*  <img
              src={require(`assets/images/logout.png`)}
              alt="logout"
              className="logout"
              onClick={() => func.logout()}
            ></img> */}
            </div>
          </div>
          <div className="info">
            <div>
              <span className="info__name">{user.name}님</span> 안녕하세요
            </div>
            <div>
              새로운 동행일정이 <span className="info__alarm">3건</span>{" "}
              있습니다.
            </div>
          </div>
          <div className="pay">
            <div className="pay__block start">
              <div className="pay__block-title">동행출발금</div>
              <div className="pay__block-amount">시작하기</div>
            </div>
            <div className="pay__block end">
              <div className="pay__block-title">동행도착금</div>
              <div className="pay__block-amount">150,000</div>
            </div>
          </div>
        </div>
      </div>
      <div className="main__container">
        <div className="schedule">
          <div className="schedule-top">
            <div className="schedule__title">
              <div>동행일정</div>
              <img
                src={require(`assets/images/noti4.png`)}
                alt="notice"
                className="notice"
              ></img>
            </div>
            <img
              src={require(`assets/images/rightArrow_gray.png`)}
              alt="arrow"
              style={{ height: "0.85rem" }}
            ></img>
          </div>

          <Swiper
            slidesPerView={1.02}
            centeredSlides={true}
            spaceBetween={15}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            style={{
              width: "100%",
            }}
            modules={[Pagination]}
            onSlideChange={(swiper: SwiperCore) => func.onSlideChange(swiper)}
          >
            {scheduleItem.map((schedule, idx) => (
              <SwiperSlide key={schedule.idx}>
                <div className="schedule__contents">
                  <div className="schedule__item">
                    <div className="item__top-content">
                      <div className={`item__title ${schedule.className}`}>
                        <span className="name">{schedule.userName}</span>
                        <span>님의 </span>
                        <span className="event">{schedule.EvtName}</span>
                      </div>
                      <div className={`dDay ${schedule.className}`}>
                        {schedule.dDay}
                      </div>
                    </div>
                    <div className="item__content">
                      <div className="date__block">
                        <div className="name">{schedule.partyName}</div>
                        <div className="date">{schedule.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="myMenu">
          <div className="myMenu-container">
            <div className="myMenu_item">
              <img
                src={require(`assets/images/ico-calender.png`)}
                alt={`ico-calender`}
              />
              <div className="myMenu_item-title">일정등록</div>
            </div>
            <div className="myMenu_item">
              <img
                src={require(`assets/images/ico-bankbook.png`)}
                alt={`ico-calender`}
              />
              <div className="myMenu_item-title">동행자금</div>
            </div>
            <div className="myMenu_item">
            <img
                src={require(`assets/images/ico-join.png`)}
                alt={`ico-join`}
              />
              <div className="myMenu_item-title">참석하기</div>
            </div>
            <div className="myMenu_item"></div>
            <div className="myMenu_item"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ACM0101P01;
