import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "state/useModal";


interface HeaderProp {
  title : string
}
interface CloseHeaderProp extends HeaderProp {
  type : string,
  option? : {
    name : string
  } 
}
export const BackBtnHeader = ({title}:HeaderProp) => {
    const navigate = useNavigate();
      return (
        <header className="header">
          <div className="header__title">{title}</div>
          <button
            className="header-prev__btn"
            onClick={() => navigate("/ALI0101P01")}
          />
        </header>
      );
    };


export const CloseHeader = ({title,type,option}:CloseHeaderProp) => {
  const navigate = useNavigate();
  const optionName = option?.name ? option.name : ''
  const { onClose } = useModal(optionName);
  const func = {
    close : (type:string) => {
      if(type === 'back'){
        navigate(-1);
      }
      if(type === 'close'){
        onClose()
      }
    }
  }
  return (
    <header className="close-header">
      <div className="header__title">{title}</div>
      <div className="close_btn" onClick={()=>func.close(type)}></div>
    </header>
  )
}
    