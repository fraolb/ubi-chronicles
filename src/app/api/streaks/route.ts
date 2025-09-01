import { NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import Streak from "~/model/Streak";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const body = await req.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    await dbConnect();

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
      return NextResponse.json({ success: true, streak }, { status: 200 });
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
      return NextResponse.json({ success: true, streak }, { status: 200 });
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
      streak.longestStreak = Math.max(streak.longestStreak, 1);
    }

    await streak.save();

    return NextResponse.json({ success: true, streak }, { status: 200 });
  } catch (error) {
    console.error("Streak update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
