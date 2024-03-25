import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ACM0101P01 from "views/ACM/ACM0101P01";
import GVCanves from "components/GVCanves";

interface RouterPath {
    path : string
    component : React.ComponentType
}
export default function Router() {

    const routerPath: RouterPath[] = [
        {
            path: '/',
            component: ACM0101P01
        },
        {
            path: '/GVC0101P01',
            component: GVCanves
        },
    ];

    return (
        <Routes>
            {routerPath.map(route => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.component/>}
                />
            ))}
        </Routes>
    );
}
