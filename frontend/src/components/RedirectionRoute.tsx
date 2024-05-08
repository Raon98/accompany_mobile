import {Navigate} from 'react-router-dom';
import {ReactNode} from "react";

interface redirectRouteProps {
    children: ReactNode,
    role? : string
}

const RedirectionRoute = ({ children,role } : redirectRouteProps) => {
    const isAuthenticated = true;
    const dumpRole:string = "C,A"
    if (!isAuthenticated || (role && dumpRole.includes(role))) {
        // 로그인 페이지로 리디렉션
        return <Navigate to="/ACC0102P01" replace />;
    }

    return <>{children}</>;
};

export default RedirectionRoute;