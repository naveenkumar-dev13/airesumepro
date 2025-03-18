import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { Fix } from "../data";
const ReportAnalysis = () => {
  const [data, setData] = useState({
    overallScore: 90,
    breakdown: [
      { label: "Content", value: 14 },
      { label: "Style", value: 8 },
      { label: "Format", value: 10 },
      { label: "Section", value: 11 },
      { label: "Skills", value: 2 },
    ],
  });

  const [issues, setIssue] = useState({
    contentDetails: {
      needsImprovement: [
        "Lacks quantifiable metrics (e.g., 'Reduced costs by 15%').",
        "Some bullet points are too vague.",
      ],
      recommendations: [
        "Add data-driven results.",
        "Use strong action verbs to showcase impact.",
      ],
    },
    formatDetails: {
      needsImprovement: ["Inconsistent font sizes.", "Poor alignment of text."],
      recommendations: [
        "Use consistent formatting.",
        "Ensure proper alignment.",
      ],
    },
    styleDetails: {
      needsImprovement: ["Overuse of jargon.", "Sentences are too long."],
      recommendations: ["Use simpler language.", "Break down long sentences."],
    },
    sectionDetails: {
      needsImprovement: [
        "Missing key points.",
        "Sections are not clearly defined.",
      ],
      recommendations: [
        "Add missing information.",
        "Use headings for clarity.",
      ],
    },
    skillsDetails: {
      needsImprovement: [
        "Lack of technical terms.",
        "Poor explanation of skills.",
      ],
      recommendations: [
        "Include more technical language.",
        "Provide detailed examples.",
      ],
    },
  });

  const [error, setError] = useState(null);

  const [openSection, setOpenSection] = useState("content");

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? "" : section);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  //   // Fetch data from the backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://your-backend-url.com/score-breakdown');
  //       const data = await response.json();
  //       setScore(data.overallScore);
  //       setBreakdown({
  //         content: data.content,
  //         format: data.format,
  //         style: data.style,
  //         section: data.section,
  //         skills: data.skills
  //       });
  //     } catch (error) {
  //       console.error('Error fetching score breakdown:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  if (error) return <div className="text-red-500">{error}</div>;

  const getOverallScoreColor = (score) => {
    if (score >= 80) return "text-green-400 border-green-400";
    if (score >= 50) return "text-yellow-400 border-yellow-400";
    return "text-red-400 border-red-400";
  };

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-6xl m-auto max-sm:p-4  ">
        <div className="bg-white shadow-[0px_14px_50px_-3px_rgba(0,0,0,0.2)] rounded-xl p-6 max-sm:shadow-none max-sm:p-4 ">
          <div className="flex  gap-16  items-center  max-sm:flex-col ">
            <div className="">
              <div
                className={`w-48 h-48 flex items-center justify-center border-8 rounded-full   ${getOverallScoreColor(
                  data.overallScore
                )}`}
              >
                <div className="text-center">
                  <p
                    className={`text-4xl font-bold ${getOverallScoreColor(
                      data.overallScore
                    )}`}
                  >
                    {data.overallScore}
                  </p>
                  <p className="text-sm text-gray-500">Overall Score</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-6  ">
              <div className="flex items-center  justify-between flex-grow  gap-2 w-full  ">
                <p className="text-2xl font-bold max-sm:hidden">
                  Score BrerakDown
                </p>
                <div className=" max-sm:flex max-sm:justify-center  ">
                  <Button className="  bg-[#1170CD] text-white rounded-xl !p-3 text-lg font-medium hover:bg-[#0E5BAA] transition-colors max-sm:w-80">
                    want to Mock
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8 w-full max-sm:justify-between max-sm:grid-cols-2">
                {data.breakdown.map((item) => (
                  <div
                    key={item.label}
                    className={`  flex items-center  justify-between   rounded-md p-4     ${
                      item.value >= 14
                        ? "bg-[#A9FFD6]"
                        : item.value >= 10
                        ? "bg-[#FFEC9F]"
                        : "bg-red-100"
                    } text-gray-500`}
                  >
                    <p
                      className={` font-semibold ${
                        item.value >= 14
                          ? "text-[#22925c]"
                          : item.value >= 10
                          ? "text-[#af9734]"
                          : "text-red-500"
                      }`}
                    >
                      {item.label}
                    </p>
                    <p
                      className={` font-semibold ${
                        item.value >= 14
                          ? "text-[#22925c]"
                          : item.value >= 10
                          ? "text-[#af9734]"
                          : "text-red-500"
                      }`}
                    >
                      {item.value}
                    </p>
                  </div>
                ))}
                <Button className="  flex items-center gap-2 justify-center  ">
                  <span>
                    <img src={Fix} alt="Fix" />
                  </span>
                  <p className="text-xl max-sm:text-sm">Fix All The Issues</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className=" ">
            {Object.keys(issues).map((issueKey) => (
              <div
                key={issueKey}
                className={`mb-4 bg-white rounded-xl shadow-md border border-gray-200 p-6   ${
                  openSection === issueKey ? "block" : ""
                }`}
                onClick={() => toggleSection(issueKey)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold mb-2 capitalize cursor-pointer">
                    {issueKey.replace("Details", "")}
                  </h3>
                  <div>
                    <span>
                      <ion-icon
                        name={
                          openSection === issueKey
                            ? "chevron-up-outline"
                            : "chevron-down-outline"
                        }
                        className="text-2xl"
                      ></ion-icon>
                    </span>
                  </div>
                </div>
                <div className="">
                  {openSection === issueKey && (
                    <>
                      <div className="mb-2 ">
                        <h4 className="font-medium">Needs Improvement:</h4>
                        <ul className="list-disc list-inside">
                          {issues[issueKey].needsImprovement.map(
                            (item, index) => (
                              <li key={index} className="text-gray-700">
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Recommendations:</h4>
                        <ul className="list-disc list-inside">
                          {issues[issueKey].recommendations.map(
                            (item, index) => (
                              <li key={index} className="text-gray-700">
                                {item}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportAnalysis;
