import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Account, dashboard, Analyse } from "../data";
// import Button from "./Button";
import { useSelector } from "react-redux";

function MobileNav({
  isopen,
  setIsopen,
  setActiveButton,
  activeButton,
  setHover,
  hover,
}) {
  const Useremail = useSelector((state) => state.user.email);
  const navigate = useNavigate();
  return (
    <div>
      {isopen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 20 }}
          className=" top-14 right-0 w-full h-full bg-white shadow-2xl z-50"
        >
          <div className="p-4 h-full flex flex-col">
            <motion.ul className="flex flex-col gap-2 flex-1">
              <Link to="/create-resume">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left text-[#1170CD] text-lg transition-all duration-300 hover:bg-[#D7E8FF] hover:text-[#2563EB] p-2 rounded-xl ${
                    activeButton === "/create-resume"
                      ? "bg-[#1170CD] text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveButton("/create-resume");
                    setIsopen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2  rounded-lg">
                      <img src={Analyse} alt="" className="w-6 h-6" />
                    </span>
                    Resume Analyse
                  </div>
                </motion.button>
              </Link>

              <Link to="/dashboard">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left text-[#1170CD] text-lg hover:bg-[#D7E8FF] hover:text-[#2563EB] p-2 transition-all duration-300 rounded-xl ${
                    activeButton === "/dashboard"
                      ? "bg-[#1170CD] text-white"
                      : ""
                  }`}
                  onClick={() => {
                    setActiveButton("/dashboard");
                    setIsopen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2 rounded-lg">
                      <img src={dashboard} alt="" className="w-6 h-6" />
                    </span>
                    Dashboard
                  </div>
                </motion.button>
              </Link>

              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left text-[#1170CD] text-lg hover:bg-[#D7E8FF] hover:text-[#2563EB] p-2 transition-all duration-300 rounded-xl ${
                    activeButton === "/login" ? "bg-[#1170CD] text-white" : ""
                  }`}
                  onClick={() => {
                    setActiveButton("/login");
                    setIsopen(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-2  rounded-lg">
                      <img src={Account} alt="" className="w-6 h-6" />
                    </span>
                    My Account
                  </div>
                </motion.button>
              </Link>
            </motion.ul>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-gray-100 flex justify-center">
              {Useremail ? (
                <div
                  className="text-gray-400 px-4 py-2 rounded-full cursor-pointer relative"
                  onClick={() => setHover(!hover)}
                >
                  <p className="text-gray-400 text-lg font-bold">{Useremail}</p>

                  {hover && (
                    <div className="absolute top-12 mt-2 left-0 transform -translate-x-[60%] bg-[#1170CD] text-white rounded-lg shadow-lg w-32 text-center border-white">
                      <div className="absolute left-2/3 transform -translate-x-0 -top-2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-[#1170CD]"></div>
                      <p
                        className="py-2 border-b border-white cursor-pointer"
                        onClick={() => navigate("/accountinfo")}
                      >
                        My Account
                      </p>
                      <p
                        className="py-2 cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button
                    className={`bg-[#1170CD] text-white  text-2xl p-4 rounded-md   hover:bg-[#0E5BAA] hover:text-white duration-300 ${
                      activeButton === "/login"
                        ? "bg-[#1170CD] text-white p-2 rounded-md "
                        : "text-[#1170CD]"
                    }`}
                    onClick={() => setActiveButton("/login")}
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MobileNav;
