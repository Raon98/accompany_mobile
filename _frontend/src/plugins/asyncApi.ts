import axios from 'axios'
import useLoading from 'state/useLoading'

const baseURL = process.env.REACT_APP_BACKEND_URL
const _axios = axios.create({
  baseURL,
  timeout: 60 * 1000,
  withCredentials: true,
})

const AsyncApi = () => {
  const { onStart, onEnd } = useLoading()

  /**
   *
   * @param proxy
   * @param serviceId
   * @param screedId
   * @param params
   * @param successCall
   * @param failCall
   */

  const $api = async (proxy: string, serviceId: string, screedId?: string, params?: any) => {
    try {
      onStart()

      const rsp = await _axios.post(
        `/${proxy}/${serviceId}`,
        {
          REQ_COM: {
            serviceId: serviceId,
            screenId: screedId,
            langCd: 'ko',
          },
          REQ_DAT: params,
        },
        {
          headers: {
            'Content-Type': 'application/json; charset=uft-8',
          },
        },
      )
      onEnd()
      return rsp.data
    } catch (error: any) {
      onEnd()
      throw new Error(error.message)
    }
  }

  return { $api }
}

export default AsyncApi
