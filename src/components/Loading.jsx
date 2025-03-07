
import { ThreeDot } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <ThreeDot
        variant="bounce"
        color="#3275b7"
        size="medium"
        text=""
        textColor=""
      />
    </div>
  );
};

export default Loading;
