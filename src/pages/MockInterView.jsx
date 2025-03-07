import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

const MockInterview = () => {
  const [questions, setQuestions] = useState([
    { text: "What is React, and how does it work?" },
    { text: "Explain the difference between state and props in React." },
    { text: "What are React hooks, and why are they useful?" },
    { text: "How does the virtual DOM improve performance in React?" },
    { text: "How does the virtual DOM improve performance in React?" },
    { text: "How does the virtual DOM improve performance in React?" },
    { text: "How does the virtual DOM improve performance in React?" },
    { text: "How does the virtual DOM improve performance in React?" },
    { text: "How does the virtual DOM improve performance in React?" },
    {
      text: "Describe the use of the useEffect hook in functional components.",
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    fetch("mock-interview-questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentQuestionIndex]: e.target.value });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-6xl m-auto h-[90vh] flex  flex-col justify-center my-auto">
        <div className="flex  items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">
            Mock Interview - Question {currentQuestionIndex + 1} of
            {questions.length}
          </h2>
          <div className="mb-2 ">
            {timeLeft ? (
              <span className="bg-[#1170CD] text-white px-2 py-1 rounded-[10px]">
                {Math.floor(timeLeft / 60)}:
                {(timeLeft % 60).toString().padStart(2, "0")}
              </span>
            ) : (
              <span className="bg-[#1170CD] text-white px-2 py-1 rounded-[10px]">
                Time's Up
              </span>
            )}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-[#1170CD] h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {questions.length > 0 && (
          <div>
            <div
              className="my-4 shadow-md p-4 rounded-xl  h-24 flex items-center  "
              style={{ boxShadow: "0px 0px 10px 0px rgb(186, 213, 238)" }}
            >
              <p className="font-normal text-3xl">
                {questions[currentQuestionIndex].text}
              </p>
            </div>
            <div className="my-4 shadow-xl p-4 rounded-2xl   ">
              <div className="flex justify-between items-center mb-4">
                <p>Answer</p>
                <Button
                  className={
                    "px-6 py-2 hover:!bg-[#1170CD] hover:!text-white !bg-white !text-[#1170CD] border rounded w-fit transition"
                  }
                >
                  skip
                </Button>
              </div>
              <textarea
                className="w-full p-2 border rounded mb-4"
                rows="4"
                value={answers[currentQuestionIndex] || ""}
                onChange={handleAnswerChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-[#1170CD] text-white rounded disabled:opacity-50"
                onClick={previousQuestion}
                disabled={
                  currentQuestionIndex >= questions.length - 1 || timeLeft === 0
                }
              >
                Previous Question
              </button>
              <button
                className="px-4 py-2 bg-[#1170CD] text-white rounded disabled:opacity-50"
                onClick={nextQuestion}
                disabled={
                  currentQuestionIndex >= questions.length - 1 || timeLeft === 0
                }
              >
                Next Question
              </button>
            </div>
          </div>
        )}
      </div>
      {timeLeft === 0 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50 ">
          <div className="bg-[#1170CD] p-6 rounded-2xl shadow-lg w-96 relative mx-2">
            <p className="text-3xl font-bold text-white">Time is up!</p>
            <p className="text-xl text-white">
              Your answers have been submitted.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MockInterview;
