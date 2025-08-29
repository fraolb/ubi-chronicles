import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "~/lib/mongodb";
import Streak from "~/model/Streak";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

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
    res.status(200).json({
      success: true,
      streak: streak,
    });
  } catch (error) {
    console.error("Streak update error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
