import { useNavigate } from "react-router-dom";

const AUI0101P01 = () => {
    const navigate = useNavigate();
    console.log("뭐지1231")
    return (
        <div>
            로그인페이지 실시간반영됐나? 아니
           <div>
               <button onClick={() => navigate("/ACM0101P01")}>클릭하세요</button>
           </div>
        </div>
    );
};

export default AUI0101P01;