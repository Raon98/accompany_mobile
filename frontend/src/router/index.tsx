import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AccompanyLayoutProps} from "components/AccompanyLayout";

interface RouterProps {
    isAuthenticated: boolean
}
export default function Router({pathList} : AccompanyLayoutProps, {isAuthenticated} : RouterProps) {
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
        </Routes>
    );
}
