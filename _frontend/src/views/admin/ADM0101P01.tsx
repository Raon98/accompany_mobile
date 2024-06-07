import asyncApi from "plugins/asyncApi";
import React, { useState } from "react";

/******************************
 * @관리자 (ACCOMPANY ADMIN)
 * @화면명: 화면 라우터 관리/설정
 * @작성자:김성철
 ********************************/
type chnlType = "M" | "A";
type ynType = "Y" | "N";

const ADM0101P01 = () => {
  const [chnl, setChnl] = useState<chnlType>("M");
  const [componentId, setComponentId] = useState("");
  const [headerFlag, setHeaderFlag] = useState<ynType>("Y");
  const [footerFlag, setFooterFlag] = useState<ynType>("N");

  const { $api } = asyncApi();

  const func = {
    onChange: (e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
      const {
        target: { name, value },
      } = e;

      if (name === "chnl") {
        setChnl(e.target.value);
      }
      if (name === "component_id") {
        setComponentId(e.target.value);
      }
      if (name === "header_flag") {
        setHeaderFlag(e.target.value);
      }
      if (name === "footer_flag") {
        setFooterFlag(e.target.value);
      }
    },
    registration: () => {
      let id = `views/${componentId.slice(0, 3)}/${componentId}`;
      let path = `/${componentId}`;

      console.log("현재채널값은 : " + chnl);
      console.log("현재 ID 값은 : " + id);
      console.log("현재 PATH 값은 : " + path);
      console.log("현재 headerFlag 값은 : " + headerFlag);
      console.log("현재 footerFlag 값은 : " + footerFlag);

      let params = {
        chnl: chnl,
        component_id: id,
        component_path: path,
        header_flag: headerFlag,
        footer_flag: footerFlag,
      };
      const input = $api("api", "AUS0101S01", "", params);
      console.log(input);
    },
  };

  return (
    <div className="form">
      <div className="title">ROUTER 등록</div>
      <div className="form_regist">
        <div className="form__block">
          <div className="form__title">채널</div>
          <label htmlFor="mobile">모바일</label>
          <input
            type="radio"
            name="chnl"
            id="mobile"
            value="M"
            checked={chnl === "M"}
            onChange={func.onChange}
          />
          <label htmlFor="admin">관리자</label>
          <input
            type="radio"
            name="chnl"
            id="admin"
            value="A"
            checked={chnl === "A"}
            onChange={func.onChange}
          />
        </div>
        <div className="form__block">
          <div className="form__title">화면 ID EX)AUS0101P01</div>
          <label htmlFor="component_id" />
          <input
            type="text"
            name="component_id"
            id="component_id"
            required
            value={componentId}
            onChange={func.onChange}
          />
        </div>
        <div className="form__block">
          <div className="form__title">HEADER (Y/N)</div>
          <label htmlFor="Header_Y">Y</label>
          <input
            type="radio"
            name="header_flag"
            id="Header_Y"
            value="Y"
            checked={headerFlag === "Y"}
            onChange={func.onChange}
          />
          <label htmlFor="Header_N">N</label>
          <input
            type="radio"
            name="header_flag"
            id="Header_N"
            value="N"
            checked={headerFlag === "N"}
            onChange={func.onChange}
          />
        </div>
        <div className="form__block">
          <div className="form__title">FOOTER (Y/N)</div>
          <label htmlFor="Footer_Y">Y</label>
          <input
            type="radio"
            name="footer_flag"
            id="Footer_Y"
            value="Y"
            checked={footerFlag === "Y"}
            onChange={func.onChange}
          />
          <label htmlFor="Footer_N">N</label>
          <input
            type="radio"
            name="footer_flag"
            id="Footer_N"
            value="N"
            checked={footerFlag === "N"}
            onChange={func.onChange}
          />
        </div>
      </div>
      <div className="router_regist">
        <button onClick={func.registration}>등록</button>
      </div>
    </div>
  );
};

export default ADM0101P01;
