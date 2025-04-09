import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loading from "../components/Loading";

const MockInterview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { resumeText, jobRole, difficulty } = location.state || {};

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

  // Fetch questions from API when component mounts
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

        setLoading(true);
        setError("");

        const response = await fetch(
          "https://airesumeproapi.onrender.com/api/mockinterview",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              resumeText,
              jobRole,
              difficulty,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            errorData.message || "Failed to fetch interview questions"
          );
        }

        const result = await response.json();

        if (!result.questions || !result.expectedAnswers) {
          throw new Error("Invalid response format from server");
        }

        setQuestions(result.questions);
        setExpectedAnswers(result.expectedAnswers);
      } catch (err) {
        console.error("API Error:", err);
        setError(err.message || "An error occurred while fetching questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [resumeText, jobRole, difficulty, navigate]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && questions.length > 0 && !evaluationResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0 && !evaluationResults) {
      evaluateAnswers();
    }
  }, [timeLeft, questions, evaluationResults]);

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

  const progress =
    questions.length > 0
      ? ((currentQuestionIndex + 1) / questions.length) * 100
      : 0;

  const handleExit = () => {
    setShowExitPopup(true);
  };

  const handleConfirmExit = () => {
    navigate("/dashboard");
  };

  const handleCancelExit = () => {
    setShowExitPopup(false);
  };

  const evaluateAnswers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const decoded = jwtDecode(token);
      const userEmail = decoded.email;

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
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to evaluate answers");
      }

      const result = await response.json();
      setEvaluationResults(result);
    } catch (err) {
      console.error("Evaluation Error:", err);
      setError(err.message || "An error occurred during evaluation");
    } finally {
      setLoading(false);
    }
  };

  if (loading && questions.length === 0) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <Button
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
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
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="p-6 max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">
            Interview Results
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 p-4 rounded-lg text-center border border-green-200">
              <h3 className="text-xl font-semibold">Correct Answers</h3>
              <p className="text-4xl font-bold text-green-600">
                {evaluationResults.correctCount || 0}
              </p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
              <h3 className="text-xl font-semibold">Wrong Answers</h3>
              <p className="text-4xl font-bold text-red-600">
                {evaluationResults.wrongCount || 0}
              </p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-200">
              <h3 className="text-xl font-semibold">Skipped Questions</h3>
              <p className="text-4xl font-bold text-yellow-600">
                {skippedCount}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {questions.map((question, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-white"
              >
                <h3 className="text-xl font-semibold mb-2">
                  Q{index + 1}: {question}
                </h3>
                <p className="mb-2">
                  <strong>Your Answer:</strong>{" "}
                  {answers[index] || "Not answered"}
                </p>
                <p className="mb-2">
                  <strong>Expected Answer:</strong> {expectedAnswers[index]}
                </p>
                <div
                  className={`p-3 rounded ${
                    evaluationResults.evaluation?.[index]?.includes("Correct")
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <p className="font-semibold">
                    {evaluationResults.evaluation?.[index]?.includes("Correct")
                      ? "✓ Correct"
                      : "✗ Wrong"}
                  </p>
                  <p>{evaluationResults.evaluation?.[index]}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
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
      <div className="p-6 max-w-6xl mx-auto min-h-[90vh] flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="bg-blue-500 text-white px-3 py-1 rounded-lg">
            {timeLeft > 0
              ? `${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                  .toString()
                  .padStart(2, "0")}`
              : "Time's Up"}
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {questions.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-xl font-medium text-gray-800">
                {questions[currentQuestionIndex]}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-medium">Your Answer</p>
                <Button
                  className="px-4 py-2 border border-blue-500 text-blue-500 hover:bg-blue-50 rounded-lg"
                  onClick={() => {
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestionIndex]: "Skipped",
                    }));
                    setSkippedCount((prev) => prev + 1);
                    nextQuestion();
                  }}
                >
                  Skip Question
                </Button>
              </div>

              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Type your answer here..."
                rows="5"
                value={answers[currentQuestionIndex] || ""}
                onChange={handleAnswerChange}
              />

              <div className="flex justify-between pt-4">
                <Button
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg disabled:opacity-50"
                  onClick={previousQuestion}
                  disabled={currentQuestionIndex === 0 || timeLeft === 0}
                >
                  Previous
                </Button>
                <Button
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
                  onClick={nextQuestion}
                  disabled={timeLeft === 0}
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

      {/* Exit Confirmation Popup */}
      {showExitPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <svg
                className="w-6 h-6 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-bold text-gray-800">
                Exit Interview?
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to exit? All your progress will be lost.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancelExit}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time's Up Popup */}
      {timeLeft === 0 && !evaluationResults && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-blue-500 text-white p-6 rounded-xl shadow-lg max-w-sm mx-4 text-center">
            <h3 className="text-2xl font-bold mb-2">Time's Up!</h3>
            <p className="text-lg">Your answers are being evaluated...</p>
            <div className="mt-4 flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MockInterview;
