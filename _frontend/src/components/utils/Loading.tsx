import Spinner from "assets/images/loading.gif";
import useLoading from "state/useLoading";
const Loading = () => {
  const { loading } = useLoading();
  return (
    <>
      {loading && (
        <div className="loading-fixed">
          <div className="spinner-item"></div>
          {/* <div className="spinner-text">동행</div> */}
        </div>
      )}
    </>
  );
};

export default Loading;
