import React from "react";
import NavBar from "../components/NavBar";
import { resumes } from "../data";
import { useNavigate } from "react-router-dom";

function DashBoard() {
  const navigation = useNavigate();
  return (
    <div>
      <NavBar />
      <div>
        <h1 className="text-4xl text-center mt-10">My Reumes</h1>
        <div className="mt-4 grid grid-cols-4 justify-center  max-sm:justify-center items-center gap-16 max-lg:gap-12 max-md:gap-8 max-sm:gap-4 flex-wrap my-4   max-sm:mx-4 container mx-auto max-s  max-sm:grid-cols-1 max-md:grid-cols-2  max-xl:grid-cols-3 ">
          {resumes.map((resume, index) => (
            <div
              key={index}
              className="p-4 w-80 hover:shadow-[0px_10px_30px_10px_#bad5ee] duration-500 bg-white rounded-xl  "
            >
              <h3 className="text-lg font-semibold">{resume.title}</h3>
              <p className="text-gray-500 text-sm">
                Last update: {resume.lastUpdate}
              </p>
              <p className="mt-2 font-medium">ATS Score:</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${resume.atsScore}%` }}
                ></div>
              </div>
              <p className="mt-2">{resume.atsScore}%</p>
              <p className="mt-2 font-medium">
                Interview Score: {resume.interviewScore}
              </p>
            </div>
          ))}
          <div className="p-4 w-80 h-40  hover:shadow-[0px_0px_10px_0px_#bad5ee] duration-500 bg-white rounded-xl flex items-center justify-center ">
            <button
              onClick={() => navigation("/create-resume")}
              className="w-16 h-16 flex items-center justify-center border-2 border-blue-500 rounded-full text-blue-500 duration-300 hover:bg-blue-100"
            >
              <ion-icon
                name="add-outline"
                className="w-10 h-10 block max-sm:w-8 max-sm:h-8 "
              ></ion-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
