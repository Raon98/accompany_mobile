import React, {lazy, useEffect, useState} from 'react';
import AccompanySection from "components/AccompanySection";
import {RouterProvider, useLocation} from "react-router-dom";
import {router} from "router";


const AccompanyHeader = lazy(() => import("components/AccompanyHeader"));
const AccompanyFooter = lazy(() => import("components/AccompanyFooter"));


const AccompanyLayout = () => {
    let location = useLocation();
    const [headerFlag, setHeaderFlag] = useState(true)
    const [footerFlag, setFooterFlag] = useState(true)


    useEffect(() => {
        /*20240327 헤더푸터 사용/미사용여부 체크*/
        // if (pathList?.length) {
        //     setHeaderFlag(pathList.filter(v => v.path === location.pathname)[0].hd_flag === 'Y')
        //     setFooterFlag(pathList.filter(v => v.path === location.pathname)[0].ft_flag === 'Y')
        // }

    }, [location.pathname])

    return (
        <>
                <div className="wrapper">
                    {headerFlag && (<AccompanyHeader/>)}
                    <div className="contents">
                        <AccompanySection>
                            {/*<Router/>*/}
                            <RouterProvider router={router}/>
                        </AccompanySection>
                    </div>
                    {footerFlag && <AccompanyFooter/>}
                </div>
        </>
    );
};

export default AccompanyLayout;