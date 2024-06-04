import Spinner from "../assets/images/loading.gif";
const Loading = () => {
  return (
    <>
      <div className="loading-fixed">
        <div className="loading">
          <img src={Spinner}></img>
        </div>
      </div>
    </>
  );
};

export default Loading;
