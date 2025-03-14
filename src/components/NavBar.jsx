import React, { useState, useEffect } from "react";
import logo from "../assets/M logo .png";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { div } from "motion/react-client";

const NavBar = ({ onExit }) => {
  const [isopen, setIsopen] = useState(false);
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  useEffect(() => {
    setActiveButton(location.pathname);
  }, [location.pathname]);

  return (
    // DESKTOP MENU
    <div>
      <nav className="sticky top-0 left-0 right-0  ">
        <ul className="flex justify-between items-center  bg-white z-10 p-4  shadow-[10px_10px_30px_-3px_rgba(66,68,90,0.5)]  max-sm:px-4 max-sm:py-2 ">
          <Link to="/">
            <img src={logo} alt="logo" className="w-10" />
          </Link>
          <li className="flex space-x-2 items-center max-sm:hidden">
            <Link to="/create-resume">
              <button
                className={`text-[#1170CD] text-[18px] tracking-tight transition- p-2 rounded-md   max-lg:text-base hover:bg-[#0E5BAA] hover:text-white duration-300 ${
                  activeButton === "/create-resume"
                    ? "bg-[#1170CD]  p-2 rounded-md text-white"
                    : ""
                }`}
                onClick={() => setActiveButton("/create-resume")}
              >
                Resume Analyse
              </button>
            </Link>

            <Link to="/login">
              <button
                className={`text-[#1170CD]  text-[18px]   p-2 rounded-md  hover:bg-[#0E5BAA]  hover:text-white max-lg:text-base duration-300 ${
                  activeButton === "/login"
                    ? "bg-[#1170CD] text-white p-2 rounded-md "
                    : "text-[#1170CD]"
                }`}
                onClick={() => setActiveButton("/login")}
              >
                Login
              </button>
            </Link>
          </li>
          <li className="hidden max-sm:block">
            {!isopen ? (
              <ion-icon
                name="menu-outline"
                className="w-10 h-10 block max-sm:w-8 max-sm:h-8"
                onClick={() => setIsopen(true)}
              ></ion-icon>
            ) : (
              <ion-icon
                className="w-10 h-10 block max-sm:w-8 max-sm:h-8"
                onClick={() => setIsopen(false)}
              ></ion-icon>
            )}
          </li>
          {onExit && (
            <button
              onClick={onExit}
              className="text-[#1170CD] hover:text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <span className="material-icons-outlined">exit_to_app</span>
              Exit Interview
            </button>
          )}
        </ul>
        {/* MOBILE MENU */}
        {isopen && (
          <div className="transfrom translate-y-[20%]   w-full  bg-opacity-90   ">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 w-full h-full relative -top-8 shadow-lg rounded-br-2xl rounded-bl-2xl z-10  "
            >
              <motion.ul className="flex flex-col gap-[2px] items-center">
                <Link to="/create-resume">
                  <motion.button
                    className={`text-[#1170CD] text-xl  transition-all duration-300 hover:bg-[#0E5BAA] hover:text-white p-2 rounded-md  ${
                      activeButton === "/create-resume"
                        ? "bg-[#1170CD] text-white p-2 rounded-md"
                        : ""
                    }`}
                    onClick={() => setActiveButton("/create-resume")}
                  >
                    Resume Analyse
                  </motion.button>
                </Link>

                <Link to="/dashboard">
                  <motion.button
                    className={`text-[#1170CD] text-[18px] hover:bg-[#0E5BAA] hover:text-white p-2 transition-all duration-300 rounded-md px-8 ${
                      activeButton === "/dashboard"
                        ? "bg-[#1170CD] text-white  p-2 rounded-md"
                        : ""
                    }`}
                    onClick={() => setActiveButton("/dashboard")}
                  >
                    Dash Board
                  </motion.button>
                </Link>
                <Link to="/login">
                  <motion.button
                    className={`text-[#1170CD] text-[18px] hover:bg-[#0E5BAA] hover:text-white p-2 transition-all duration-300 rounded-md tracking-tight px-8 ${
                      activeButton === "/login"
                        ? "bg-[#1170CD] text-white  p-2 rounded-md"
                        : "text-[#1170CD]"
                    }`}
                    onClick={() => setActiveButton("/login")}
                  >
                    My Account
                  </motion.button>
                </Link>
              </motion.ul>
            </motion.div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
