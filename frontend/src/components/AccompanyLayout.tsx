import React, {lazy} from 'react';
import {Route} from "react-router-dom";

const AccompanyLayout = () => {

    const AccompanyHeader = lazy(async () => await import("components/AccompanyHeader"));
    const AccompanyFooter = lazy(async () => await import("components/AccompanyFooter"));

    const routerPath = [{
        path: '/',
        element: lazy(() => import("views/ACM/ACM0101P01"))
    },{
        path: '/GVC0101P01',
        element: lazy(() => import("components/GVCanves"))
    }];

    return (
        <>
            <AccompanyHeader/>
            {
                routerPath.map(route => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<route.element />}
                    />
                ))
            }
            <AccompanyFooter/>
        </>
    );
};

export default AccompanyLayout;