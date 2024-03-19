import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import {accompany} from "plugins/accompany";

function App() {
    const [res, setRes] = useState([]);

    const { $api } = accompany()
    let data  = {
        uid : "cheol1998"
    }
    useEffect(() => {
        $api("AUI0101S01", "yourScreenId", data,
            (res) => {
                if(res.data){
                    console.log("Success:", res);
                }
            },
            (err) => {
            }
        )
    }, []);

    return (
        <div>
            백엔드 테스트 : {JSON.stringify(res)} {/* 받은 데이터 확인 */}
        </div>
    );
}

export default App;