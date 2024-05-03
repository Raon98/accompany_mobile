import React, {ComponentType, lazy, useEffect, useState} from 'react';
import {ToastContainer} from "react-toastify";
import AccompanyLayout from "components/AccompanyLayout";
import {$api} from "plugins/api";
import {useNavigate} from "react-router-dom";

export type AuthYn = 'Y' | 'N'
export interface RspProps {
    path: string,
    hd_flag : string,
    ft_flag : string,
    auth_yn : AuthYn
    component: ComponentType
}

const App = () => {
    const [initialized, setInitialized] = useState(false);
    const [pathList, setPathList] = useState<RspProps[]>([]);
    const [rootPath,setRootPath] = useState<string>('/')
    const [authFlag, setAuthFlag] = useState("N");
    const navigate = useNavigate()
    useEffect(() => {
        if (!initialized) {
            $api.AsyncPost('api', 'CMM0101S01', '', null, (res) => {
                let [rootRoute,...routeFilter] = res.data.filter((t:RspProps) => t.auth_yn === authFlag)
                let pathList = routeFilter.map((v: RspProps) => ({
                    path: v.path,
                    component: lazy(() => import(`${v.component}`)),
                    hd_flag : v.hd_flag,
                    ft_flag : v.ft_flag,
                    auth_yn : v.auth_yn
                }))
                setPathList(pathList)
                setRootPath(rootRoute.component)
                navigate(rootRoute.component)
            });
            setInitialized(true);
        }
    }, [initialized]);
    return (
        <>
            {pathList?.length && (
            <>
                <ToastContainer/>
                <AccompanyLayout pathList={pathList} rootPath={rootPath}/>
            </>
            )
        }
        </>
    );
};

export default App;
