import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSign from "state/useSign";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

const ASU0101P01 = () => {
  const { inSign, onState } = useSign();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const func = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;

      if (name === "name") {
        setName(value);
      }
      if (name === "password") {
      }
    },
    handleFocus: (flag?: string) => {
      if (flag === "Focus") {
        setIsFocused(true);
      } else {
        setIsFocused(false);
      }
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
              className={isFocused ? "focused" : ""}
              placeholder="이메일 입력"
              value={name}
              onChange={func.onChange}
              onFocus={() => func.handleFocus("Focus")}
              onBlur={() => func.handleFocus}
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
              className={isFocused ? "focused" : ""}
              placeholder="이름 입력"
              value={name}
              onChange={func.onChange}
              onFocus={() => func.handleFocus("Focus")}
              onBlur={() => func.handleFocus}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ASU0101P01;
