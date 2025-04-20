import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";

const MockInterview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeText, jobRole, difficulty, score } = location.state || {};

  const [showExitPopup, setShowExitPopup] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [expectedAnswers, setExpectedAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes timer
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [skippedCount, setSkippedCount] = useState(0);
  const [evaluationResults, setEvaluationResults] = useState(null);
  const [skippedQuestions, setSkippedQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!resumeText || !jobRole || !difficulty) {
        navigate("/");
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://airesumeproapi.onrender.com/api/mockinterview",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ resumeText, jobRole, difficulty }),
          }
        );

        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.error || "Failed to fetch interview questions"
          );
        }

        setQuestions(result.questions || []);
        setExpectedAnswers(result.expectedAnswers || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [resumeText, jobRole, difficulty, navigate]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0) {
      evaluateAnswers();
    }
  }, [timeLeft]);

  const handleAnswerChange = (e) => {
    setAnswers({ ...answers, [currentQuestionIndex]: e.target.value });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      evaluateAnswers();
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

  const evaluateAnswers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const decoded = jwtDecode(token);
      const userEmail = decoded.email;

      // Track skipped questions
      const skippedIndices = Object.entries(answers)
        .filter(([_, answer]) => answer === "Skipped")
        .map(([index]) => parseInt(index));
      setSkippedQuestions(skippedIndices);

      const response = await fetch(
        "https://airesumeproapi.onrender.com/api/evaluate-answers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: userEmail,
            questions,
            answers: Object.values(answers),
            expectedAnswers,
            jobRole,
            skippedCount,
            skippedQuestions: skippedIndices,
            score,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to evaluate answers");
      }

      const formattedResults = {
        correctCount: result.correctCount || 0,
        wrongCount: result.wrongCount || 0,
        evaluation: Array.isArray(result.evaluation) ? result.evaluation : [],
        feedback: result.feedback || "No feedback provided",
        skippedCount: skippedIndices.length,
      };

      setEvaluationResults(formattedResults);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading && questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
          <Button
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => navigate("/analysisReport")}
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (evaluationResults) {
    return (
      <div className="h-screen">
        <NavBar />
        <div className="p-6 max-w-6xl m-auto flex flex-col gap-4">
          <div className="shadow-md p-4 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-center max-md:text-2xl">
                Interview Results
              </h1>
              <p className="text-center font-semibold text-xl bg-[#1170CD] text-white px-4 py-2 rounded-md max-md:text-sm">
                Total Questions: {questions.length}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-8 max-md:grid-cols-2 max-md:mb-0 ">
              <div className="bg-green-100 p-4 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Correct Answers</h3>
                <p className="text-4xl font-bold text-green-600">
                  {evaluationResults.correctCount}
                </p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Wrong Answers</h3>
                <p className="text-4xl font-bold text-red-600">
                  {evaluationResults.wrongCount}
                </p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Skipped Questions</h3>
                <p className="text-4xl font-bold text-yellow-600">
                  {evaluationResults.skippedCount}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg text-center">
                <h3 className="text-xl font-semibold">Score Percentage</h3>
                <p className="text-4xl font-bold text-blue-600">
                  {(
                    (evaluationResults.correctCount / questions.length) *
                    100
                  ).toFixed(0)}
                  %
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => {
              const userAnswer = answers[index] || "Not answered";
              const isSkipped = userAnswer === "Skipped";
              const evaluationText = isSkipped
                ? "Question was skipped"
                : evaluationResults.evaluation[index] || "";

              const isCorrect =
                !isSkipped &&
                (/correct/i.test(evaluationText) ||
                  /similar/i.test(evaluationText) ||
                  /close enough/i.test(evaluationText) ||
                  /mostly right/i.test(evaluationText) ||
                  userAnswer
                    .toLowerCase()
                    .includes(
                      expectedAnswers[index].toLowerCase().split(" ")[0]
                    ) ||
                  expectedAnswers[index]
                    .toLowerCase()
                    .split(" ")
                    .some((word) => userAnswer.toLowerCase().includes(word)));

              return (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="text-xl font-semibold mb-2">
                    Q{index + 1}: {question}
                  </h3>
                  <p className="mb-2">
                    <strong>Your Answer:</strong> {userAnswer}
                  </p>
                  {!isSkipped && (
                    <p className="mb-2">
                      <strong>Expected Answer:</strong> {expectedAnswers[index]}
                    </p>
                  )}
                  <div
                    className={`p-3 rounded ${
                      isSkipped
                        ? "bg-[#F5F5F5]"
                        : isCorrect
                        ? "bg-[#A9FFD6]"
                        : "bg-[#FFD6D6]"
                    }`}
                  >
                    <p
                      className={
                        isSkipped
                          ? "text-[#333333]"
                          : isCorrect
                          ? "text-[#008000]"
                          : "text-[#FF0000]"
                      }
                    >
                      <strong>
                        {isSkipped
                          ? "↻ Skipped"
                          : isCorrect
                          ? "✓ Correct"
                          : "✗ Wrong"}
                      </strong>
                      {isCorrect && !/correct/i.test(evaluationText) && (
                        <span className="ml-2 text-sm">
                          (Accepted as correct)
                        </span>
                      )}
                    </p>
                    {!isSkipped && (
                      <p>
                        {evaluationText.split("Evaluation:")[1]?.trim() ||
                          evaluationText}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600"
              onClick={() => navigate("/analysisReport")}
            >
              Try Another Interview
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar onExit={handleExit} />
      <div className="p-6 max-w-6xl m-auto h-[90vh] flex flex-col justify-center my-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="mb-2">
            {timeLeft > 0 ? (
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
              className="my-4 shadow-md p-4 rounded-xl h-24 flex items-center"
              style={{ boxShadow: "0px 0px 10px 0px rgb(186, 213, 238)" }}
            >
              <p className="font-normal text-xl">
                {questions[currentQuestionIndex]}
              </p>
            </div>
            <div className="my-4 shadow-xl p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <p className="text-xl">Your Answer</p>
                <Button
                  className="px-6 py-2 hover:!bg-[#1170CD] hover:!text-white !bg-white !text-[#1170CD] border rounded w-fit transition"
                  onClick={() => {
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestionIndex]: "Skipped",
                    }));
                    setSkippedCount((prev) => prev + 1);
                    nextQuestion();
                  }}
                >
                  Skip
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
                  className="px-4 py-2 bg-[#1170CD] text-white rounded-full max-md:px-6 disabled:opacity-50 max-md:text-sm"
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0 || timeLeft === 0}
                >
                  Previous
                </Button>
                <Button
                  className="px-4 py-2 bg-[#1170CD] text-white rounded-full max-md:px-6 disabled:opacity-50 max-md:text-sm"
                  onClick={nextQuestion}
                  disabled={
                    currentQuestionIndex >= questions.length - 1 ||
                    timeLeft === 0 ||
                    !answers[currentQuestionIndex] ||
                    answers[currentQuestionIndex].trim() === ""
                  }
                >
                  {currentQuestionIndex >= questions.length - 1
                    ? "Submit"
                    : "Next"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {timeLeft === 0 && !evaluationResults && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1170CD] p-6 rounded-2xl shadow-lg w-96 relative mx-2">
            <p className="text-3xl font-bold text-white">Time is up!</p>
            <p className="text-xl text-white">
              Your answers are being evaluated...
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default MockInterview;
