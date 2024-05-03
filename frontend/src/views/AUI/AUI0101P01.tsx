import { useNavigate } from "react-router-dom";


/******************************
 * @사용자프로필페이지(ACCOMPANY USER INFO)
 * @작성자:김성철
 ********************************/
const AUI0101P01 = () => {
    const navigate = useNavigate();
    return (

        <div>
           <div>
               <button onClick={() => navigate("/")}>클릭하세요</button>
           </div>
        </div>
    );
};

export default AUI0101P01;