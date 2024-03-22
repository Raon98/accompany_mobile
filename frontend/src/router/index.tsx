import {
    Route,
    Routes,
    Navigate
} from "react-router-dom";
import GvCanves from "components/GVCanves";

interface RouterProps {
    isAuthenticated : boolean;
}
export default function Router() {
    /*지정되지않은 페이지
    * <Route path="*" element={<Navigate replace to="/"/> }/>
    * */

    return (
        <>
            <Routes>
                {
                        <>
                            <Route path="/" element={<GvCanves/>}/>
                        </>
                }
            </Routes>
        </>
    )
}


