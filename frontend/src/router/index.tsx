import { Route, Routes } from "react-router-dom";
import React from "react";
import ACC0101P01 from "views/ACC/ACC0101P01";
import AAC0101P01 from "views/AAC/AAC0101P01";
import ACC0102P01 from "views/ACC/ACC0102P01";
import ACC0102P02 from "views/ACC/ACC0102P02";

interface RouterProps {
    isAuthenticated: boolean;
    role?: string;
}

export default function Router({ isAuthenticated, role }: RouterProps) {
    return (
        <Routes>
            {/* 로그인 후 공통 경로 */}
            {isAuthenticated && (
                <>
                    <Route path="/" element={<ACC0101P01 />} />
                    <Route path="*" element={<ACC0101P01 />} />
                </>
            )}

            {/* 관리자 권환 */}
            {isAuthenticated && role === 'A' && (
                <Route path="/AAC0101P01" element={<AAC0101P01 />} />
            )}

            {/* 로그인 전 경로 */}
            {!isAuthenticated && (
                <>
                    <Route path="/ACC0102P01" element={<ACC0102P01 />} />
                    <Route path="/ACC0102P02" element={<ACC0102P02 />} />
                    <Route path="/*" element={<ACC0102P01 />} />
                </>
            )}
        </Routes>
    );
}
