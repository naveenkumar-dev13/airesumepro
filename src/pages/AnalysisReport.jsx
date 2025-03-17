import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
const ReportAnalysis = () => {
  const [data, setData] = useState({
    overallScore: 90,
    breakdown: [
      { label: "Content", value: 14, color: "bg-yellow-300" },
      { label: "Style", value: 14, color: "bg-red-400" },
      { label: "Format", value: 14, color: "bg-green-300" },
      { label: "Section", value: 14, color: "bg-yellow-300" },
      { label: "Skills", value: 14, color: "bg-yellow-300" },
    ],
  });

  const [error, setError] = useState(null);

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

  if (error) return <div className="text-red-500">{error}</div>;

  const getOverallScoreColor = (score) => {
    if (score >= 80) return "text-green-400 border-green-400";
    if (score >= 50) return "text-yellow-400 border-yellow-400";
    return "text-red-400 border-red-400";
  };

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-6xl m-auto  ">
        <div className="bg-white shadow-lg rounded-xl p-6 ">
          <div className="flex items-center gap-6 bg-red-50">
            <div
              className={`w-48 h-48 flex items-center justify-center border-8 rounded-full  ${getOverallScoreColor(
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
            <div className=" grid grid-cols-3 gap-2  w-full ">
              {data.breakdown.map((item) => (
                <div
                  key={item.label}
                  className={` flex   items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold text-gray-800 ${item.color}`}
                >
                  {item.label} {item.value}
                </div>
              ))}
              <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 w-full">
                ⚒ Fix All The Issues
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportAnalysis;
