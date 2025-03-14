import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
function AboutUsSection() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex flex-col gap-6 py-16 max-sm:py-8  bg-[#1170CD] ">
        <h2
          className="text-center text-5xl max-sm:text-2xl font-bold m-10 max-sm:m-4 tracking-tight text-white "
          data-aos="fade-right"
        >
          Join 10,000+ professionals using AI to improve their resumes and
          interview skills!
        </h2>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          data-aos="fade-left"
        >
          <Button
            className="!text-black bg-white rounded-md block mx-auto  !w-fit  hover:!text-white "
            onClick={() => navigate("/login")}
          >
            Let’s get started
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutUsSection;
