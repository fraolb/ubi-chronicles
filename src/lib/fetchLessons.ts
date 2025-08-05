// lib/lessons.ts
import lessons from "../data/lessons.json";

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

export function getLesson(id: string): Lesson {
  const lesson = lessons.find((l) => l.id === id);
  if (!lesson) {
    throw new Error(`Lesson with id ${id} not found`);
  }
  return lesson;
}
