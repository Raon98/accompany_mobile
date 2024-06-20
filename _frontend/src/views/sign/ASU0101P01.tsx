import { BackBtnHeader } from "components/layout/CustomHeader";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSign from "state/useSign";
import { FieldState, SignState } from "store/signStore";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

interface SignData {
  [key: string]: { title: string; value: string };
}

const ASU0101P01 = () => {
  const {
    signState,
    onState,
    onReset,
    onBox,
    openBox,
    onSuccessForm,
    setSucces,
  } = useSign();
  const navigate = useNavigate();
  const optionList = ["google.com", "naver.com", "kakao.com", "nate.com"];
  const validText = useRef("");
  const [signData, setSignData] = useState<SignData>({
    uid: { title: "아이디를", value: "" },
    email: { title: "이메일을", value: "" },
    emailAddress: { title: "이메일을", value: "" },
    name: { title: "이름을", value: "" },
    password: { title: "비밀번호를", value: "" },
    passwordConfirm: { title: "비밀번호 확인을", value: "" },
    phone: { title: "전화번호를", value: "" },
    birthYy: { title: "생년월일을", value: "" },
    birthMm: { title: "생년월일을", value: "" },
    birthDd: { title: "생년월일을", value: "" },
    gender: { title: "성별을", value: "" },
    private: { title: "", value: signState("gender", "state") ? "Y" : "N" },
  });
  const title = useRef(signData.uid.title);
  const func = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      /*아이디 / 이메일/ 이메일 주소일경우 영문숫자만 입력가능하도록 수정*/
      if (name === "uid" || name === "email" || name === "emailAddress") {
        const regex = /^[a-zA-Z0-9.]*$/;
        if (regex.test(value)) {
          setSignData((prev) => ({
            ...prev,
            [name]: {
              ...prev[name as keyof SignData],
              value: value.replace(" ", ""),
            },
          }));
        } else {
          validText.current = "영문으로 입력해주세요.";
          onState(name, "fail");
        }
      } else {
        setSignData((prev) => ({
          ...prev,
          [name]: {
            ...prev[name as keyof SignData],
            value: value.replace(" ", ""),
          },
        }));
      }
    },
    onValidation: (currentName: keyof SignState): boolean => {
      /*공통 유효성 검사: 글자수 1이하일때*/
      if (signData[currentName].value.length < 1) {
        onState(currentName, "fail");
        return false;
      }
      /*아이디 유효성검사*/
      if (currentName === "uid") {
        if (signData[currentName].value.length < 4) {
          validText.current = "글자수가 4자이하입니다.";
          onState(currentName, "fail");
          return false;
        }
      }

      if (currentName === "password") {
        /*최소 8자 이상 확인하고 문자, 숫자, 특수문자 포함 확인*/
        const regex =
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
        if (!regex.test(signData.password.value)) {
          validText.current =
            "8자이상, 숫자, 특수문자가 포함됐는지 확인해주세요.";
          onState(currentName, "fail");
          return false;
        }
      }
      /*비밀번화 일치하는지확인*/
      if (currentName === "passwordConfirm") {
        if (signData.password.value !== signData.passwordConfirm.value) {
          validText.current = "비밀번호가 일치하지않습니다. 다시확인해주세요!";
          onState(currentName, "fail");
          return false;
        }
      }
      /*이메일일 경우 주소까지 같이 입력후 성공여부 검사*/
      if (currentName !== "email") {
        onState(currentName, "success");
      }
      if (currentName === "emailAddress") {
        onState("email", "success");
      }
      if (currentName === "birthDd") {
        onState("birthYy", "success");
        onState("birthMm", "success");
      }
      /*휴대폰번호 11자리 고정*/
      if (currentName === "phone") {
        if (signData.phone.value.length !== 11) {
          validText.current = "휴대폰 11자리를 입력해주세요.";
          onState(currentName, "fail");
          return false;
        }
      }
      onState(currentName, "fail", false);
      return true;
    },
    selOption: (domain: string) => {
      const el = document.getElementById("phone");
      if (func.onValidation("emailAddress")) {
        openBox();
        setSignData((prev) => ({
          ...prev,
          emailAddress: { ...prev["emailAddress"], value: domain },
        }));

        onReset("focus");
        onState("phone", "state", true, () => {
          setTimeout(() => {
            title.current = signData["phone"].title;
            el?.focus();
          }, 50);
        });
      }
    },
    onFocus: (currentName: keyof SignState, option: keyof FieldState) => {
      title.current = signData[currentName].title;
      onState(currentName, option);
    },
    onNext: (
      e: React.KeyboardEvent<HTMLInputElement>,
      currentName: keyof SignState,
      nextName: keyof SignState,
      option: keyof FieldState,
      length?: number
    ) => {
      const allowedKeys = ["Backspace", "Enter", "Tab"];
      const target = e.target as HTMLInputElement;
      const el = document.getElementById(nextName);

      if (
        length &&
        target.value.length >= length &&
        !allowedKeys.includes(e.key)
      ) {
        e.preventDefault();
      }

      if (e.key === "Enter" || e.key === "Tab") {
        if (func.onValidation(currentName)) {
          /*셍냔월일 월 이거나 일일경우 한자리입력시 앞자리 0 삽입*/
          if (currentName === "birthMm" || currentName === "birthDd") {
            const paddedValue = signData[currentName].value.padStart(2, "0");
            setSignData((prev) => ({
              ...prev,
              [currentName]: {
                ...prev[currentName as keyof SignData],
                value: paddedValue,
              },
            }));
          }
          /*2024.06.14유효성 검사 */
          onReset("focus");
          onState(nextName, option, true, () => {
            setTimeout(() => {
              title.current = signData[nextName].title;
              if (nextName === "gender") {
                let el1 = document.getElementById("birthDd");
                el1?.blur();
              } else {
                el?.focus();
              }
            }, 50);
          });
        }
      }
    },
    onClick: (name:string,type: string) => {
     
      if(name ==='gender'){
        setSucces(true);
        const gender = type === "men" ? "m" : type === "girl" ? "g" : "";
        if (gender === "m" || gender === "g") {
          setSignData((prev) => ({
            ...prev,
            gender: { ...prev["gender"], value: gender },
          }));
        }
      }
      
    },
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    },
  };
  return (
    <>
      <BackBtnHeader title={"회원가입"}/>
      <form className="sign">
        {!onSuccessForm && (
          <div className="sign__title">{title.current} 입력해주세요.</div>
        )}
        <div className="sign-content">
          <div
            className={`sign__block gender ${
              signState("gender", "state") ? "show" : "hide"
            }`}
          >
            <label htmlFor="gender">성별 </label>
            <div className="gender__block">
              <button
               type="button"
                className={`bdr__btn ${
                  signData.gender.value === "m" ? "primary" : ""
                } `}
                onClick={(e) => func.onClick("gender","men")}
              >
                남자
              </button>
              <button
               type="button"
                className={`bdr__btn ${
                  signData.gender.value === "g" ? "primary" : ""
                } `}
                onClick={(e) => func.onClick("gender","girl")}
              >
                여자
              </button>
            </div>
          </div>
          <div
            className={`sign__block birth ${
              signState("birthYy", "state") ? "show" : "hide"
            }`}
          >
            <label htmlFor="birth">생년월일 </label>
            <div className="birth__block">
              <input
                type="number"
                id="birthYy"
                name="birthYy"
                title="생년월일"
                className={[
                  signState("birthYy", "focus") ? "focused" : "",
                  signState("birthYy", "success") ? "success" : "",
                  signState("birthYy", "fail") ? "fail" : "",
                ].join(" ")}
                placeholder="연도"
                value={signData.birthYy.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("birthYy", "focus")}
                onBlur={() => onReset("focus")}
                min="1900"
                max="2100"
                onKeyDown={(e) =>
                  func.onNext(e, "birthYy", "birthMm", "state", 4)
                }
              />
              <input
                type="number"
                id="birthMm"
                name="birthMm"
                title="생년월일"
                className={[
                  signState("birthMm", "focus") ? "focused" : "",
                  signState("birthMm", "success") ? "success" : "",
                  signState("birthMm", "fail") ? "fail" : "",
                ].join(" ")}
                placeholder="월"
                value={signData.birthMm.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("birthMm", "focus")}
                onBlur={() => onReset("focus")}
                min="1"
                max="12"
                onKeyDown={(e) =>
                  func.onNext(e, "birthMm", "birthDd", "state", 2)
                }
              />
              <input
                type="number"
                id="birthDd"
                name="birthDd"
                title="생년월일"
                className={[
                  signState("birthDd", "focus") ? "focused" : "",
                  signState("birthDd", "success") ? "success" : "",
                  signState("birthDd", "fail") ? "fail" : "",
                ].join(" ")}
                placeholder="일"
                value={signData.birthDd.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("birthDd", "focus")}
                onBlur={() => onReset("focus")}
                min="1"
                max="31"
                onKeyDown={(e) =>
                  func.onNext(e, "birthDd", "gender", "state", 2)
                }
              />
            </div>
          </div>
          <div
            className={`sign__block phone ${
              signState("phone", "state") ? "show" : "hide"
            }`}
          >
            <label htmlFor="phone">전화번호 </label>
            <input
              type="number"
              id="phone"
              name="phone"
              title="전화번호"
              className={[
                signState("phone", "focus") ? "focused" : "",
                signState("phone", "success") ? "success" : "",
                signState("phone", "fail") ? "fail" : "",
              ].join(" ")}
              placeholder="휴대폰번호 입력 ('-'제외입력)"
              value={signData.phone.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("phone", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "phone", "birthYy", "state", 11)}
              max={99999999999}
              min={0}
            />
            {signState("phone", "fail") && (
              <div className="info__text">{validText.current}</div>
            )}
          </div>
          <div
            className={`sign__block email ${
              signState("email", "state") ? "show" : "hide"
            }`}
          >
            <label htmlFor="email">이메일 </label>
            <div className="email__block">
              <input
                type="text"
                id="email"
                name="email"
                title="이메일"
                className={[
                  signState("email", "focus") ? "focused" : "",
                  signState("email", "success") ? "success" : "",
                  signState("email", "fail") ? "fail" : "",
                ].join(" ")}
                placeholder="이메일 입력"
                value={signData.email.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("email", "focus")}
                onBlur={() => onReset("focus")}
                onKeyDown={(e) =>
                  func.onNext(e, "email", "emailAddress", "state")
                }
              />
              <div className="email-asterisk">@</div>
              <div className="emailAddress">
                <input
                  type="text"
                  id="emailAddress"
                  name="emailAddress"
                  title="이메일주소"
                  className={[
                    signState("emailAddress", "focus") ? "focused" : "",
                    signState("emailAddress", "success") ? "success" : "",
                    signState("emailAddress", "fail") ? "fail" : "",
                  ].join(" ")}
                  placeholder="주소 입력"
                  value={signData.emailAddress.value}
                  onChange={func.onChange}
                  onFocus={() => func.onFocus("emailAddress", "focus")}
                  onBlur={() => onReset("focus")}
                  onKeyDown={(e) =>
                    func.onNext(e, "emailAddress", "phone", "state")
                  }
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

          <div
            className={`sign__block name ${
              signState("name", "state") ? "show" : "hide"
            }`}
          >
            <label htmlFor="name">이름 </label>
            <input
              type="text"
              id="name"
              name="name"
              title="이름"
              className={[
                signState("name", "focus") ? "focused" : "",
                signState("name", "success") ? "success" : "",
                signState("name", "fail") ? "fail" : "",
              ].join(" ")}
              placeholder="이름 입력"
              value={signData.name.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("name", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "name", "email", "state")}
            />
          </div>
          <div
            className={`sign__block password 
            ${signState("password", "state") ? "show" : "hide"}
            `}
          >
            <label htmlFor="password">비밀번호 </label>
            <input
              type="password"
              id="password"
              name="password"
              title="비밀번호"
              className={[
                signState("password", "focus") ? "focused" : "",
                signState("password", "success") ? "success" : "",
                signState("password", "fail") ? "fail" : "",
              ].join(" ")}
              placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
              value={signData.password.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("password", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) =>
                func.onNext(e, "password", "passwordConfirm", "state")
              }
              required={signState("password", "state")}
            />
            {signState("password", "fail") && (
              <div className="info__text">{validText.current}</div>
            )}
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              title="비밀번호 확인"
              className={[
                signState("passwordConfirm", "focus") ? "focused" : "",
                signState("passwordConfirm", "success") ? "success" : "",
                signState("passwordConfirm", "fail") ? "fail" : "",
              ].join(" ")}
              placeholder="비밀번호 재입력"
              value={signData.passwordConfirm.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("passwordConfirm", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) =>
                func.onNext(e, "passwordConfirm", "name", "state")
              }
            />
            {signState("passwordConfirm", "fail") && (
              <div className="info__text">{validText.current}</div>
            )}
          </div>
          <div className="sign__block uid">
            <label htmlFor="uid">아이디</label>
            <input
              type="text"
              id="uid"
              name="uid"
              title="아이디"
              className={[
                signState("uid", "focus") ? "focused" : "",
                signState("uid", "success") ? "success" : "",
                signState("uid", "fail") ? "fail" : "",
              ].join(" ")}
              placeholder="아이디 입력 (4자~13자)"
              value={signData.uid.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("uid", "focus")}
              onBlur={() => onReset("focus")}
              onKeyDown={(e) => func.onNext(e, "uid", "password", "state")}
              maxLength={13}
              minLength={6}
              required
            />
            {signState("uid", "fail") && (
              <div className="info__text">{validText.current}</div>
            )}
          </div>
        </div>
        {onSuccessForm && <button className="bdr__btn">가입하기</button>}
      </form>
    </>
  );
};

export default ASU0101P01;
