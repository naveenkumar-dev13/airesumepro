import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import AnalyseReportPopup from "../components/AnalysisReportPop";

const ResumeAnalysis = () => {
  const [isopen, setIsopen] = useState(false);
  const [issues, setIssues] = useState([
    {
      category: "Content",
      issue: "No clear introduction about skills and experience.",
      fix: "Add a 2-3 sentence summary highlighting expertise and career goals.",
    },
    {
      category: "Format",
      issue: "Uses excessive colors, graphics, & inconsistent fonts.",
      fix: "Stick to a clean, ATS-friendly layout with standard fonts (Arial, Calibri).",
    },
    {
      category: "Sections",
      issue: "Lacks Skills, Projects, & Certifications, making it incomplete.",
      fix: "Add dedicated sections for Technical Skills, Personal Projects, & Achievements.",
    },
    {
      category: "Skills",
      issue:
        "Skills are hidden within other sections, making them hard to find.",
      fix: "Create a dedicated Skills section with technical & soft skills.",
    },
    {
      category: "Style",
      issue:
        "Uses different fonts & alignments, making it look unprofessional.",
      fix: "Maintain uniform font sizes (11-12pt) & align sections properly.",
    },
  ]);
  const [scores, setScores] = useState([
    {
      label: "Content",
      score: 23,
      total: 25,
      color: "bg-green-600",
      text: "text-green-600",
    },
    {
      label: "Section",
      score: 6,
      total: 25,
      color: "bg-red-600",
      text: "text-red-600",
    },
    {
      label: "Skills",
      score: 15,
      total: 25,
      color: "bg-yellow-600",
      text: "text-yellow-600",
    },
    {
      label: "Style",
      score: 6,
      total: 25,
      color: "bg-red-600",
      text: "text-red-600",
    },

    {
      label: "Format",
      score: 6,
      total: 25,
      color: "bg-red-600",
      text: "text-red-600",
    },
  ]);

  // useEffect(() => {
  //   fetch("https://your-api-endpoint.com/resume-analysis")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setScores(data.scores);
  //       setIssues(data.issues);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);
  return (
    <>
      <NavBar />
      <div className="w-full  max-w-7xl  p-4 bg-white rounded-2xl shadow-xl border border-gray-200 mt-10 max-md:h-auto  max-lg:w-[90%] mx-auto">
        <div className="flex items-center justify-between max-md:border-b max-md:pb-2 max-md:gap-2">
          <h2 className="text-3xl  max-md:text-xs max-md:text-center font-semibold">
            Resume Analysis Score
          </h2>
          <div className="space-x-4 max-md:flex max-sm:space-x-2 ">
            <button
              className="text-white bg-[#1170CD] p-2 rounded-md max-md:text-[12px] max-md:p-2 "
              onClick={() => setIsopen(true)}
            >
              Start the Test
            </button>
            <button className="text-white bg-[#1170CD] p-2 rounded-md max-md:flex max-md:items-center max-md:p-1 ">
              <span>⭐</span> 25/100
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8 max-md:grid-cols-1">
          {scores.map(({ label, score, total, color, text }) => (
            <div className="bg-gray-200/50 p-4 rounded-lg" key={label}>
              <div className="flex items-center justify-between ">
                <h3 className="text-lg font-semibold">{label}</h3>
                <p className={`font-semibold ${text}`}>
                  {score}/{total}
                </p>
              </div>
              <div className="w-full bg-gray-200 h-2.5 my-2 rounded-full border border-black">
                <div
                  className={`h-2 rounded-full ${color} `}
                  style={{ width: `${(score / total) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
          <button className="w-full bg-[#1170CD] text-white py-2 rounded-lg hover:bg-[#0E5BAA]  font-semibold   transition-all duration-300  text-3xl max-md:text-sm max-md:w-1/2 mx-auto max-md:flex max-md:items-center max-md:justify-center max-md:gap-2">
            <span>
              <ion-icon
                name="brush-outline"
                className="w-6 h-6  mt-2  max-md:w-4 max-md:h-4 font-semibold"
              ></ion-icon>
            </span>
            Fix All Issues
          </button>
        </div>
      </div>
      <div className="w-full  max-w-7xl mx-auto p-4 ">
        {issues.map(({ category, issue, fix }) => (
          <div key={category} className="mt-4 p-4 shadow-md rounded-lg">
            <h3 className="font-bold text-lg">{category}</h3>
            <p>
              <strong>Issue:</strong> {issue}
            </p>
            <p>
              <strong>Fix:</strong> {fix}
            </p>
          </div>
        ))}
        {isopen && <AnalyseReportPopup setIsopen={setIsopen} />}
      </div>
    </>
  );
};

export default ResumeAnalysis;
