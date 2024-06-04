import {useMutation} from "@tanstack/react-query";
import {$api} from "plugins/api";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Autoplay, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

/******************************
 * @공통 (ACCOMPANY COMMON COMPONENT)
 * @화면명:로그인화면
 * @작성자:김성철
 ********************************/

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '">' + "</span>";
  },
};

const ACC0102P01 = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  const sessionMutation = useMutation({
    mutationFn: () =>
      $api.AsyncPost("api", "ACS0201S01", "ACC0102P01", { uid: "test" }),
    onSuccess: (res) => {
      console.log(res);
    },
  });
  const { mutate, isPending, isError, isSuccess } = sessionMutation;
  const func = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;

      if (name === "username") {
        setUid(value);
      }
      if (name === "password") {
        setPassword(value);
      }
    },
    onSignUp: (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      console.log("회원가입 페이지로 이동");
    },
    onClick: (tag?: string) => {
      console.log()
      if (tag === 'e') {

      } else if (tag === 'g') {

      } else if (tag === 'k') {

      }
      setIsActive(true);
      // mutate();
    },
  };

  return (
      <div className={isActive ? "login" : "login-fixed"}>
        {!isActive && (
            <div className="login__title">
              <div className="login__title-sub1">
                당신의 순간을
              </div>
              <div className="login__title-sub2">
                동행하다
              </div>
            </div>
        )}
        <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Pagination, Autoplay]}
            className={`mySwiper ${isActive ? "mySwiper--active" : ""}`}
        >
          <SwiperSlide className="login-slide">
            <img src={require("assets/images/login-slide-img1.png")} alt="Slide 1"/>
          </SwiperSlide>
          <SwiperSlide className="login-slide">
            <img src={require("assets/images/login-slide-img2.png")} alt="Slide 2"/>
          </SwiperSlide>
          <SwiperSlide className="login-slide">
            <img src={require("assets/images/login-slide-img3.png")} alt="Slide 3"/>
          </SwiperSlide>
        </Swiper>


        <div className={` form__absolute ${isActive ? "form__absolute--active" : ""}`}>
          <div className="form" onClick={() => func.onClick()}>
            <div className="form-flex">
              <div className="form-drag__btn"></div>
            </div>
            {isActive && (<>
                  <form action="" className="input-form">
                    <div className="input-form__logo"></div>
                      {/*<img src={require('assets/images/main-logo.png')} alt="logo"/>*/}

                    <div className="input-form__block id">
                      <input type="text" name="username" title="아이디" placeholder="아이디를 입력해주세요." required
                             onChange={func.onChange} value={uid}
                      />
                    </div>
                    <div className="input-form__block password">
                      <input type="password" name="password" title="비밀번호" placeholder="비밀번호를 입력해주세요." required
                             onChange={func.onChange} value={password}/>
                      {/*<button type="button" name="password" className="btn-password"/>*/}
                    </div>
                    <div className="input-form__auto-login">
                      <input type="checkbox" name="auto-login" id="auto-login" />
                      <label htmlFor="auto-login">자동로그인</label>
                    </div>
                    <div className="input-form__utils">
                      <a href="#" className="input-form__utils-option" onClick={func.onSignUp}>
                        아이디 찾기
                      </a>
                      <a href="#" className="input-form__utils-option" onClick={func.onSignUp}>
                        비밀번호 재설정
                      </a>
                      <a href="#" className="input-form__utils-option" onClick={func.onSignUp}>
                        회원가입
                      </a>
                    </div>
                    <div className="form__block form-login">
                      <button className="login__btn primary" onClick={() => func.onClick('e')}>
                        로그인
                      </button>
                      <div className="form__block-oauth">
                        <button className="login__btn google" onClick={() => func.onClick('g')}>
                          <span className="google-icon"></span>
                          구글로 로그인
                        </button>
                        <button className="login__btn kakao" onClick={() => func.onClick('k')}>
                          <span className="kakao-icon"></span>
                          카카오로 로그인
                        </button>
                      </div>
                      <div className="form__block">

                      </div>
                    </div>
                  </form>
                </>
            )}

            {!isActive && (
                <div className="form__block">
                  <button className="login__btn primary" onClick={() => func.onClick('e')}>
                    이메일로 시작하기
                  </button>
                  <button className="login__btn google" onClick={() => func.onClick('g')}>
                    <span className="google-icon"></span>
                    구글로 시작하기
                  </button>
                  <button className="login__btn kakao" onClick={() => func.onClick('k')}>
                    <span className="kakao-icon"></span>
                    카카오로 시작하기
                  </button>
                </div>
            )}

          </div>
        </div>

      </div>
  );
};

export default ACC0102P01;
