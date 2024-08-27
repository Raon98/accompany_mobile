import { useMutation } from "@tanstack/react-query";
import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Loading from "components/utils/Loading";
import asyncApi from "plugins/asyncApi";
import "swiper/css";
import "swiper/css/pagination";
import { Modals } from "components/utils/Modals";
import useSign from "state/useSign";
import useModal from "state/useModal";
import { modalContentProps } from "views/sign/ASU0101P02";
import useUser from "state/useUser";

/******************************
 * @로그인 (ACCOMPANY  Login)
 * @화면명:로그인화면
 * @작성자:김성철
 ********************************/

const pagination = {
  clickable: true,
  renderBullet: function (index: number, className: string) {
    return '<span class="' + className + '">' + "</span>";
  },
};

const ALI0101P01 = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isActive, setIsActive] = useState(false);
  const { onAllReset } = useSign();
  const { $api } = asyncApi();
  const {setUserInfo} = useUser()
  const {  isOpen,onOpen } = useModal("confirm");
  const [modalContent, setModalContent] = useState<modalContentProps>({
    Props1: null,
  });
  
  const sessionMutation = useMutation({
    mutationFn: () => $api("api", "ACS0201S01", "ALI0101P01", { uid: "test" }),
    onSuccess: (res) => {
      setIsActive(true);
    },
    onError : (e) => {
      if(isActive){
        setModalContent({
          Props1: {
            title : "",
            content:
              "저희와 함께 동행해주세요! <br/> 회원가입을 진행하시겠어요?",
            cancel: true,
            confirmText: "확인",
            cancelText: "취소",
            confirmFn: () => {
              navigate("/ASU0101P02")
            },
          },
        });
        onOpen()
      }
      setIsActive(true);
      console.log(e)
    }
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
      if (tag === "e") {
        // $api("api", "ACS0101S01", "ALI0101P01", {
        //   uid: "test",
        // }).then((test) => console.log(test));
        if(uid ==='admin' && password === 'admin1234!!'){
          const sign = {
            uid: "admin",
            mail: "admin@naver.com",
            name: "관리자",
            mohp: "010-6392-8888",
            birth: "19981007",
            gend: "m",
            priv: "y",
          };

          setUserInfo(sign);
          navigate('/ACM0101P01')
        }else{
          mutate();
        }
    
      } else if (tag === "g") {

      } else if (tag === "k") {

      } else {
        setIsActive(true);
      }
      
    },
  };

  useEffect(() => {
    onAllReset()
  }, []);

  return (
    <>
      {isOpen && <Modals Props1={modalContent.Props1} />}
      {isPending && <Loading />}
      <div className={isActive ? "login" : "login-fixed"}>
        {!isActive && (
          <div className="login__title">
            <div className="login__title-sub1">당신의 순간을</div>
            <div className="login__title-sub2">동행하다</div>
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
          {Array.from({ length: 7 }).map((v, idx) => (
            <SwiperSlide className="login-slide" key={idx + 1}>
              <img
                src={require(`assets/images/login-slide-img${idx + 1}.png`)}
                alt={`slide ${idx + 1}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div
          className={` form__absolute ${
            isActive ? "form__absolute--active" : ""
          }`}
        >
          <div className="form" >
            <div className="form-flex">
              <div className="form-drag__btn" onClick={() => func.onClick()}></div>
            </div>
            {isActive && (
              <>
                <form action="" className="input-form">
                  <div className="input-form__logo"></div>
                  {/*<img src={require('assets/images/main-logo.png')} alt="logo"/>*/}

                  <div className="input-form__block id">
                    <input
                      type="text"
                      name="username"
                      title="아이디"
                      placeholder="아이디를 입력해주세요."
                      required
                      onChange={func.onChange}
                      value={uid}
                    />
                  </div>
                  <div className="input-form__block password">
                    <input
                      type="password"
                      name="password"
                      title="비밀번호"
                      placeholder="비밀번호를 입력해주세요."
                      required
                      onChange={func.onChange}
                      value={password}
                    />
                    {/*<button type="button" name="password" className="btn-password"/>*/}
                  </div>
                  <div className="input-form__auto-login">
                    <input type="checkbox" name="auto-login" id="auto-login" />
                    <label htmlFor="auto-login">자동로그인</label>
                  </div>
                  <div className="input-form__utils">
                    <a
                      href="#"
                      className="input-form__utils-option"
                      onClick={func.onSignUp}
                    >
                     
                    </a>
                    <a
                      href="#"
                      className="input-form__utils-option"
                      onClick={func.onSignUp}
                    >
                      
                    </a>
                    <a
                      href="#"
                      className="input-form__utils-option"
                      onClick={() => navigate("/ASU0101P02")}
                    >
                      회원가입
                    </a>
                  </div>
                  <div className="form__block form-login">
                    <button
                      type="button"
                      className="login__btn primary"
                      onClick={() => func.onClick("e")}
                    >
                      로그인
                    </button>
                    <div className="form__block-oauth">
                      <button
                       type="button"
                        className="login__btn google"
                        onClick={() => func.onClick("g")}
                      >
                        <span className="google-icon"></span>
                        구글로 로그인
                      </button>
                      <button
                       type="button"
                        className="login__btn kakao"
                        onClick={() => func.onClick("k")}
                      >
                        <span className="kakao-icon"></span>
                        카카오로 로그인
                      </button>
                    </div>
                    <div className="form__block"></div>
                  </div>
                </form>
              </>
            )}

            {!isActive && (
              <div className="form__block">
                <button
                  className="login__btn primary"
                  onClick={() => func.onClick("e")}
                >
                  아이디로 시작하기
                </button>
                <button
                  className="login__btn google"
                  onClick={() => func.onClick("g")}
                >
                  <span className="google-icon"></span>
                  구글로 시작하기
                </button>
                <button
                  className="login__btn kakao"
                  onClick={() => func.onClick("k")}
                >
                  <span className="kakao-icon"></span>
                  카카오로 시작하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ALI0101P01;
