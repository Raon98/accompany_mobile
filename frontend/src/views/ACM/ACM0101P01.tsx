import React from 'react';
import {useNavigate} from "react-router-dom";

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