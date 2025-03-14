import React, { useState } from "react";
import Button from "./Button";
import MockupInterviewPopup from "./InterviewPop";
import { home } from "../data";
import { useNavigate } from "react-router-dom";
function Header() {
  const [isopen, setIsopen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="bg-[#F5F7FA]">
      <div
        className="flex  items-center justify-evenly   p-16  gap-10  max-sm:gap-5  max-sm:flex-col-reverse  max-sm:py-5 max-sm:px-2
        
         "
      >
        <div
          className="  flex flex-col gap-4  w-[50%] mx-auto max-sm:w-full max-sm:text-center"
          data-aos="fade-up-right"
        >
          <h2 className="text-6xl font-bold max-sm:text-2xl ">
            Your AI-Powered Resume Expert
          </h2>
          <p className=" text-2xl font-normal max-sm:text-sm max-sm:text-center max-sm:m-4 ">
            Scan your resume, get instant feedback, and prepare for mock
            interviews with AI-driven insights.
          </p>
          <Button onClick={() => navigate("/create-resume")}>
            Analyze your resume
          </Button>
        </div>

        <div className="max-sm:w-[90%]  mx-auto " data-aos="fade-up-left">
          <img src={home} alt="hero" className="w-full h-full" />
        </div>
      </div>

      {isopen && <MockupInterviewPopup setIsopen={setIsopen} />}
    </div>
  );
}

export default Header;
