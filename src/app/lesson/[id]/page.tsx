"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getLesson } from "../../../lib/fetchLessons";
import { use } from "react";
import Link from "next/link";

interface Lesson {
  id: string;
  title: string;
  content: string;
  reward: number;
  question: {
    prompt: string;
    options: string[];
    answer: number;
  };
  isLocked: boolean;
}

interface Notification {
  type: "success" | "error";
  message: string;
  reward?: number;
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const lessonData = await getLesson(id);
        setLesson(lessonData);
      } catch (error) {
        console.error("Error fetching lesson:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();
  }, [id]);

  const showNotification = (notif: Notification) => {
    setNotification(notif);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAnswerSubmit = (selectedOption: number | null) => {
    if (selectedOption === null) return;

    const isCorrect = selectedOption === lesson?.question.answer;

    if (isCorrect) {
      showNotification({
        type: "success",
        message: "Correct answer!",
        reward: lesson?.reward,
      });
      // Here you would typically update user's balance
      // updateUserBalance(lesson.reward);
    } else {
      showNotification({
        type: "error",
        message: "Incorrect answer. Try again!",
      });
    }

    // Call the success callback
    console.log("Answer submitted:", selectedOption, "Correct:", isCorrect);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Lesson not found
          </h1>
          <Link href="/" className="text-purple-600 hover:text-purple-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      {/* Notification Popup */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 transform w-3/4 transition-all duration-300 ${
            notification
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <div
            className={`flex items-center p-4 rounded-lg shadow-lg border-l-4 ${
              notification.type === "success"
                ? "bg-green-100 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-400 dark:text-green-200"
                : "bg-red-100 border-red-500 text-red-700 dark:bg-red-900 dark:border-red-400 dark:text-red-200"
            }`}
          >
            <div className="flex-1">
              <p className="font-medium">{notification.message}</p>
              {notification.reward && (
                <p className="text-sm mt-1">
                  +{notification.reward} G$ rewarded!
                </p>
              )}
            </div>
            <button
              onClick={() => setNotification(null)}
              className="ml-4 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            +{lesson.reward} G$ Reward
          </div>
        </div>

        {/* Lesson Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {lesson.title}
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lesson.content }}
            />
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-6">
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg mr-4">
              <svg
                className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Quick Check
            </h2>
          </div>

          <QuizQuestion
            question={lesson.question}
            reward={lesson.reward}
            onSuccess={handleAnswerSubmit}
          />
        </div>
      </div>
    </div>
  );
}

function QuizQuestion({
  question,
  reward,
  onSuccess,
}: {
  question: { prompt: string; options: string[]; answer: number };
  reward: number;
  onSuccess: (selectedOption: number | null) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter(); // Add this import

  const handleSubmit = () => {
    setSubmitted(true);
    const correct = selected === question.answer;
    setIsCorrect(correct);
    onSuccess(selected);
  };

  const getOptionStyle = (index: number) => {
    if (!submitted) {
      return selected === index
        ? "bg-purple-100 border-purple-500 dark:bg-purple-900 dark:border-purple-400"
        : "hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600";
    }

    if (index === question.answer) {
      return "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400";
    }

    if (selected === index && selected !== question.answer) {
      return "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400";
    }

    return "border-gray-200 dark:border-gray-600";
  };

  return (
    <div>
      <p className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        {question.prompt}
      </p>

      <div className="space-y-3 mb-6">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !submitted && setSelected(i)}
            disabled={submitted}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${getOptionStyle(
              i
            )} ${!submitted ? "cursor-pointer" : "cursor-default"}`}
          >
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  selected === i
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "border-gray-300 dark:border-gray-500"
                }`}
              >
                {selected === i && !submitted && "✓"}
                {submitted && i === question.answer && "✓"}
                {submitted && selected === i && i !== question.answer && "✗"}
              </div>
              <span className="text-gray-900 dark:text-white">{opt}</span>
            </div>
          </button>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={selected === null}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Submit Answer
        </button>
      ) : (
        <div className="text-center space-y-3">
          {isCorrect ? (
            <button
              onClick={() => router.push("/")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              Done - Return Home ✅
            </button>
          ) : (
            <button
              onClick={() => window.location.reload()}
              className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
          )}

          {isCorrect && (
            <p className="text-green-600 dark:text-green-400 font-medium mt-2">
              Congratulations! You earned +{reward} G$
            </p>
          )}
        </div>
      )}
    </div>
  );
}
