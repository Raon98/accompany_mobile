import { useRecoilState } from 'recoil'
import { modalStore } from 'store/modalStore'

interface UseModal {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const useModal = (name: string): UseModal => {
  const [isOpenStates, setIsOpenStates] = useRecoilState(modalStore)
  const isOpen = isOpenStates[name]

  const onOpen = () => {
    setIsOpenStates(prev => ({
      ...prev,
      [name]: true,
    }))
  }

  const onClose = () => {
    setIsOpenStates(prev => ({
      ...prev,
      [name]: false,
    }))
  }

  return { isOpen, onOpen, onClose }
}

export default useModal
