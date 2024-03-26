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
    /*DB에서 */
    const [headerFlag, setHeaderFlag] = useState(false)
    let location = useLocation();


    useEffect(()=>{
        if(location.pathname === '/ACM0101P02'){
            setHeaderFlag(true)
        }else {
            setHeaderFlag(false)
        }
    },[location.pathname])

    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                {headerFlag && ( <AccompanyHeader />)}
                <div className="contents">
                    <AccompanySection>
                        <Router pathList={pathList}/>
                    </AccompanySection>
                </div>
                <AccompanyFooter />
            </Suspense>
        </>
    );
};

export default AccompanyLayout;