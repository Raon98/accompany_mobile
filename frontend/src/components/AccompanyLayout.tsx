import React, {lazy, useEffect, useState} from 'react';
import AccompanySection from "components/AccompanySection";
import Router,{RIM} from 'router';
import {$api} from "plugins/api";
import {useLocation} from "react-router-dom";

const AccompanyHeader = lazy(() => import("components/AccompanyHeader"));
const AccompanyFooter = lazy(() => import("components/AccompanyFooter"));


const AccompanyLayout = () => {
    const isAuthenticated = true
    const role = 'C,A'
    const [headerFlag, setHeaderFlag] = useState(true)
    const [footerFlag, setFooterFlag] = useState(true)
    const location = useLocation()

    useEffect(() => {
        /*20240327 헤더푸터 사용/미사용여부 체크*/
        // if (pathList?.length) {
        //     setHeaderFlag(pathList.filter(v => v.path === location.pathname)[0].hd_flag === 'Y')
        //     setFooterFlag(pathList.filter(v => v.path === location.pathname)[0].ft_flag === 'Y')
        // }

        console.log(location.pathname)
        $api.AsyncPost('api', 'ACS0101S01', '', {path : location.pathname}, (res) => {
    
            console.log(res.data)
            // let pathList = routeFilter.map((v: RspProps) => ({
            //     path: v.path,
            //     component: lazy(() => import(`${v.component}`)),
            //     hd_flag : v.hd_flag,
            //     ft_flag : v.ft_flag,
            //     auth_yn : v.auth_yn
            // }))
        });

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