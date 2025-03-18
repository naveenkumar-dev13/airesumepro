import React, { useEffect, useState } from "react";

const InterviewResult = () => {
  const questionsAndAnswers = [
    {
      text: "What is the capital of France?",
      userAnswer: "Paris",
      correctAnswer: "Paris",
      correct: true,
    },
    {
      text: "What is the square root of 16?",
      userAnswer: "5",
      correctAnswer: "4",
      correct: false,
    },
    {
      text: "What is the chemical symbol for water?",
      userAnswer: "H2O",
      correctAnswer: "H2O",
      correct: true,
    },
    {
      text: "Who wrote 'Romeo and Juliet'?",
      userAnswer: "Shakespeare",
      correctAnswer: "William Shakespeare",
      correct: true,
    },
    {
      text: "What is the largest planet in our solar system?",
      userAnswer: "Saturn",
      correctAnswer: "Jupiter",
      correct: false,
    },
    {
      text: "What is the boiling point of water in Celsius?",
      userAnswer: "100",
      correctAnswer: "100",
      correct: true,
    },
    {
      text: "Who painted the Mona Lisa?",
      userAnswer: "Da Vinci",
      correctAnswer: "Leonardo da Vinci",
      correct: true,
    },
    {
      text: "What is the primary language spoken in Brazil?",
      userAnswer: "Spanish",
      correctAnswer: "Portuguese",
      correct: false,
    },
    {
      text: "What is the fastest land animal?",
      userAnswer: "Cheetah",
      correctAnswer: "Cheetah",
      correct: true,
    },
    {
      text: "What is the currency of Japan?",
      userAnswer: "Yen",
      correctAnswer: "Yen",
      correct: true,
    },
    {
      text: "What is the currency of Japan?",
      userAnswer: "Yen",
      correctAnswer: "Yen",
      correct: true,
    },
    {
      text: "What is the currency of Japan?",
      userAnswer: "Yen",
      correctAnswer: "Yen",
      correct: true,
    },
    {
      text: "What is the currency of Japan?",
      userAnswer: "Yen",
      correctAnswer: "Yen",
      correct: true,
    },
    {
      text: "What is the currency of Japan?",
      userAnswer: "Yen",
      correctAnswer: "Yen",
      correct: true,
    },
  ];
  // const [questionsAndAnswers, setQuestionsAndAnswers] = useState([]);
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
  //   return <div className="text-center text-xl mt-10">Loading...</div>;
  // }

  // if (error) {
  //   return <div className="text-center text-red-600 mt-10">Error: {error}</div>;
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
    <div className=" h-screen p-6 font-sans  my-10 ">
      <div className="max-w-7xl mx-auto  shadow-[-1px_-1px_23px_7px_rgba(0,0,0,0.32)] p-4 rounded-lg ">
        <h2 className="text-2xl font-bold">Interview Result</h2>

        <div className="grid grid-cols-4 gap-4  p-4 rounded-lg mb-6 text-center max-md:grid-cols-2 shadow-md ">
          <div className="bg-gray-300 p-3 rounded   max-sm:text-sm">
            Skipped
            <br />
            <span className="text-xl font-semibold">0</span>
          </div>
          <div className="bg-green-100 p-3 ma rounded max-sm:text-sm">
            Correct
            <br />
            <span className="text-xl font-semibold text-green-600">
              {correctAnswers}
            </span>
          </div>
          <div className="bg-red-100 p-3 rounded max-sm:text-sm">
            Wrong
            <br />
            <span className="text-xl font-semibold text-red-600">
              {wrongAnswers}
            </span>
          </div>

          <div className="bg-gray-100 p-3 rounded max-sm:text-sm">
            Score
            <br />
            <span className="text-xl font-semibold text-blue-600">
              {score}%
            </span>
          </div>
        </div>

        {currentQuestions.map((qa, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-lg shadow-md mb-4 border border-gray-200 max-sm:p-2.5"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold">
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
            <p className="text-gray-700 mt-2 font-bold max-sm:text-sm">
              {qa.text}
            </p>
            <div className="bg-gray-100 p-3 rounded-lg mt-3 max-sm:p-2 ">
              {qa.userAnswer}
            </div>
            <div
              className={
                qa.correct
                  ? "bg-green-100 p-3 mt-3 rounded-lg max-sm:p-2"
                  : "bg-red-100 p-3 mt-3 rounded-lg max-sm:p-2"
              }
            >
              {qa.correctAnswer}
            </div>
          </div>
        ))}

        <div className="flex justify-between items-center mt-6 space-x-2 text-gray-600 max-w-4xl mx-auto">
          <button
            className={`px-4 py-2 border rounded  max-sm:px-2 max-sm:text-sm  ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <div className="space-x-4 max-md:space-x-1 hidden">
            {[...Array(totalPages)].map((_, i) => (
              <span
                key={i}
                className={`px-4 py-2  md:inline-block max-sm:px-2 max-sm:text-sm $  ${
                  currentPage === i + 1 ? "bg-[#1170CD] text-white rounded" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <button
            className={`px-4 py-2 border rounded max-sm:px-2 max-sm:text-sm ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default InterviewResult;
