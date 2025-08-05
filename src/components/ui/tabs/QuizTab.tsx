"use client";

export function QuizTab() {
  const activeQuiz = {
    title: "DeFi Basics",
    prize: "50 G$",
    participants: 128,
    timeLeft: "14:32",
  };

  return (
    <div className="flex flex-col h-full px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-purple-600">Daily Quiz</h1>
        <p className="text-sm text-gray-500">Test your knowledge, earn G$</p>
      </div>

      {/* Live Quiz Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-4 mb-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs font-medium">Live Now</p>
            <p className="text-xl font-bold">{activeQuiz.title}</p>
          </div>
          <div className="text-right">
            <p className="text-xs">Prize Pool:</p>
            <p className="font-bold">{activeQuiz.prize}</p>
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span>👥 {activeQuiz.participants} playing</span>
          <span>⏱️ {activeQuiz.timeLeft} left</span>
        </div>
      </div>

      {/* Quiz Modes */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="block text-2xl mb-2">⚔️</span>
          <h3 className="font-medium mb-1">Battle Royale</h3>
          <p className="text-xs text-gray-500">
            Last player standing wins 100 G$
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="block text-2xl mb-2">📚</span>
          <h3 className="font-medium mb-1">Study Mode</h3>
          <p className="text-xs text-gray-500">Practice without risk</p>
        </div>
      </div>

      {/* Previous Results */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Your Stats</h2>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex justify-between text-sm mb-2">
            <span>Total Earned:</span>
            <span className="font-bold text-green-500">320 G$</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span>Correct Answers:</span>
            <span className="font-bold">87%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Rank:</span>
            <span className="font-bold">#42</span>
          </div>
        </div>
      </div>
    </div>
  );
}
