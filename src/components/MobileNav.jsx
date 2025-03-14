import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function MobileNav() {
  return (
    <div className="transfrom translate-y-[20%]  h-screen w-full flex items-center justify-center z-10   bg-black bg-opacity-90">
    <motion.div className="bg-white p-4 w-full h-full relative -top-8 shadow-lg rounded-br-2xl rounded-bl-2xl z-10  ">
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
  )
}

export default MobileNav
