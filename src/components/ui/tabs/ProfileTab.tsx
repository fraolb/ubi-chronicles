"use client";

export function ProfileTab() {
  const stats = [
    { label: "Total Earned", value: "1,420 G$" },
    { label: "Lessons Completed", value: "27" },
    { label: "Quizzes Won", value: "14" },
    { label: "Donation Impact", value: "92 people" },
  ];

  const nfts = [
    { id: 1, name: "Scholar", emoji: "🎓", progress: 100 },
    { id: 2, name: "Philanthropist", emoji: "💖", progress: 65 },
    { id: 3, name: "Quiz Champion", emoji: "🏆", progress: 30 },
  ];

  return (
    <div className="flex flex-col h-full px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-purple-600">Your Profile</h1>
        <p className="text-sm text-gray-500">@cryptocitizen.farcaster</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* NFT Collection */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-3">Your Badges</h2>
        <div className="grid grid-cols-3 gap-3">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border border-gray-100 dark:border-gray-700 text-center"
            >
              <span className="block text-2xl mb-1">{nft.emoji}</span>
              <p className="text-xs font-medium">{nft.name}</p>
              {nft.progress < 100 && (
                <div className="mt-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                    <div
                      className="bg-yellow-500 h-1 rounded-full"
                      style={{ width: `${nft.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{nft.progress}%</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Streak Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-medium mb-3">Daily Streak</h3>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, i) => (
            <div
              key={i}
              className={`h-8 rounded flex items-center justify-center text-xs 
                ${
                  i < 5
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700"
                }`}
            >
              {i < 5 ? "🔥" : i + 1}
            </div>
          ))}
        </div>
        <p className="text-xs text-center mt-2 text-gray-500">5-day streak</p>
      </div>
    </div>
  );
}
