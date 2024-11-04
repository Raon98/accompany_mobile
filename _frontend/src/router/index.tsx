import { Route, Routes } from 'react-router-dom'
import AdminLayout from 'views/admin/AdminLayout'

import Loginlayout from 'views/login/Loginlayout'
import MainLayout from 'views/main/MainLayout'
import SignForm from 'views/sign/component/SignForm'
import SignLayout from 'views/sign/SignLayout'

interface RouterProps {
  isAuthenticated: boolean
  role?: string
}

/* 로그인 전 공통 */
const NCM = [
  {
    path: '/login',
    el: <Loginlayout />,
    hd: false,
    ft: false,
  },
  {
    path: '/sign/terms',
    el: <SignLayout />,
    hd: false,
    ft: false,
  },
  {
    path: '/sign',
    el: <SignForm />,
    hd: false,
    ft: false,
  },
]
/* 로그인 후 공통  */
const YCM = [
  {
    path: '/',
    el: <MainLayout />,
    hd: true,
    ft: false,
  },
]
/*관리자 */
const ADM = [
  {
    path: '/admin',
    el: <AdminLayout />,
    hd: false,
    ft: false,
  },
]

/*라우터 통합 관리 (Router integrated management)*/
export const RIM = [...NCM, ...YCM, ...ADM]

export default function Router({ isAuthenticated, role }: RouterProps) {
  return (
    <Routes>
      {/* 로그인 전 경로 */}
      {!isAuthenticated && (
        <>
          {NCM.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.el} />
          ))}
          <Route path="/*" element={<Loginlayout />} />
        </>
      )}
      {/* 로그인 후 공통 경로 */}
      {isAuthenticated && (
        <>
          {YCM.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.el} />
          ))}
          {/* <Route path="*" element={<ACM0101P01/>}/> */}
        </>
      )}

      {/* 관리자 권환 */}
      {isAuthenticated && role === 'A' && (
        <>
          {ADM.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.el} />
          ))}
          {/* <Route path="/*" element={<ACM0101P01/>}/> */}
        </>
      )}
    </Routes>
  )
}
