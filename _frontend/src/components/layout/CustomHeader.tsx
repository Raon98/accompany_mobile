import React from "react";
import { useNavigate } from "react-router-dom";


interface HeaderProp {
  title : string
}
export const BackBtnHeader = ({title}:HeaderProp) => {
    const navigate = useNavigate();
      return (
        <header className="header">
          <button
            className="header-prev__btn"
            onClick={() => navigate("/ALI0101P01")}
          />
          <div className="header__title">{title}</div>
        </header>
      );
    };


export const CloseHeader = ({title}:HeaderProp) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="header__title">{title}</div>
      <div className="close_btn" onClick={()=>navigate(-1)}></div>
    </header>
  )
}
    