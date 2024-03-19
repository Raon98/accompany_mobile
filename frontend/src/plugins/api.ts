import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_LOCAL_URL

let config = {
    baseURL: baseURL,
    timeout: 60 * 1000,
    withCredentials: true
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

/**
 *
 * @param serviceId
 * @param screedId
 * @param params
 * @param successCall
 * @param failCall
 */
export const $api = (serviceId: string, screedId?: string, params?: object | string, successCall?: (res: any) => void, failCall?: (err: any) => void) => {
    _axios.post(`/api/${serviceId}`, {
        REQ_COM: {
            serviceId: serviceId,
            screenId: screedId,
            langCd: 'ko'
        },
        REQ_DAT: params
    }, {
        headers: {
            'Content-Type': 'application/json; charset=uft-8'
        }
    })
        .then((res) => {
            successCall && successCall(res)
        })
        .catch((err) => {
            failCall && failCall(err)
            console.error(err);
        });
}
