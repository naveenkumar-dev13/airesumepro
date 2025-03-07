import React from "react";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="bg-[#1170CD] p-8 text-white flex  justify-between gap-5 flex-wrap  w-full max-sm:grid-cols-1">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold">About US</h2>
        <p className="max-w-xl text-base">
          Our AI-powered platform prepares job seekers with personalized mock
          interviews, real-time feedback, and smart resume tips.
        </p>
      </div>
      <div className="  flex flex-col gap-4">
        <h2 className="text-3xl font-semibold max-md:text-xl">
          Connect with us on <br />
          <span className="text-2xl max-md:text-lg">social media</span>
        </h2>
        <ul className="flex gap-4 cursor-pointer jus">
          <motion.li
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ion-icon
              name="logo-instagram"
              className="w-6 h-6 block bg-white text-[#1170CD]  duration-200 rounded-md "
            ></ion-icon>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ion-icon
              name="logo-twitter"
              className="w-6 h-6 block bg-white text-[#1170CD] duration-200 rounded-md "
            ></ion-icon>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ion-icon
              name="logo-linkedin"
              className="w-6 h-6 block bg-white text-[#1170CD] duration-200 rounded-md"
            ></ion-icon>
          </motion.li>
          <motion.li
            whileHover={{
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            <ion-icon
              name="logo-facebook"
              className="w-6 h-6 block bg-white text-[#1170CD] duration-200 rounded-md"
            ></ion-icon>
          </motion.li>
        </ul>
      </div>
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-2">
          <h2 className="text-3xl font-semibold">Contact us</h2>
          <li>+91 7894561230</li>
          <li>Resume@gmail.com</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
