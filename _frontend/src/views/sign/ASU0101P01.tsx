import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSign from "state/useSign";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

const ASU0101P01 = () => {
  const { signState, onState, onFocusReset,onBox,openBox } = useSign();
  const navigate = useNavigate();
  const optionList = ['google.com','naver.com' ,'kakao.com', 'nate.com'];

  const [signData, setSignData] = useState({
    uid: "",
    email: "",
    name: "",
    password: "",
    passwordConfirm: "",
    emailAddress: ""
  });

  const func = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: {name, value},
      } = e;
      setSignData({
        ...signData,
        [name]: value,
      });
    },
    selOption : (domain :string) => {
      openBox()
      setSignData({
        ...signData,
        emailAddress : domain,
      });
    }
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
            <div className="email__block">
              <input
                  type="text"
                  id="email"
                  name="email"
                  title="이메일"
                  className={signState('email', 'focus') ? "focused" : ""}
                  placeholder="이메일 입력"
                  value={signData.email}
                  onChange={func.onChange}
                  onFocus={() => onState("email", "focus")}
                  onBlur={onFocusReset}
                  required
              />
              <div className="email-asterisk">@</div>
              <div className="emailAddress">
                <input
                    type="text"
                    id="emailAddress"
                    name="emailAddress"
                    title="이메일주소"
                    className={signState('emailAddress', 'focus') || onBox? "focused" : ""}
                    placeholder="주소 입력"
                    value={signData.emailAddress}
                    onChange={func.onChange}
                    onFocus={() => onState("emailAddress", "focus")}
                    onBlur={onFocusReset}
                    required
                />
                <div className={`emailAddress__option ${onBox ? 'select' : ''}`} onClick={() => openBox()} />

                <ul className={`emailAddress__option--select ${onBox ? 'show' :''}`}>
                  {optionList.map((domain,idx) => (
                      <li key={idx}>
                        <button type="button" className="option-btn" onClick={() => func.selOption(domain)}>{domain}</button>
                      </li>
                  ))}
                </ul>

              </div>


            </div>
          </div>

          <div className="sign__block">
            <label htmlFor="name">이름 </label>
            <input
                type="text"
                id="name"
                name="name"
                title="이름"
                className={signState('name', 'focus') ? "focused" : ""}
                placeholder="이름 입력"
              value={signData.name}
              onChange={func.onChange}
              onFocus={() => onState("name", "focus")}
              onBlur={onFocusReset}
              required
            />
          </div>
          <div className="sign__block password">
              <label htmlFor="password">비밀번호 </label>
              <input
                  type="password"
                  id="password"
                  name="password"
                  title="비밀번호"
                  className={signState('password','focus') ? "focused" : ""}
                  placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                  value={signData.password}
                  onChange={func.onChange}
                  onFocus={() => onState("password", "focus")}
                  onBlur={onFocusReset}
                  required
              />
              <label htmlFor="passwordConfirm">비밀번호 확인</label>
              <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  title="비밀번호 확인"
                  className={[signState('passwordConfirm','focus') ? "focused" : ""].join(" ")}
                  placeholder="비밀번호 재입력"
                  value={signData.passwordConfirm}
                  onChange={func.onChange}
                  onFocus={() => onState("passwordConfirm", "focus")}
                  onBlur={onFocusReset}
                  required
              />
          </div>
          <div className="sign__block">
            <label htmlFor="uid">아이디 </label>
            <input
              type="text"
              id="uid"
              name="uid"
              title="아이디"
              className={signState('uid','focus') ? "focused" : ""}
              placeholder="아이디 입력 (6자~10자)"
              value={signData.uid}
              onChange={func.onChange}
              onFocus={() => onState("uid", "focus")}
              onBlur={onFocusReset}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ASU0101P01;
