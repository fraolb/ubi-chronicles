import { NextResponse } from "next/server";
import dbConnect from "~/lib/mongodb";
import Streak from "~/model/Streak";

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId || Array.isArray(userId)) {
    return NextResponse.json(
      { message: "Valid user ID is required" },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const streak = await Streak.findOne({ userId });

    if (!streak) {
      return NextResponse.json(
        { message: "Streak not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: streak }, { status: 200 });
  } catch (error) {
    console.error("Streak fetch error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
