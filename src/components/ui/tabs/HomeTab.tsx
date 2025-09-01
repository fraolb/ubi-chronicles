"use client";

import { useRouter } from "next/navigation";
import lessons from "../../../data/lessons.json"; // Adjust the import path as needed
import { useStreakContext } from "~/components/providers/StreakProvider";
import StreakBlock from "~/components/blocks/StreakBlock";

export function HomeTab() {
  const router = useRouter();
  const { streak, loading, streakError } = useStreakContext();
  console.log("Streak data in HomeTab:", { streak, loading, streakError });

  return (
    <div className="flex flex-col h-full px-4 py-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-purple-600">UBI Chronicles</h1>
        <p className="text-sm text-gray-500">
          Learn about UBI & earn G$ rewards
        </p>
      </div>

      {/* Daily Streak Banner */}
      <StreakBlock />

      {/* Lesson Cards */}
      <div className="space-y-4 mb-6">
        <h2 className="font-semibold text-lg">Today&apos;s Lessons</h2>

        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
                <span className="text-blue-600 dark:text-blue-300">🌐</span>
              </div>
              <div>
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  5 min lesson
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full text-green-800 dark:text-green-200">
                    +{lesson.reward} G$
                  </span>
                  <button
                    className={`text-xs px-3 py-1 rounded-full bg-purple-600 text-white ${
                      lesson.isLocked
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-purple-700"
                    }`}
                    disabled={lesson.isLocked}
                    onClick={() => {
                      router.push(`/lesson/${lesson.id}`);
                    }}
                  >
                    {lesson.isLocked ? "Locked" : "Start"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start">
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">
              <span className="text-purple-600 dark:text-purple-300">💰</span>
            </div>
            <div>
              <h3 className="font-medium">What is UBI?</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                3 min lesson
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full text-green-800 dark:text-green-200">
                  +10 G$
                </span>
                <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full">
                  Start
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4">
              <span className="text-blue-600 dark:text-blue-300">🌐</span>
            </div>
            <div>
              <h3 className="font-medium">How GoodDollar Works</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                5 min lesson
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full text-green-800 dark:text-green-200">
                  +15 G$
                </span>
                <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full opacity-50">
                  Locked
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 mt-auto">
        <button className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
          <span className="block text-2xl mb-1">🏆</span>
          <span className="text-xs">Leaderboard</span>
        </button>
        <button className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center">
          <span className="block text-2xl mb-1">🎁</span>
          <span className="text-xs">Rewards</span>
        </button>
      </div>
    </div>
  );
}
