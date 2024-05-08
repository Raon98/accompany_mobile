 import React from 'react';
import {useNavigate} from "react-router-dom";

 /******************************
  * @공통 (ACCOMPANY COMMON COMPONENT)
  * @화면명:회원가입
  * @작성자:김성철
  ********************************/

const ACC0102P01 = () => {
    const navigate = useNavigate();

    console.log("회원가입화면")
    return (
        <div>
            회원가입페이지.
            <button onClick={() => navigate("/ACC0102P01")}>로그인페이지로 돌아가기</button>
        </div>
    );
};

export default ACC0102P01;