import React, { useState, useSyncExternalStore } from "react";
import NavBar from "../components/NavBar";
import { avatar, resumes } from "../data";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function DashBoard() {
  const [userAvatar, setUserAvatar] = useState(avatar);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUserAvatar(imageUrl);
    }
  };
  const userName = useSelector((state) => state.user.user);
  const userEmail = useSelector((state) => state.user.email);
  return (
    <div>
      <NavBar />
      <div className=" grid grid-cols-[400px_auto] mx-10   max-sm:mx-2 max-sm:grid-cols-1 gap-10 max-sm:gap-5 ">
        <div
          className=" h-auto w-auto bg-white rounded-xl  mt-10 flex flex-col  shadow-[0px_0px_10px_0px_#bad5ee] max-sm:m-4"
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div className="relative border-b-4 border-[#1170CD]  ">
            <div className="w-24 h-24 object-cover rounded-xl  mx-auto my-4 overflow-hidden">
              <img
                src={userAvatar}
                alt="avatar"
                className="w-full h-full object-cover rounded-xl    "
              />
            </div>
          </div>
          <div className="border-b-2 border-blue-700 p-4 ">
            <h1 className="text-2xl font-semibold text-center">{userName}</h1>
            <p className="text-gray-500 text-center"> {userEmail}</p>
            <p className="text-gray-800  font-semibold text-justify">
              A Web Designer creates visually appealing and user-friendly
              websites by focusing on layout, color schemes, typography, and
              interactive elements. They use design tools like Figma or Adobe XD
              and have basic knowledge of HTML, CSS, and JavaScript.
            </p>
          </div>
          <div className="border-b-2 border-blue-700 p-4 flex flex-col gap-2 ">
            <p className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
              </span>
              <p className="text-gray-800  font-semibold">Location</p>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
              </span>
              <p className="text-gray-800  font-semibold">Education</p>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
              </span>
              <p className="text-gray-800  font-semibold">LinkedIn </p>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon
                  icon={faGithub}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
              </span>
              <p className="text-gray-800  font-semibold">Github</p>
            </p>
          </div>
          <div className=" p-4 flex flex-col gap-2 ">
            <p className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
              </span>
              <p className="text-gray-800  font-semibold">Location</p>
            </p>
            <p className="flex items-center gap-2">
              <span>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-[#1170CD] w-8 h-8 max-sm:w-5 max-sm:h-5"
                />
              </span>
              <p className="text-gray-800  font-semibold">+1 234 567 8900</p>
            </p>
          </div>
          <Link to="/userinfo" className="flex justify-center p-4">
            <Button className={"  rounded-md "}>Edit Profile</Button>
          </Link>
        </div>
        <div className=" max-sm:m-2">
          <h1 className="text-4xl  my-10 max-sm:my-5">My Reumes</h1>
          <div className=" grid grid-cols-2 gap-6 max-sm:grid-cols-1">
            {resumes.map((resume, index) => (
              <div
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
                data-aos-duration="1000"
                className="p-4 w-auto  transition-all duration-300 bg-white rounded-xl shadow-md "
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoard;
