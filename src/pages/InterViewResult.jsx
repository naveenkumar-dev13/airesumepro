import React, { useEffect, useState } from "react";
import { questions } from "../data";
import NavBar from "../components/NavBar";

const InterviewResult = () => {
  const [questionsAndAnswers, setQuestionsAndAnswers] = useState(questions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 2;

  // useEffect(() => {
  //   fetch("https://your-backend-api.com/results")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // setQuestionsAndAnswers(data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setError(err.message);
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="text-center text-xl mt-10 flex items-center justify-center h-screen">
  //       <Loading />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="text-center text-red-600 mt-10 animate-pulse  flex items-center justify-center h-screen">
  //       Error: {error}
  //     </div>
  //   );
  // }

  const totalQuestions = questionsAndAnswers.length;
  const correctAnswers = questionsAndAnswers.filter((q) => q.correct).length;
  const wrongAnswers = totalQuestions - correctAnswers;
  const score = Math.round((correctAnswers / totalQuestions) * 100);

  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionsAndAnswers.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  return (
    <>
      <NavBar />
      <div className=" h-screen p-6 font-sans  my-5 bg-white ">
        <div className="max-w-6xl mx-auto  rounded-lg  flex flex-col gap-6 ">
          {/*  */}
          <div className=" shadow-[-1px_-1px_13px_7px_rgba(0,0,0,0.1)] p-6 rounded-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold max-sm:text-lg">
                Interview Result
              </h2>
              <p className="bg-[#1170CD] text-white p-2 rounded-xl max-sm:text-center">
                TotalQuestions <strong>{totalQuestions + 1}</strong>
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4  p-4 rounded-lg mb-6 text-center max-md:grid-cols-2  justify-between ">
              <div className="bg-gray-300 p-3 rounded-2xl    max-sm:text-sm">
                Skipped
                <br />
                <span className="text-xl font-semibold">0</span>
              </div>
              <div className="bg-[#ACE293] p-3 ma rounded-2xl  max-sm:text-sm">
                Correct
                <br />
                <span className="text-xl font-semibold text-green-600">
                  {correctAnswers}
                </span>
              </div>
              <div className="bg-[#F5E9E9] p-3 rounded-2xl  max-sm:text-sm ">
                Wrong
                <br />
                <span className="text-xl font-semibold text-red-600">
                  {wrongAnswers}
                </span>
              </div>
              <div className="bg-[#BCD6EF] p-3 rounded-2xl  max-sm:text-sm">
                Score
                <br />
                <span className="text-xl font-semibold text-blue-600">
                  {score}%
                </span>
              </div>
            </div>
          </div>
          {currentQuestions.map((qa, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl shadow-md  border border-gray-200 max-sm:p-2.5"
            >
              <div className="flex justify-between items-center">
                <p className="font-semibold text-xl">
                  Question {indexOfFirstQuestion + index + 1}
                </p>
                <span
                  className={
                    qa.correct
                      ? "text-green-600 bg-green-300 p-2 rounded-lg font-semibold"
                      : "text-red-600 bg-red-300 p-2 rounded-lg font-semibold"
                  }
                >
                  {qa.correct ? "Correct" : "Incorrect"}
                </span>
              </div>
              <p className="text-gray-700 mt-2 font-semibold max-sm:text-sm">
                {qa.text}
              </p>
              <div className="bg-gray-100 p-3 rounded-lg mt-3 max-sm:p-2 ">
                {qa.userAnswer}
              </div>
              <div
                className={
                  qa.correct
                    ? "bg-[#EAF8E4] p-3 mt-3 rounded-lg max-sm:p-2"
                    : "bg-[#F5E9E9] p-3 mt-3 rounded-lg max-sm:p-2"
                }
              >
                {qa.correctAnswer}
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6 space-x-2 text-gray-600 max-w-6xl ">
            <button
              className={`px-4 py-2 border rounded  max-sm:px-2 max-sm:text-sm  flex items-center ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <div className="flex items-center gap-1 justify-center">
                <span>
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </span>
                Previous
              </div>
            </button>
            <div className="space-x-4 max-md:space-x-1 hidden">
              {[...Array(totalPages)].map((_, i) => (
                <span
                  key={i}
                  className={`px-4 py-2  md:inline-block max-sm:px-2 max-sm:text-sm $  ${
                    currentPage === i + 1
                      ? "bg-[#1170CD] text-white rounded"
                      : ""
                  }`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
            </div>
            <button
              className={`px-4 py-2 border rounded max-sm:px-2 max-sm:text-sm  ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <div className="flex items-center gap-1 justify-center">
                <p> Next</p>
                <span>
                  <ion-icon
                    name="chevron-forward-outline"
                    className="w-5 h-5"
                  ></ion-icon>
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InterviewResult;
