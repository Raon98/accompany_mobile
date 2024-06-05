import Spinner from "assets/images/loading.gif";
import useLoading from "state/useLoading";
const Loading = () => {
  const { loading } = useLoading();
  return (
    <>
      {loading && (
        <div className="loading-fixed">
          <div className="loading">
            <img src={Spinner}></img>
          </div>
        </div>
      )}
    </>
  );
};

export default Loading;
