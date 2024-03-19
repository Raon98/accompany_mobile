import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [res, setRes] = useState([]);

    axios.defaults.baseURL = 'http://localhost:8090';

    let data  = {
        uid : "cheol1998"
    }
    useEffect(() => {
        axios.post('/api/UserService/selectAll', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data);
                setRes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            백엔드 테스트 : {JSON.stringify(res)} {/* 받은 데이터 확인 */}
        </div>
    );
}

export default App;