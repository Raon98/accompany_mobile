import { atom, useRecoilState } from 'recoil'

interface UseLoading {
  loading: boolean
  onStart: () => void
  onEnd: () => void
}

export const loadingStore = atom({
  key: 'loadingStore',
  default: false,
})

const useLoading = (): UseLoading => {
  const [loading, setLoading] = useRecoilState(loadingStore)

  const onStart = () => {
    setLoading(true)
  }

  const onEnd = () => {
    setLoading(false)
  }

  return { loading, onStart, onEnd }
}

export default useLoading
