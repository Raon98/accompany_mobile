import React, {lazy, useEffect, useState} from 'react';
import AccompanySection from "components/AccompanySection";
import Router,{RIM} from 'router';
import {$api} from "plugins/api";
import {useLocation, useNavigate} from "react-router-dom";

const AccompanyHeader = lazy(() => import("components/AccompanyHeader"));
const AccompanyFooter = lazy(() => import("components/AccompanyFooter"));


const AccompanyLayout = () => {
    const isAuthenticated = true
    const role = 'C,A'
    const [headerFlag, setHeaderFlag] = useState(false)
    const [footerFlag, setFooterFlag] = useState(false)
    const location = useLocation()
    const navigate = useNavigate();

    useEffect(() => {
        /*20240510 헤더푸터 사용/미사용여부 체크*/
        let path = RIM.filter(v => v.path === location.pathname)
        if(path?.length > 0){
            setHeaderFlag(path[0].hd)
            setFooterFlag(path[0].ft)
        }
        
        if(!isAuthenticated){
            navigate("/ACC0102P01")
        }
        
    }, [location.pathname])


    return (
        <>
                <div className="wrapper">
                    {headerFlag && (<AccompanyHeader/>)}
                    <div className="contents">
                        <AccompanySection>
                          <Router isAuthenticated={isAuthenticated} role={role}/>
                        </AccompanySection>
                    </div>
                    {footerFlag && <AccompanyFooter/>}
                </div>
        </>
    );
};

export default AccompanyLayout;