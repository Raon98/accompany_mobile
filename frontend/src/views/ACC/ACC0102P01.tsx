import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

/******************************
 * @공통 (ACCOMPANY COMMON COMPONENT)
 * @화면명:로그인화면
 * @작성자:김성철
 ********************************/

const ACC0102P01 = () => {
    const navigate = useNavigate();
    const [uid, setUid] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const onChange = (e:React.ChangeEvent<HTMLFormElement>) => {
        const {target : {name, value}} = e;

        if(name === 'username'){

        }
        if(name === 'password'){
            
        }
    }
    return (
        <div className="login">
            <div className="login__logo">
                동행하다
            </div>
            <fieldset className="form">
                <dl className="form__icon id">
                    <dd>
                        <div className="form__block">
                            <input type="text" name="username" title="아이디" placeholder="아이디를 입력해주세요." />
                        </div>
                    </dd>
                </dl>
                <dl className="form__icon password">
                    <dd>
                        <div className="form__block">
                            <input type="password" name="password" title="비밀번호" placeholder="비밀번호를 입력해주세요." />
                            <button type="button" name="password" className="btn-password" />
                        </div>
                    </dd>
                </dl>
                <div className="form__utils">
                    <a href="javascript:void(0)" className="form__sign">
                        회원가입
                    </a>
                </div>
            </fieldset>
            <div className="login__btn button">
                <button>로그인</button>
            </div>
        </div>
    );
};

export default ACC0102P01;
