import React, { useState, useEffect } from "react";
import logo from "../assets/M logo .png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Account, dashboard } from "../data";
import Button from "./Button";

const NavBar = ({ onExit }) => {
  const [isopen, setIsopen] = useState(false);
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);
  const navigate = useNavigate();
  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isopen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setActiveButton(location.pathname);
  }, [location.pathname, isopen]);

  return (
    <>
      {/* Blur overlay */}
      {isopen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsopen(false)}
        />
      )}

      {/* DESKTOP MENU */}
      <div className="relative z-50">
        <nav className="sticky top-0 left-0 right-0">
          <ul className="flex justify-between items-center bg-white z-10 p-4 shadow-[10px_10px_30px_-3px_rgba(66,68,90,0.5)] max-sm:px-4 max-sm:py-2">
            <Link to="/">
              <img src={logo} alt="logo" className="w-10" />
            </Link>
            <li className="flex space-x-2 items-center max-sm:hidden">
              <Link to="/create-resume">
                <button
                  className={`text-[#1170CD] text-[18px] tracking-tight transition- p-2 rounded-md   max-lg:text-base  hover:bg-[#0E5BAA] hover:text-white duration-300 ${
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
                  className={`text-[#1170CD]  text-[18px]   p-2 rounded-md   hover:bg-[#0E5BAA] hover:text-white max-lg:text-base duration-300 ${
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
            <div className="fixed top-0 right-0 w-full    bg-white shadow-2xl z-50  rounded-br-3xl rounded-bl-3xl ">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="py-6 "
              >
                <div className="flex items-center justify-between px-4 border-b border-gray-400 pb-4">
                  <Link to="/">
                    <img src={logo} alt="logo" className="w-10" />
                  </Link>
                  <button
                    onClick={() => setIsopen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <ion-icon
                      name="close-outline"
                      style={{ fontSize: "24px" }}
                    ></ion-icon>
                  </button>
                </div>
                <motion.ul className="flex  flex-col gap-4 max-sm:gap-2 max-sm:p-4">
                  <Link to="/create-resume">
                    <motion.button
                      className={`w-full text-left text-[#1170CD] text-xl transition-all duration-300 hover:bg-[#D7E8FF] hover:text-[#2563EB] p-3 rounded-md ${
                        activeButton === "/create-resume"
                          ? "bg-[#1170CD] text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/create-resume");
                        setIsopen(false);
                      }}
                    >
                      Resume Analyse
                    </motion.button>
                  </Link>

                  <Link to="/dashboard">
                    <motion.button
                      className={`w-full text-left text-[#1170CD] text-xl hover:bg-[#D7E8FF] hover:text-[#2563EB] p-3 transition-all duration-300 rounded-md ${
                        activeButton === "/dashboard"
                          ? "bg-[#1170CD] text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/dashboard");
                        setIsopen(false);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <img src={dashboard} alt="" />
                        Dashboard
                      </div>
                    </motion.button>
                  </Link>

                  <Link to="/login">
                    <motion.button
                      className={`w-full text-left text-[#1170CD] text-xl hover:bg-[#D7E8FF] hover:text-[#2563EB] p-3 transition-all duration-300 rounded-md ${
                        activeButton === "/login"
                          ? "bg-[#1170CD] text-white"
                          : ""
                      }`}
                      onClick={() => {
                        setActiveButton("/login");
                        setIsopen(false);
                      }}
                    >
                      {" "}
                      <div className="flex items-center gap-2">
                        <span>
                          <img src={Account} alt="" />
                        </span>
                        My Account
                      </div>
                    </motion.button>
                  </Link>
                </motion.ul>
                <div className="flex justify-center border-t border-gray-200 pt-4">
                  <Button
                    className="bg-[#1170CD] text-white  rounded-md w-40 text-xl"
                    onClick={() => {
                      navigate("/login");
                      setIsopen(false);
                    }}
                  >
                    Sign In
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
