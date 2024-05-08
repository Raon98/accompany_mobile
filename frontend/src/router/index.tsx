import React from 'react';
import {createBrowserRouter, Route} from 'react-router-dom';
import RedirectionRoute from "components/RedirectionRoute";

import ACC0101P01 from "views/ACC/ACC0101P01";
import ACC0102P01 from "views/ACC/ACC0102P01";
import ACC0102P02 from "views/ACC/ACC0102P02";
import AAC0101P01 from "views/AAC/AAC0101P01";

export const router = createBrowserRouter([
    {
        path : "/",
        element : <RedirectionRoute><ACC0101P01/></RedirectionRoute>,
        errorElement : <div>Error</div>,
        children : [
            {
                path: "/",
                element :
                    <RedirectionRoute>
                        {/*ACC*/}
                        <Route path="ACC0101P01" element={<ACC0101P01/>}/>

                        {/*AAC*/}
                        <Route path="AAC0101P01" element={<AAC0101P01/>}/>
                    </RedirectionRoute>
            }
        ]
    },
    {
        // 로그인
        path : "/ACC0102P01",
        element : <ACC0102P01/>,
        errorElement : <div>Error</div>
    },
    {
        // 회원가입
        path : "/ACC0102P02",
        element : <ACC0102P02/>,
        errorElement : <div>Error</div>
    }

])
