import React, { useState, useEffect } from "react";
import logo from "../assets/M logo .png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Account, dashboard, Analyse } from "../data";
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
      {/* Blur overlay with animation */}
      {isopen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
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
                  className="w-10 h-10 block max-sm:w-8 max-sm:h-8 text-[#1170CD]"
                  onClick={() => setIsopen(true)}
                ></ion-icon>
              ) : (
                <ion-icon
                  name="close-outline"
                  className="w-10 h-10 block max-sm:w-8 max-sm:h-8 text-[#1170CD]"
                  onClick={() => setIsopen(false)}
                ></ion-icon>
              )}
            </li>
          </ul>

          {/* MOBILE MENU */}
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
                      className={`w-full text-left text-[#1170CD] text-lg transition-all duration-300 hover:bg-[#D7E8FF] hover:text-[#2563EB] p-4 rounded-xl ${
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
                        activeButton === "/login"
                          ? "bg-[#1170CD] text-white"
                          : ""
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
                  <Button
                    className="w-40  bg-[#1170CD] text-white rounded-xl !p-4 text-lg font-medium hover:bg-[#0E5BAA] transition-colors"
                    onClick={() => {
                      navigate("/login");
                      setIsopen(false);
                    }}
                  >
                    loginIn
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
