import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FeaturesSection from "../components/FeaturesSection";
import AnalysisSection from "../components/AnalysisSection";
import AboutUsSection from "../components/AboutUsSection";
import HowItWorksSection from "../components/HowItWorksSection";
import { div } from "motion/react-client";
function HomePage() {
 
  return (
    <div>
      <NavBar />
      
          <Header />
          <FeaturesSection />
          <AnalysisSection />
          <HowItWorksSection />
          <AboutUsSection />
          <Footer />
     
    </div>
  );
}

export default HomePage;
