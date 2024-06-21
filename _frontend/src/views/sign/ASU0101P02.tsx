import { BackBtnHeader } from "components/layout/CustomHeader";
import { Modals } from "components/utils/Modals";
import { useNavigate } from "react-router-dom";
import useSign from "state/useSign";
import useModal from "state/useModal";
import { useState } from "react";
import ASU0101P03 from "views/sign/ASU0101P03";
import ASU0101P04 from "views/sign/ASU0101P04";

/******************************
 * @회원가입 (ACCOMPANY Sign Up)
 * @화면명:회원가입 약관화면
 * @작성자:김성철
 ********************************/

interface modalContentProps {
  component : JSX.Element | null
  title : string
}

const ASU0101P02 = () => {
  const navigate = useNavigate();
  const {optionState, setOptionState} =useSign();
  const {isOpen, onOpen} = useModal('component');
  const [modalContent, setModalContent] = useState<modalContentProps>({component : null, title :''});
  const func = {
    onClickTerms : (type:string) => {
      if(type === 'use'){
        setModalContent({
          component : <ASU0101P03/>,
          title : '이용약관'
        })
      }
      if(type === 'private'){
        setModalContent({
          component : <ASU0101P04/>,
          title : '개인정보 수집 이용 동의서'
        })
      }
      onOpen()
    }
  };
  return (
    <>
      <BackBtnHeader title={"회원가입"} />
      {isOpen &&<Modals Props1={modalContent.component} Props2={modalContent.title}/>}
      <div className="sgin-terms">
        <div className="sgin-terms__subject">
          <div className="title__sub1">
            <span>동행인</span>으로서 첫 발걸음에
            <div className="sub__logo"/>
          </div>
          <div className="title__sub2">진심으로 환영합니다.</div>
        </div>
        <div className="sgin-terms__contents">
          <div className="sgin-terms__agreement">
            <button className={`option__btn ${optionState('all') && optionState('use') && optionState('priv')? 'check' : ''} `} onClick={()=>setOptionState('all')}/>
            <div className="option__text all" onClick={()=>setOptionState('all')}>약관 전체동의</div>
          </div>
          <div className="borderline"></div>
          <div className="sgin-terms__agreements">
            <div className="sgin-terms__agreement">
              <button className={`option__btn ${optionState('use')? 'check' : ''} `} onClick={()=>setOptionState('use')}/>
              <div className="option__text" onClick={()=>setOptionState('use')}>이용약관 동의(필수)</div>
              <div className="terms__btn" onClick={()=>func.onClickTerms('use')}/>
            </div>
           
            <div className="sgin-terms__agreement">
              <button className={`option__btn ${optionState('priv')? 'check' : ''} `} onClick={()=>setOptionState('priv')}/>
              <div className="option__text" onClick={()=>setOptionState('priv')}>
                개인정보 수집 및 이용동의(필수)
              </div>
              <div className="terms__btn" onClick={()=>func.onClickTerms('private')}/>
            </div>
          </div>
        </div>
        <button
          className="sign-term__btn"
          onClick={() => navigate("/ASU0101P01")}
        >
          <div>시작하기</div>
        </button>
      </div>
    </>
  );
};
export default ASU0101P02;
