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
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start flex-1">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mr-4 flex-shrink-0">
                  <span className="text-blue-600 dark:text-blue-300 text-lg">
                    🌐
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {"5"} min lesson
                  </p>
                  <div className="flex items-center mt-3">
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 rounded-full text-green-800 dark:text-green-200 font-medium">
                      +{lesson.reward} G$
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between h-full ml-4">
                {lesson.isLocked ? (
                  <div className="text-right">
                    <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                      Locked
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => router.push(`/lesson/${lesson.id}`)}
                    className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 group"
                  >
                    {/* Play icon */}
                    <svg
                      className="w-5 h-5 ml-1 transform group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
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
