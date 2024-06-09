import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSign from "state/useSign";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

type FocusState = {
  [key: string]: boolean;
};

const ASU0101P01 = () => {
  const { inSign, onState } = useSign();
  const navigate = useNavigate();
  const [signData, setSignData] = useState({
    uid: "",
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
  });

  const [isFocused, setIsFocused] = useState({
    uid: false,
    email: false,
    name: false,
    password: false,
    passwordConfirm: false,
  });

  const func = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;
      setSignData({
        ...signData,
        [name]: value,
      });
    },
    handleFocus: (flag: string, name: string) => {
      if (flag === "Focus") {
        setIsFocused({
          ...isFocused,
          [name]: true,
        });
      }
    },
    handleBulr: () => {
      setIsFocused({
        uid: false,
        email: false,
        name: false,
        password: false,
        passwordConfirm: false,
      });
    },
  };
  return (
    <>
      <header>
        <button className="header-prev__btn"></button>
        <div className="header__title">회원가입</div>
      </header>
      <div className="sign">
        <div className="sign__title">이름을 입력해주세요.</div>
        <div className="sign-content">
          <div className="sign__block">
            <label htmlFor="email">이메일 </label>
            <input
              type="text"
              id="email"
              name="email"
              title="이메일"
              className={isFocused.email ? "focused" : ""}
              placeholder="이메일 입력"
              value={signData.email}
              onChange={func.onChange}
              onFocus={() => func.handleFocus("Focus", "email")}
              onBlur={func.handleBulr}
              required
            />
          </div>
          <div className="sign__block">
            <label htmlFor="name">이름 </label>
            <input
              type="text"
              id="name"
              name="name"
              title="이름"
              className={isFocused.name ? "focused" : ""}
              placeholder="이름 입력"
              value={signData.name}
              onChange={func.onChange}
              onFocus={() => func.handleFocus("Focus", "name")}
              onBlur={func.handleBulr}
              required
            />
          </div>
          <div className="sign__block">
            <div className="password__block">
              <label htmlFor="password">비밀번호 </label>
              <input
                type="text"
                id="password"
                name="password"
                title="비밀번호"
                className={isFocused.password ? "focused" : ""}
                placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                value={signData.password}
                onChange={func.onChange}
                onFocus={() => func.handleFocus("Focus", "password")}
                onBlur={func.handleBulr}
                required
              />
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                type="text"
                id="passwordConfirm"
                name="passwordConfirm"
                title="비밀번호 확인"
                className={isFocused.passwordConfirm ? "focused" : ""}
                placeholder="비밀번호 재입력"
                value={signData.passwordConfirm}
                onChange={func.onChange}
                onFocus={() => func.handleFocus("Focus", "passwordConfirm")}
                onBlur={func.handleBulr}
                required
              />
            </div>
          </div>
          <div className="sign__block">
            <label htmlFor="uid">아이디 </label>
            <input
              type="text"
              id="uid"
              name="uid"
              title="아이디"
              className={isFocused.uid ? "focused" : ""}
              placeholder="아이디 입력 (6자~10자)"
              value={signData.uid}
              onChange={func.onChange}
              onFocus={() => func.handleFocus("Focus", "uid")}
              onBlur={func.handleBulr}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ASU0101P01;
