import React from "react";
import { ThreeDot } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black bg-opacity-40 backdrop-blur-sm ">
      <div className="flex flex-col items-center">
        <ThreeDot
          variant="bounce"
          color="#3275b7"
          size={25}
          textSize="2xl" // Changed textSize to be larger
          textColor="#fff"
        />
        <p className="text-white text-2xl mt-4">loading...</p>
      </div>
    </div>
  );
};

export default Loading;
