import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import DashBoard from "./pages/DashBoard";
import AnalysisReport from "./pages/AnalysisReport";
import MockInterview from "./pages/MockInterView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-resume" element={<ResumeAnalyzer />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/analysisReport" element={<AnalysisReport />} />
        <Route path="/mockinterview" element={<MockInterview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
