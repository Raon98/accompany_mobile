import React from 'react';
import {useNavigate} from "react-router-dom";
import {$api} from "plugins/api";

/******************************
  * @공통 메인화면 (ACCOMPANY COMMON COMPONENT)
  * @화면명:메인화면
  * @작성자:김성철
  ********************************/

const ACC0101P01 = () => {
    const navigate = useNavigate();
    $api.AsyncPost('api', 'ACS0101S01', '', {test:"test"}, (res) => {
        console.log("API TEST")
    });
    return (
        <div>
            메인페이지입니다
            <button onClick={() => navigate("/ACC0101P02")}>서브페이지로</button>
        </div>
    );
};

export default ACC0101P01;