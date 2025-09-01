import mongoose, { Document, Schema } from "mongoose";

export interface IStreak extends Document {
  userId: Number; // Farcaster FID or wallet address
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: Date; // Last time user completed a lesson
  totalCompleted: number;
  updatedAt: Date;
}

const StreakSchema: Schema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
      unique: true,
    },
    currentStreak: {
      type: Number,
      default: 0,
    },
    longestStreak: {
      type: Number,
      default: 0,
    },
    lastCompletedDate: {
      type: Date,
      default: null,
    },
    totalCompleted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    // Auto-update updatedAt field
    versionKey: false,
  }
);

// Create compound index for faster queries
StreakSchema.index({ userId: 1, lastCompletedDate: 1 });

export default mongoose.models.Streak ||
  mongoose.model<IStreak>("Streak", StreakSchema);
