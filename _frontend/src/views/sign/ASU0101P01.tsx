import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import useSign from "state/useSign";
import { FieldState, SignState } from "store/signStore";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

interface SignData {
  [key: string]: { title: string; value: string; success: boolean };
}

const ASU0101P01 = () => {
  const { signState, onState, onReset, onBox, openBox } = useSign();
  const navigate = useNavigate();
  const optionList = ["google.com", "naver.com", "kakao.com", "nate.com"];
  const [signData, setSignData] = useState<SignData>({
    uid: { title: "아이디를", value: "", success: false },
    email: { title: "이메일을", value: "", success: false },
    emailAddress: { title: "이메일을", value: "", success: false },
    name: { title: "이름을", value: "", success: false },
    password: { title: "비밀번호를", value: "", success: false },
    passwordConfirm: { title: "비밀번호 확인을", value: "", success: false },
    phone: { title: "전화번호를", value: "", success: false },
    birthYy: { title: "생년월일을", value: "", success: false },
    birthMm: { title: "생년월일을", value: "", success: false },
    birthDd: { title: "생년월일을", value: "", success: false },
    gender: { title: "성별을", value: "m", success: false },
  });
  const title = useRef(signData.uid.title);
  const func = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;
      setSignData((prev) => ({
        ...prev,
        [name]: {
          ...prev[name as keyof SignData],
          value: value,
          success: true,
        },
      }));
    },
    selOption: (domain: string) => {
      openBox();
      setSignData((prev) => ({
        ...prev,
        emailAddress: { ...prev["emailAddress"], value: domain, success: true },
      }));
    },
    onFocus: (name: keyof SignState, option: keyof FieldState) => {
      title.current = signData[name].title;
      onState(name, option);
    },
    onNext: (
      e: React.KeyboardEvent<HTMLInputElement>,
      name: keyof SignState,
      option: keyof FieldState,
      length?: number
    ) => {
      const allowedKeys = ["Backspace", "Enter"];
      const target = e.target as HTMLInputElement;
      const el = document.getElementById(name);

      if (
        length &&
        target.value.length >= length &&
        !allowedKeys.includes(e.key)
      ) {
        e.preventDefault();
      }

      if (e.key === "Enter") {
        onReset("focus");

        onState(name, option, () => {

          setTimeout(()=> {
            title.current = signData[name].title;
            el?.focus();
          },50)

        });
      }
    },
    onClick: (type: string) => {
      const gender = type === "men" ? "m" : type === "girl" ? "g" : "";
      if (gender === "m" || gender === "g") {
        setSignData((prev) => ({
          ...prev,
          gender: { ...prev["gender"], value: gender, success: true },
        }));
      }
    },
  };
  return (
    <>
      <header>
        <button
          className="header-prev__btn"
          onClick={() => navigate("/ALI0101P01")}
        />
        <div className="header__title">회원가입</div>
      </header>
      <div className="sign">
        <div className="sign__title">{title.current} 입력해주세요.</div>
        <div className="sign-content">
          <div className={`sign__block gender ${
              signState("gender", "state") ? "show" : "hide"
          }`}>
            <label htmlFor="gender">성별 </label>
            <div className="gender__block">
              <button
                className={`bdr__btn ${
                  signData.gender.value === "m" ? "primary" : ""
                } `}
                onClick={() => func.onClick("men")}
              >
                남자
              </button>
              <button
                className={`bdr__btn ${
                  signData.gender.value === "g" ? "primary" : ""
                } `}
                onClick={() => func.onClick("girl")}
              >
                여자
              </button>
            </div>
          </div>
          <div className={`sign__block birth ${
              signState("birthYy", "state") ? "show" : "hide"
          }`}>
            <label htmlFor="birth">생년월일 </label>
            <div className="birth__block">
              <input
                type="number"
                id="birthYy"
                name="birthYy"
                title="생년월일"
                className={signState("birthYy", "focus") ? "focused" : ""}
                placeholder="연도"
                value={signData.birthYy.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("birthYy", "focus")}
                onBlur={() => onReset("focus")}
                min="1900"
                max="2100"
                onKeyDown={(e) => func.onNext(e, "birthMm", "state", 4)}
                required
              />
              <input
                type="number"
                id="birthMm"
                name="birthMm"
                title="생년월일"
                className={signState("birthMm", "focus") ? "focused" : ""}
                placeholder="월"
                value={signData.birthMm.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("birthMm", "focus")}
                onBlur={() => onReset("focus")}
                min="1"
                max="12"
                onKeyDown={(e) => func.onNext(e, "birthDd", "state", 2)}
                required
              />
              <input
                type="number"
                id="birthDd"
                name="birthDd"
                title="생년월일"
                className={signState("birthDd", "focus") ? "focused" : ""}
                placeholder="일"
                value={signData.birthDd.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("birthDd", "focus")}
                onBlur={() => onReset("focus")}
                min="1"
                max="31"
                onKeyDown={(e) => func.onNext(e, "gender", "state", 2)}
                required
              />
            </div>
          </div>
          <div className={`sign__block phone ${
              signState("phone", "state") ? "show" : "hide"
          }`}>
            <label htmlFor="phone">전화번호 </label>
            <input
              type="number"
              id="phone"
              name="phone"
              title="전화번호"
              className={signState("phone", "focus") ? "focused" : ""}
              placeholder="휴대폰번호 입력 ('-'제외입력)"
              value={signData.phone.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("phone", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "birthYy", "state",11)}
              max={0}
              min={99999999999}
              required
            />
          </div>
          <div className={`sign__block email ${
              signState("email", "state") ? "show" : "hide"
          }`}>
            <label htmlFor="email">이메일 </label>
            <div className="email__block">
              <input
                type="text"
                id="email"
                name="email"
                title="이메일"
                className={signState("email", "focus") ? "focused" : ""}
                placeholder="이메일 입력"
                value={signData.email.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("email", "focus")}
                onBlur={() => onReset("focus")}
                required
              />
              <div className="email-asterisk">@</div>
              <div className="emailAddress">
                <input
                  type="text"
                  id="emailAddress"
                  name="emailAddress"
                  title="이메일주소"
                  className={
                    signState("emailAddress", "focus") || onBox ? "focused" : ""
                  }
                  placeholder="주소 입력"
                  value={signData.emailAddress.value}
                  onChange={func.onChange}
                  onFocus={() => func.onFocus("emailAddress", "focus")}
                  onBlur={() => onReset("focus")}
                  onKeyDown={(e) => func.onNext(e, "emailAddress", "state")}
                  required
                />
                <div
                  className={`emailAddress__option ${onBox ? "select" : ""}`}
                  onClick={() => openBox()}
                />

                <ul
                  className={`emailAddress__option--select ${
                    onBox ? "show" : ""
                  }`}
                >
                  {optionList.map((domain, idx) => (
                    <li key={idx}>
                      <button
                        type="button"
                        className="option-btn"
                        onClick={() => func.selOption(domain)}
                      >
                        {domain}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className={`sign__block name ${
              signState("name", "state") ? "show" : "hide"
          }`}>
            <label htmlFor="name">이름 </label>
            <input
              type="text"
              id="name"
              name="name"
              title="이름"
              className={signState("name", "focus") ? "focused" : ""}
              placeholder="이름 입력"
              value={signData.name.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("name", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "phone", "state")}
              required
            />
          </div>
          <div
            className={`sign__block password 
            ${signState("password", "state") ? "show" : "hide" }
            `}
          >
            <label htmlFor="password">비밀번호 </label>
            <input
              type="password"
              id="password"
              name="password"
              title="비밀번호"
              className={signState("password", "focus") ? "focused" : ""}
              placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
              value={signData.password.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("password", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "passwordConfirm", "state")}
              required
            />
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              title="비밀번호 확인"
              className={[
                signState("passwordConfirm", "focus") ? "focused" : "",
              ].join(" ")}
              placeholder="비밀번호 재입력"
              value={signData.passwordConfirm.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("passwordConfirm", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "name", "state")}
              required
            />
          </div>
          <div className="sign__block uid">
            <label htmlFor="uid">아이디 </label>
            <input
              type="text"
              id="uid"
              name="uid"
              title="아이디"
              className={signState("uid", "focus") ? "focused" : ""}
              placeholder="아이디 입력 (6자~13자)"
              value={signData.uid.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("uid", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "password", "state")}
              maxLength={13}
              minLength={6}
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ASU0101P01;
