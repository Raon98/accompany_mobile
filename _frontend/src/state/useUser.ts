import { useRecoilState } from 'recoil'
import { User, userInfo } from 'store/useUserStore'

interface UseUser {
  user: User
  setUserInfo: (user: User) => void
}

const useUser = (): UseUser => {
  const [user, setUser] = useRecoilState(userInfo)

  const setUserInfo = (user: User) => {
    setUser(user)
  }
  return {
    user,
    setUserInfo,
  }
}

export default useUser
