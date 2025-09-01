import { useEffect, useState } from "react";
import { useStreakContext } from "~/components/providers/StreakProvider";

export default function StreakBlock() {
  const { streak, loading, streakError } = useStreakContext();
  const [timeLeft, setTimeLeft] = useState("00:00:00");

  // Calculate time until next day (midnight)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const difference = tomorrow.getTime() - now.getTime();

      if (difference <= 0) {
        return "00:00:00";
      }

      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get appropriate emoji based on streak length
  const getStreakEmoji = (count: number) => {
    if (count >= 10) return "🔥🔥🔥";
    if (count >= 5) return "🔥🔥";
    if (count >= 3) return "🔥";
    if (count >= 1) return "✨";
    return "🚀";
  };

  // Check if user already completed today
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastCompletedDate = streak?.lastCompletedDate
    ? new Date(streak.lastCompletedDate)
    : null;

  const completedToday =
    lastCompletedDate && lastCompletedDate.getTime() === today.getTime();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 mb-6 text-white">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xs font-medium">Daily Streak</p>

          {loading ? (
            <p className="text-xl font-bold">Loading...</p>
          ) : streakError ? (
            <p className="text-sm font-bold">Error loading</p>
          ) : !streak ? (
            <p className="text-xl font-bold">Start streak! 🚀</p>
          ) : (
            <p className="text-xl font-bold">
              {streak.currentStreak} day{streak.currentStreak !== 1 ? "s" : ""}{" "}
              {getStreakEmoji(streak.currentStreak)}
            </p>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs">Next reward in:</p>

          {loading ? (
            <p className="font-mono">--:--:--</p>
          ) : (
            <p className="font-mono">{timeLeft}</p>
          )}

          {streak && !completedToday && !loading && (
            <p className="text-xs opacity-80 mt-1">Complete a task today</p>
          )}
        </div>
      </div>

      {/* Progress indicator - only show when we have streak data */}
      {streak && !loading && (
        <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
          <div
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
            style={{ width: completedToday ? "100%" : "0%" }}
          />
        </div>
      )}

      {/* Additional stats - only show when we have streak data */}
      {streak && !loading && (
        <div className="flex justify-between mt-2 text-xs opacity-80">
          <span>Longest: {streak.longestStreak} days</span>
          <span>Total: {streak.totalCompleted} days</span>
        </div>
      )}

      {/* Error message */}
      {streakError && !loading && (
        <p className="text-xs opacity-80 mt-2">Refresh to try again</p>
      )}
    </div>
  );
}
