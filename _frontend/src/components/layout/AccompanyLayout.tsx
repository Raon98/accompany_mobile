import AccompanySection from "components/layout/AccompanySection";
import Loading from "components/utils/Loading";
import { lazy, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Router, { RIM } from "router";

const AccompanyHeader = lazy(() => import("components/layout/AccompanyHeader"));
const AccompanyFooter = lazy(() => import("components/layout/AccompanyFooter"));

const AccompanyLayout = () => {
  const isAuthenticated = false;
  const role = "C,A";
  const [headerFlag, setHeaderFlag] = useState(false);
  const [footerFlag, setFooterFlag] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    /*20240510 헤더푸터 사용/미사용여부 체크*/
    let path = RIM.filter((v) => v.path === location.pathname);
    if (path?.length > 0) {
      setHeaderFlag(path[0].hd);
      setFooterFlag(path[0].ft);
    }

    if (!isAuthenticated) {
      if (location.pathname === "/") {
        navigate("/ALI0101P01");
      }
    }
  }, [location.pathname]);

  return (
    <>
      <div className="wrapper">
        {headerFlag && <AccompanyHeader />}
        <div className="contents">
          <AccompanySection>
            <Router isAuthenticated={isAuthenticated} role={role} />
            <Loading />
          </AccompanySection>
        </div>
        {footerFlag && <AccompanyFooter />}
      </div>
    </>
  );
};

export default AccompanyLayout;
