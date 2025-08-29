import Streak, { IStreak } from "~/model/Streak";

/**
 * Checks and updates user streak based on completion time
 * Returns updated streak document
 */
export async function checkAndUpdateStreak(userId: string): Promise<IStreak> {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  let streak = await Streak.findOne({ userId });

  // Create new streak if doesn't exist
  if (!streak) {
    streak = await Streak.create({
      userId,
      currentStreak: 1,
      longestStreak: 1,
      lastCompletedDate: today,
      totalCompleted: 1,
    });
    return streak;
  }

  const lastCompleted = streak.lastCompletedDate
    ? new Date(
        streak.lastCompletedDate.getFullYear(),
        streak.lastCompletedDate.getMonth(),
        streak.lastCompletedDate.getDate()
      )
    : null;

  // Check if user already completed today
  if (lastCompleted && lastCompleted.getTime() === today.getTime()) {
    return streak; // No update needed
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  // Check if streak continues (completed yesterday)
  if (lastCompleted && lastCompleted.getTime() === yesterday.getTime()) {
    // Continue streak
    const newStreakCount = streak.currentStreak + 1;

    streak.currentStreak = newStreakCount;
    streak.longestStreak = Math.max(streak.longestStreak, newStreakCount);
    streak.lastCompletedDate = today;
    streak.totalCompleted += 1;
  } else {
    // Reset streak (missed a day or more)
    streak.currentStreak = 1;
    streak.lastCompletedDate = today;
    streak.totalCompleted += 1;

    // Only update longest streak if current was higher
    streak.longestStreak = Math.max(streak.longestStreak, 1);
  }

  await streak.save();
  return streak;
}

/**
 * Gets current streak without updating
 */
export async function getCurrentStreak(
  userId: string
): Promise<IStreak | null> {
  return await Streak.findOne({ userId });
}
