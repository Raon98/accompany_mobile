    import axios from "axios";

    // const baseURL = "http://localhost:8090/v1/"
    
    const baseURL = process.env.REACT_APP_BACKEND_URL

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
     * @param proxy
     * @param serviceId
     * @param screedId
     * @param params
     * @param successCall
     * @param failCall
     */

    /*비동기 POST 방식*/
    const AsyncPost = async (proxy:string,serviceId: string, screedId?: string, params?: any, successCall?: (res: any) => void, failCall?: (err: any) => void) => {
        await _axios.post(`/${proxy}/${serviceId}`, {
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
                successCall && successCall(res.data)
            })
            .catch((err) => {
                failCall && failCall(err)
                console.error(err);
            });
    }

    /*동기 POST 방식*/
    const Post = (proxy:string,serviceId: string, screedId?: string, params?: any, successCall?: (res: any) => void, failCall?: (err: any) => void) => {
        _axios.post(`/${proxy}/${serviceId}`, {
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
                successCall && successCall(res.data)
            })
            .catch((err) => {
                failCall && failCall(err)
                console.error(err);
            });
    }
    export const $api = { Post , AsyncPost}
