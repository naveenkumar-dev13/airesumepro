import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const MockInterview = () => {
  const navigate = useNavigate();
  const [showExitPopup, setShowExitPopup] = useState(false);
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
  const [timeLeft, setTimeLeft] = useState(10);

  // useEffect(() => {
  //   fetch("mock-interview-questions")
  //     .then((response) => response.json())
  //     .then((data) => setQuestions(data))
  //     .catch((error) => console.error("Error fetching questions:", error));
  // }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  // Add protection against browser navigation/refresh
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
      setShowExitPopup(true);
      return "";
    };

    // Handle browser back button
    //   const handlePopState = (e) => {
    //     e.preventDefault();
    //     setShowExitPopup(true);
    //   };

    //   window.addEventListener('beforeunload', handleBeforeUnload);
    //   window.addEventListener('popstate', handlePopState);

    //   return () => {
    //     window.removeEventListener('beforeunload', handleBeforeUnload);
    //     window.removeEventListener("popstate", handlePopState);
    //   };
  }, []);

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

  const handleExit = () => {
    setShowExitPopup(true);
  };

  const handleConfirmExit = () => {
    navigate("/dashboard");
  };

  const handleCancelExit = () => {
    setShowExitPopup(false);
  };

  return (
    <>
      <NavBar onExit={handleExit} />
      <div className="p-6 max-w-6xl m-auto h-[90vh] flex  flex-col justify-center my-auto">
        <div className="flex  items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
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
              <p className="font-normal text-xl">
                {questions[currentQuestionIndex].text}
              </p>
            </div>
            <div className="my-4 shadow-xl p-4 rounded-2xl box-shadow   ">
              <div className="flex justify-between items-center mb-4">
                <p
                  className="text-xl
                "
                >
                  Your Answer
                </p>

                <Button
                  className={
                    "px-6 py-2 hover:!bg-[#1170CD] hover:!text-white !bg-white !text-[#1170CD] border rounded w-fit transition "
                  }
                  onClick={() => {
                    setAnswers((prevAnswers) => ({
                      ...prevAnswers,
                      [currentQuestionIndex]: "Skipped",
                    }));
                    nextQuestion();
                  }}
                >
                  skip
                </Button>
              </div>
              <textarea
                className="w-full p-2 border border-gray-600 rounded-lg mb-4 focus:outline-none text-stone-600"
                placeholder="Type your answer here..."
                rows="4"
                value={answers[currentQuestionIndex] || ""}
                onChange={handleAnswerChange}
              />
              <div className="flex justify-between">
                <Button
                  className="px-4 py-2 bg-[#1170CD] text-white rounded-full max-md:px-6 disabled:opacity-50  max-md:text-sm"
                  onClick={previousQuestion}
                  disabled={
                    currentQuestionIndex >= questions.length - 1 ||
                    timeLeft === 0
                  }
                >
                  Previous
                </Button>
                <Button
                  className="px-4 py-2 bg-[#1170CD] text-white rounded-full max-md:px-6 disabled:opacity-50  max-md:text-sm"
                  onClick={nextQuestion}
                  disabled={
                    currentQuestionIndex >= questions.length - 1 ||
                    timeLeft === 0
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exit Confirmation Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] mx-4 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-icons-outlined text-red-500 text-2xl">
                warning
              </span>
              <h2 className="text-2xl font-bold text-gray-800">
                Exit Interview?
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to exit? All your progress will be lost and
              cannot be recovered.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancelExit}
                className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="px-6 py-2 text-white bg-[#1170CD] rounded-lg hover:bg-[#0E5BAA] transition-colors"
              >
                Exit Interview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Existing Time's Up Popup */}
      {timeLeft === 0 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
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
