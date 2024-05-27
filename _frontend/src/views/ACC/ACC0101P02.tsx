import React from 'react';
import {useNavigate} from "react-router-dom";

/******************************
  * @공통 메인화면 (ACCOMPANY COMMON COMPONENT)
  * @화면명:메인화면
  * @작성자:김성철
  ********************************/

const ACC0101P02 = () => {
    const navigate = useNavigate();
    
    return (
        <div>
            서브페이지입니다.
            <button onClick={() => navigate("/ACC0101P01")}>메인페이지로</button>
        </div>
    );
};

export default ACC0101P02;