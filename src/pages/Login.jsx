import React, { useState } from "react";
import logo from "../assets/Google__G__logo 1.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { login } from "../data";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
    console.log(email, password);
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1,
        stiffness: 600,
        ease: "easeInOut",
      }}
      className="flex items-center justify-center min-h-screen p-4 "
    >
      <div
        className="flex  items-center justify-evenly gap-2 rounded-2xl  mx-auto max-w-6xl w-full max-md:p-3 "
        style={{ boxShadow: "0px 10px 30px 10px rgb(186, 213, 238)" }}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-1/2 max-md:w-full  max-md:p-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Login </h1>
          <div className="flex flex-col items-center justify-start gap-4 w-full p-4">
            <div className="relative w-80  m-auto mb-2 max-md:w-60">
              <input
                id="email"
                className="peer border-b border-gray-300 outline-none w-full py-2 text-gray-700 bg-transparent focus:ring-0 focus:border-blue-500"
                type="email"
                placeholder=""
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute left-0 top-2 -translate-y-1/2 text-sm  text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500">
                Email
              </label>
            </div>
            <div className="relative w-80  m-auto mb-2 max-md:w-60 ">
              <input
                id="password"
                className="peer border-b border-gray-300 outline-none w-full py-2 text-gray-700 bg-transparent focus:ring-0 focus:border-blue-500"
                type="password"
                placeholder=""
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-2 -translate-y-1/2 text-base  text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-xs peer-focus:text-blue-500"
              >
                Password
              </label>
            </div>

            <button className="bg-[#1170CD] text-white p-2 max-md:w-40 w-80 text-xl rounded-md cursor-pointer hover:bg-[#0E5BAA] transition-all duration-300">
              login
            </button>

            <div className="flex items-center justify-center gap-2 w-[70%] max-w-sm ">
              <p className="text-gray-800 text-2xl font-bold">or</p>
            </div>

            <button className="bg-[#1170CD] text-white p-2 w-full max-w-xs rounded-md shadow-md hover:bg-[#0E5BAA] transition-all duration-300">
              <div className="flex items-center justify-center gap-2">
                <img src={logo} alt="Google_logo" className="w-6" />
                <span>Sign in with Google</span>
              </div>
            </button>

            <p className="text-center max-sm:text-xs text-gray-500">
              New to builder?
              <span
                className="text-[#1170CD] ml-1 cursor-pointer hover:text-[#0E5BAA] transition-all duration-300 text-xs"
                onClick={() => navigate("/signup")}
              >
                 Create an account
              </span>
            </p>
          </div>
        </form>

        <div className="max-md:hidden overflow-hidden rounded-r-xl">
          <motion.img
            src={login}
            className="w-full h-auto hover:scale-110 transition-all duration-300   "
            alt="Login Illustration"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
