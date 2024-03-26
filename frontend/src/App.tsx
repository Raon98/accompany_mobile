import React, {ComponentType, lazy, useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import AccompanyLayout from "components/AccompanyLayout";
import {$api} from "plugins/api";

export interface RspProps {
    path: string
    component: ComponentType
}

const App = () => {
    const [initialized, setInitialized] = useState(false);
    const [pathList, setPathList] = useState<RspProps[]>([]);
    useEffect(() => {
        if (!initialized) {
            $api.AsyncPost('api', 'CMM0101S01', '', null, (res) => {
                let pathList = res.data.map((v: RspProps) => ({
                    path: v.path,
                   // component: lazy(() => import(`views/ACM/ACM0101P01`))
                    component: lazy(() => import(`${v.component}`))
                }))
                setPathList(pathList)
            });
            setInitialized(true);
        }
    }, [initialized]);
    return (
        <>
            <ToastContainer/>
            <AccompanyLayout pathList={pathList}/>
        </>
    );
};

export default App;
