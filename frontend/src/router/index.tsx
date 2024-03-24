import {Routes} from "react-router-dom";
import AccompanyLayout from "components/AccompanyLayout";

interface RouterProps {
    isAuthenticated : boolean;
}
export default function Router() {

    return (
        <>
            <Routes>
                <AccompanyLayout/>
            </Routes>
        </>
    )
}


