import React, {Suspense} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {AccompanyLayoutProps} from "components/AccompanyLayout";

export default function Router({pathList,rootPath} : AccompanyLayoutProps) {
    if (!pathList || pathList.length === 0) {
        return <div>Loading...</div>;
    }
    return (
        <Routes>
            { pathList.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <route.component/>
                        </Suspense>}
                />
            ))}
            <Route path="*" element={<Navigate replace to={rootPath}/> }/>
        </Routes>
    );
}
