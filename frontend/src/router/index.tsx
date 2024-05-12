import { Route, Routes } from "react-router-dom";
import React from "react";
import ACC0101P01 from "views/ACC/ACC0101P01";
import AAC0101P01 from "views/AAC/AAC0101P01";
import ACC0102P01 from "views/ACC/ACC0102P01";
import ACC0102P02 from "views/ACC/ACC0102P02";
import ACC0101P02 from "views/ACC/ACC0101P02";

interface RouterProps {
    isAuthenticated: boolean;
    role?: string;
}

/* 로그인 전 공통 */
const NCM = [
    {
        path: "/ACC0102P01",
        el: <ACC0102P01/>
    },
    {
        path: "/ACC0102P02",
        el: <ACC0102P02/>
    }
]
/* 로그인 후 공통  */
const YCM = [
    {
        path: "/ACC0101P02",
        el: <ACC0101P02/>
    }
]
/*관리자 */
const ADM = [
    {
        path: "/AAC0101P01",
        el: <AAC0101P01/>
    }
]

/*라우터 통합 관리 (Router integrated management)*/
export const RIM = [...NCM, ...YCM, ...ADM]

export default function Router({isAuthenticated, role}: RouterProps) {
    return (
        <Routes>
            {/* 로그인 전 경로 */}
            {!isAuthenticated && (
                <>
                    {NCM.map((route,idx) => (
                        <Route key={idx} path={route.path} element={route.el}/>
                    ))}
                    <Route path="*" element={<ACC0102P01/>}/>
                </>
            )}
            {/* 로그인 후 공통 경로 */}
            {isAuthenticated && (
                <>
                    {YCM.map((route,idx) => (
                        <Route key={idx} path={route.path} element={route.el}/>
                    ))}
                    <Route path="/*" element={<ACC0101P01/>}/>
                </>
            )}

            {/* 관리자 권환 */}
            {isAuthenticated && role === 'A' && (
                <>
                    {ADM.map((route,idx) => (
                        <Route key={idx} path={route.path} element={route.el}/>
                    ))}
                    <Route path="/*" element={<ACC0101P01/>}/>
                </>
            )}


        </Routes>
    );
}
