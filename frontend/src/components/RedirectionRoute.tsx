import {Navigate} from 'react-router-dom';
import {LayoutProps} from "components/AccompanySection"


const RedirectionRoute = ({ children } : LayoutProps) => {
    const isAuthenticated = true;
    if (!isAuthenticated) {
        // 로그인 페이지로 리디렉션
        return <Navigate to="/ACC0102P01" replace />;
    }

    return <>{children}</>;
};

export default RedirectionRoute;