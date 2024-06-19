import React from "react";
import { useNavigate } from "react-router-dom";


interface SginHeaderProp {
  title : string
}
export const SignHeader = ({title}:SginHeaderProp) => {
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
    