import {ToastContainer} from "react-toastify";
import AccompanyLayout from "components/AccompanyLayout";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

const App = () => {
    return (

        <>
            <QueryClientProvider client={queryClient}>
                <ToastContainer/>
                <AccompanyLayout/>
                <ReactQueryDevtools initialIsOpen={true} />
            </QueryClientProvider>
        </>

    );
};

export default App;
