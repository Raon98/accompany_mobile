import React, {lazy, Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';

interface RouterPath {
    path : string
    component : React.ComponentType

}
export default function Router() {

    const routerPath: RouterPath[] = [
        {
            path: '/',
            component: lazy(() => import('views/ACM/ACM0101P01'))
        },
        {
            path: '/ACM0101P02',
            component: lazy(()=> import('views/ACM/ACM0101P02'))
        },
        {
            path: '/GVC0101P01',
            component: lazy(()=> import('components/GVCanves'))
        },
    ];

    return (
        <Routes>
            {routerPath.map(route => (
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
