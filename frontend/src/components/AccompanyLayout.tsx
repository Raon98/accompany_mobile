import React, {lazy, Suspense, useEffect, useState} from 'react';
import AccompanySection from "components/AccompanySection";
import Router from "router";
import {useLocation} from "react-router-dom";
import {RspProps} from "App";


const AccompanyHeader = lazy(() => import("components/AccompanyHeader"));
const AccompanyFooter = lazy(() => import("components/AccompanyFooter"));

export interface AccompanyLayoutProps {
    pathList: RspProps[];
}

const AccompanyLayout = ({pathList}:AccompanyLayoutProps) => {
    const [headerFlag, setHeaderFlag] = useState(true)
    const [footerFlag, setFooterFlag] = useState(true)
    let location = useLocation();

    useEffect(() => {
        /*20240327 헤더푸터 사용/미사용여부 체크*/
        if (pathList?.length) {
            setHeaderFlag(pathList.filter(v => v.path === location.pathname)[0].hd_flag === 'Y')
            setFooterFlag(pathList.filter(v => v.path === location.pathname)[0].ft_flag === 'Y')
        }


    }, [location.pathname])

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {headerFlag && (<AccompanyHeader/>)}
                <div className="contents">
                    <AccompanySection>
                        <Router pathList={pathList}/>
                    </AccompanySection>
                </div>
                {footerFlag && <AccompanyFooter/>}
            </Suspense>
        </>
    );
};

export default AccompanyLayout;