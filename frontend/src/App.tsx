import React, {ComponentType} from 'react';
import {ToastContainer} from "react-toastify";
import AccompanyLayout from "components/AccompanyLayout";
import { useNavigate } from 'react-router-dom';


export type AuthYn = 'Y' | 'N'
export interface RspProps {
    path: string,
    hd_flag : string,
    ft_flag : string,
    auth_yn : AuthYn
    component: ComponentType
}

const App = () => {
    return (

            <>
                <ToastContainer/>
                <AccompanyLayout/>
            </>

    );
};

export default App;
