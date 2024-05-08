 import React from 'react';
import {useNavigate} from "react-router-dom";

 /******************************
  * @공통 (ACCOMPANY COOMON COMPONENT)
  * @화면명:로그인화면
  * @작성자:김성철
  ********************************/

const ACC0102P01 = () => {
    const navigate = useNavigate();

    console.log("로그인페이지")
    return (
        <div>
            로그인페이지입니다.
            <button onClick={() => navigate("/")}>메인페이지로 돌아가</button>
        </div>
    );
};

export default ACC0102P01;