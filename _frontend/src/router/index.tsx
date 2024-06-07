import { Route, Routes } from "react-router-dom";
import ADM0101P01 from "views/admin/ADM0101P01";
import ACM0101P01 from "views/main/ACM0101P01";
import ACM0101P02 from "views/main/ACM0101P02";
import ALI0101P01 from "views/login/ALI0101P01";
import ASU0101P01 from "views/sign/ASU0101P01";
import ASU0101P02 from "views/sign/ASU0101P02";

interface RouterProps {
  isAuthenticated: boolean;
  role?: string;
}

/* 로그인 전 공통 */
const NCM = [
  {
    path: "/ALI0101P01",
    el: <ALI0101P01 />,
    hd: false,
    ft: false,
  },
  {
    path: "/ASU0101P01",
    el: <ASU0101P01 />,
    hd: false,
    ft: false,
  },
  {
    path: "/ASU0101P02",
    el: <ASU0101P02 />,
    hd: false,
    ft: false,
  },
];
/* 로그인 후 공통  */
const YCM = [
  {
    path: "/",
    el: <ACM0101P01 />,
    hd: true,
    ft: false,
  },
  {
    path: "/ACM0101P01",
    el: <ACM0101P01 />,
    hd: true,
    ft: true,
  },
  {
    path: "/ACM0101P02",
    el: <ACM0101P02 />,
    hd: false,
    ft: false,
  },
];
/*관리자 */
const ADM = [
  {
    path: "/ADM0101P01",
    el: <ADM0101P01 />,
    hd: false,
    ft: false,
  },
];

/*라우터 통합 관리 (Router integrated management)*/
export const RIM = [...NCM, ...YCM, ...ADM];

export default function Router({ isAuthenticated, role }: RouterProps) {
  return (
    <Routes>
      {/* 로그인 전 경로 */}
      {!isAuthenticated && (
        <>
          {NCM.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.el} />
          ))}
          <Route path="/*" element={<ALI0101P01 />} />
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
      {isAuthenticated && role === "A" && (
        <>
          {ADM.map((route, idx) => (
            <Route key={idx} path={route.path} element={route.el} />
          ))}
          {/* <Route path="/*" element={<ACM0101P01/>}/> */}
        </>
      )}
    </Routes>
  );
}
