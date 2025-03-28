import React from "react";
import NavBar from "../components/NavBar";
import { ResumeAnalyzer as resumeImage } from "../data";
import { uploadIcon } from "../data";
function ResumeAnalyzer() {
  return (
    <div className="h-screen">
      <NavBar />
      <div className="flex items-center justify-center p-4 h-[calc(100vh-75px)]">
        <div
          className="flex items-center justify-between gap-2 rounded-3xl  mx-auto max-w-6xl w-full max-md:p-5   "
          style={{ boxShadow: "0px 0px 25px 10px rgb(186, 213, 238)" }}
          data-aos="fade-up"
        >
          <div className=" flex flex-col justify-between  px-16 gap-3 w-full  max-md:px-6     ">
            <h2 className="text-[#1170CD] text-4xl font-semibold max-md:text-2xl  max-md:text-center ">
              Is Your Resume Good Enough
            </h2>
            <p className="text-gray-800 font-semibold max-md:font-bold  max-md:text-center ">
              Get AI-powered insights on your resume instantly!{" "}
              <p className="max-md:hidden ">
                Optimize your career opportunities with professional feedback.
              </p>
            </p>
            <div className="flex flex-col items-center justify-center  gap-2 border-2 border-dashed border-[#1170CD] py-8 rounded-3xl mt-10 ">
              <span>
                <img
                  src={uploadIcon}
                  alt="upload"
                  className="w-14 h-14 max-sm:w-8 max-sm:h-8 "
                />
              </span>
              <p className="font-bold text-xl max-md:text-base">
                Drop you Resume Here{" "}
              </p>
              <span className="text-gray-500 font-bold max-md:hidden">
                or click to browse
              </span>

              <input
                type="file"
                className="hidden"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
              />
              <label
                htmlFor="resume-upload"
                className="bg-[#1170CD] text-white p-3 max-md:w-50 rounded-full cursor-pointer hover:bg-[#0E5BAA] transition-all duration-300 max-md:text-sm"
              >
                upload your resume
              </label>
            </div>
          </div>
          <div className="max-md:hidden overflow-hidden rounded-r-xl w-full">
            <img
              src={resumeImage}
              className="w-full h-full   "
              alt="Login Illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeAnalyzer;
