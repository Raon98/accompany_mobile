import axios from "axios";
import * as process from "process";

let config = {
    baseURL : process.env.REACT_BACKBASE_URL,
    timeout : 60 * 1000,
    withCredentials : true
}

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (config) {
        return config
    },
    function (error) {
        return error
    }
)

_axios.interceptors.response.use(
    function (config) {
        return config
    },
    function (error) {
        return error
    }
)

interface apiPros {
    serviceId : string, // 서비스 아이디
    screedId? : string,
    methodId? : string,
    params? : object | string,
    successCall? : Function,
    failCall? : Function
}
export const $api =  (props:apiPros)=> {
    const serviceId = props.methodId === null ? props.serviceId : props.serviceId +'/'+props.methodId
    axios.post(`/api/${serviceId}`, props.params, {
        headers: {
            'Content-Type': 'application/json; charset=uft-8'
        }
    })
        .then((response) => {

        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

}
