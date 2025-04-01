import React from "react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Account, dashboard, Analyse } from "../data";
import Button from "./Button";

function MobileNav({ isopen, setIsopen, setActiveButton, activeButton }) {
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
              <Button
                className="w-40  bg-[#1170CD] text-white rounded-xl !p-4 text-lg font-medium hover:bg-[#0E5BAA] transition-colors"
                onClick={() => {
                  Navigate("/login");
                  setIsopen(false);
                }}
              >
                login In
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default MobileNav;
