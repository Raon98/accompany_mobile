import { useMutation } from "@tanstack/react-query";
import { $api } from "plugins/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
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
    onClick: () => {
      setIsActive(!isActive);
      // mutate();
    },
  };

  return (
    <div className="login">
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
        modules={[Autoplay, Pagination]}
        className={`mySwiper ${isActive ? "mySwiper--active" : ""}`}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      <div className="form" onClick={func.onClick}>
        <div className="form-flex">
          <div className="form-drag__btn"></div>
        </div>
      </div>

      {/* <div className="login__logo">동행하다</div> */}

      {/*
            <form>
            <fieldset className="form">
                <dl className="form__icon id">
                    <dd>
                        <div className="form__block">
                            <input type="text" name="username" title="아이디" placeholder="아이디를 입력해주세요." required
                                   onChange={func.onChange} value={uid}
                            />
                        </div>
                    </dd>
                </dl>
                <dl className="form__icon password">
                    <dd>
                        <div className="form__block">
                            <input type="password" name="password" title="비밀번호" placeholder="비밀번호를 입력해주세요." required
                                   onChange={func.onChange} value={password}/>
                            <button type="button" name="password" className="btn-password"/>
                        </div>
                    </dd>
                </dl>
                <div className="form__utils">
                    <a href="#" className="form__sign" onClick={func.onSignUp}>
                        회원가입
                    </a>
                </div>
            </fieldset>
            </form>
            */}
      {/* <div className="login-fixed">
        <button className="login__btn" onClick={func.onClick}>
          로그인
        </button>
      </div> */}
    </div>
  );
};

export default ACC0102P01;
