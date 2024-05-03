 import React from 'react';
import {useNavigate} from "react-router-dom";

 /******************************
  * @사용자공통메인페이지 (ACCOMPANY COMMON MAIN)
  * @작성자:김성철
  ********************************/

const ACM0101P01 = () => {
    const navigate = useNavigate();
    return (
        <div>
            메인페이지입니다
            <button onClick={() => navigate("/ACM0101P02")}>클릭하세요</button>
        </div>
    );
};

export default ACM0101P01;