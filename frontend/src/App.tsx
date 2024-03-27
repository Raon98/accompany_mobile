import React, {ComponentType, lazy, useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import AccompanyLayout from "components/AccompanyLayout";
import {$api} from "plugins/api";

export interface RspProps {
    path: string,
    hd_flag : string,
    ft_flag : string,
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
                    component: lazy(() => import(`${v.component}`)),
                    hd_flag : v.hd_flag,
                    ft_flag : v.ft_flag
                }))
                setPathList(pathList)
            });
            setInitialized(true);
        }
    }, [initialized]);
    return (
        <>
            {pathList?.length && (
            <>
                <ToastContainer/>
                <AccompanyLayout pathList={pathList}/>
            </>
            )
        }
        </>
    );
};

export default App;
