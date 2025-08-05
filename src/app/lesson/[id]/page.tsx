"use client";

import { useState, useEffect } from "react";
import { getLesson } from "../../../lib/fetchLessons"; // Adjust the import path as needed
import { use } from "react";
import Link from "next/link";

// Lesson schema example
interface Lesson {
  id: string;
  title: string;
  // duration: number;
  content: string; // Markdown/HTML
  reward: number;
  question: {
    prompt: string;
    options: string[];
    answer: number;
  };
  isLocked: boolean;
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [lesson, setLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    const fetchLesson = async () => {
      const lesson = await getLesson(id);
      setLesson(lesson);
      // Handle lesson data (e.g., set state)
    };
    fetchLesson();
  }, [id]);

  return (
    <div className="p-4">
      <div className="w-full flex justify-end">
        <Link className="bg-red-500 text-white px-2 rounded-md" href="/">
          Go Back
        </Link>
      </div>
      <h1 className="text-lg text-center">{lesson?.title}</h1>

      <div>{lesson?.content}</div>

      {/* Question Section (appears after reading) */}
      <div className="mt-8 border-t pt-4">
        <h3>Quick Check</h3>
        {lesson != null ? (
          <QuizQuestion
            question={lesson.question}
            onSuccess={(selectedOption) => {
              // Award G$ tokens
              // Unlock next lesson
            }}
          />
        ) : null}
      </div>
    </div>
  );
}

function QuizQuestion({
  question,
  onSuccess,
}: {
  question: { prompt: string; options: string[] };
  onSuccess: (selectedOption: number | null) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div>
      <p>{question.prompt}</p>
      <div className="space-y-2 mt-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-full p-2 rounded border ${
              selected === i ? "bg-purple-100 border-purple-500" : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={() => onSuccess(selected)}
        disabled={selected === null}
        className="mt-4 bg-purple-600 text-white px-4 py-2 rounded"
      >
        Submit Answer
      </button>
    </div>
  );
}
