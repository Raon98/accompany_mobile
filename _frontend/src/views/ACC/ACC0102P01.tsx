import { $api } from "plugins/api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useMutation} from "@tanstack/react-query";

/******************************
 * @공통 (ACCOMPANY COMMON COMPONENT)
 * @화면명:로그인화면
 * @작성자:김성철
 ********************************/

const ACC0102P01 = () => {
  const navigate = useNavigate();
  const [uid, setUid] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const sessionMutation = useMutation({
    mutationFn : ()=> $api.AsyncPost('api', 'ACS0201S01', 'ACC0102P01',{uid:"test"}),
    onSuccess: (res) => {
      console.log(res)
    },
  })
  const {mutate,isPending,isError,isSuccess} = sessionMutation
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
    onClick : ()=> {
        mutate()
    }
  };

  return (
    <div className="login">
      <div className="login__logo">동행하다</div>

      {/*
            
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
          
            */}
      <div className="login-fixed">
        <button className="login__btn" onClick={func.onClick}>로그인</button>
      </div>
    </div>
  );
};

export default ACC0102P01;
