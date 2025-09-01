"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useMiniApp } from "@neynar/react";
import { IStreak } from "~/model/Streak";

interface StreakContextType {
  streak: IStreak | null;
  loading: boolean;
  streakError: string | null;
  fetchUserStreak: () => Promise<void>;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const StreakProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { context } = useMiniApp();

  const [streak, setStreak] = useState<IStreak | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserStreak = async () => {
    if (!context) return;
    if (!context.user?.fid) {
      setError("User not found");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const fetchedStreak = await fetch(`/api/streaks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: context.user.fid }),
      });

      const result = await fetchedStreak.json();
      console.log("Fetched user streak:", result);
      setStreak(result?.streak);
    } catch (err) {
      console.error("Error fetching user streak:", err);
      setError("Failed to fetch user streak");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStreak();
  }, [context]);

  return (
    <StreakContext.Provider
      value={{
        streak,
        loading,
        streakError: error,
        fetchUserStreak,
      }}
    >
      {children}
    </StreakContext.Provider>
  );
};

export const useStreakContext = () => {
  const context = useContext(StreakContext);
  if (!context) {
    throw new Error(
      "useStreakContext must be used within a userStreakProvider"
    );
  }
  return context;
};
