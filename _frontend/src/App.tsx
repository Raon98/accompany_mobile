import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AccompanyLayout from "components/layout/AccompanyLayout";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <AccompanyLayout />
          <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
      </RecoilRoot>
    </>
  );
};

export default App;
