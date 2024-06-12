import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import useSign from "state/useSign";
import {FieldState} from "store/signStore";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입메인화면
 * @작성자:김성철
 ********************************/

interface SignData {
  uid: { title: string; value: string ,success : boolean};
  email: { title: string; value: string ,success : boolean};
  emailAddress: { title: string; value: string ,success : boolean};
  name: { title: string; value: string ,success : boolean};
  password: { title: string; value: string ,success : boolean};
  passwordConfirm: { title: string; value: string ,success : boolean};
  phone: { title: string; value: string ,success : boolean};
}

const ASU0101P01 = () => {
  const { signState, onState, onReset ,onBox,openBox } = useSign();
  const navigate = useNavigate();
  const optionList = ['google.com','naver.com' ,'kakao.com', 'nate.com'];
  const [signData, setSignData] = useState<SignData>({
    uid: {title:'아이디를',value:'',success :false},
    email: {title:'이메일을',value:'',success :false},
    emailAddress: {title:'이메일을',value:'',success :false},
    name: {title:'이름을',value:'',success :false},
    password: {title:'비밀번호를',value:'',success :false},
    passwordConfirm: {title:'비밀번호 확인을',value:'',success :false},
    phone: {title:'전화번호를',value:'',success :false},
  });
  const title = useRef(signData.uid.title)
  const func = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const {
        target: {name, value},
      } = e;
      setSignData(prev => ({
        ...prev,
        [name]: {...prev[name as keyof SignData], value:value},
      }));
    },
    selOption : (domain :string) => {
      openBox()
      setSignData(prev => ({
        ...prev,
        emailAddress : {...prev["emailAddress"], value:domain},
      }));
    },
    onFocus: (name: keyof SignData,option: keyof FieldState) => {
      title.current =signData[name].title;
      onState(name, option);
    },
    onNext: (e: React.KeyboardEvent<HTMLInputElement>,name: keyof SignData,option: keyof FieldState) =>{
      if(e.key ==='Enter'){
          onState(name,option)
        }
    }
  };
  return (
    <>
      <header>
        <button className="header-prev__btn" onClick={()=> navigate('/ALI0101P01')}/>
        <div className="header__title">회원가입</div>
      </header>
      <div className="sign">
        <div className="sign__title">{title.current} 입력해주세요.</div>
        <div className="sign-content">
          <div className="sign__block phone">
            <label htmlFor="name">전화번호 </label>
            <input
                type="text"
                id="phone"
                name="phone"
                title="전화번호"
                className={signState('phone', 'focus') ? "focused" : ""}
                placeholder="휴대폰번호 입력 ('-'제외 11자리입력)"
                value={signData.phone.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("phone", "focus")}
                onBlur={()=> onReset('focus')}
                maxLength={11}
                required
            />
          </div>
          <div className="sign__block">
            <label htmlFor="email">이메일 </label>
            <div className="email__block email">
              <input
                  type="text"
                  id="email"
                  name="email"
                  title="이메일"
                  className={signState('email', 'focus') ? "focused" : ""}
                  placeholder="이메일 입력"
                  value={signData.email.value}
                  onChange={func.onChange}
                  onFocus={() => func.onFocus("email", "focus")}
                  onBlur={()=> onReset('focus')}
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
                    value={signData.emailAddress.value}
                    onChange={func.onChange}
                    onFocus={() => func.onFocus("emailAddress", "focus")}
                    onBlur={()=> onReset('focus')}
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

          <div className="sign__block name">
            <label htmlFor="name">이름 </label>
            <input
                type="text"
                id="name"
                name="name"
                title="이름"
                className={signState('name', 'focus') ? "focused" : ""}
                placeholder="이름 입력"
              value={signData.name.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("name", "focus")}
              onBlur={()=> onReset('focus')}
              required
            />
          </div>
          <div className={`sign__block password ${signState("password","state") ? 'show' : 'hide'}`}>
            <label htmlFor="password">비밀번호 </label>
            <input
                type="password"
                id="password"
                name="password"
                title="비밀번호"
                className={signState('password', 'focus') ? "focused" : ""}
                placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                value={signData.password.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("password", "focus")}
                onBlur={()=> onReset('focus')}
                required
            />
            <label htmlFor="passwordConfirm">비밀번호 확인</label>
            <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                title="비밀번호 확인"
                className={[signState('passwordConfirm', 'focus') ? "focused" : ""].join(" ")}
                placeholder="비밀번호 재입력"
                value={signData.passwordConfirm.value}
                onChange={func.onChange}
                onFocus={() => func.onFocus("passwordConfirm", "focus")}
                onBlur={()=> onReset('focus')}
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
              className={signState('uid','focus') ? "focused" : ""}
              placeholder="아이디 입력 (6자~13자)"
              value={signData.uid.value}
              onChange={func.onChange}
              onFocus={() => func.onFocus("uid", "focus")}
              onBlur={()=> onReset('focus')}
              onKeyDown={(e) => func.onNext(e,"password","state")}
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
