"use client";

export function DonateTab() {
  const causes = [
    { id: 1, name: "UBI Pool", icon: "🌍", progress: 65 },
    { id: 2, name: "Climate Fund", icon: "🌱", progress: 30 },
    { id: 3, name: "Education DAO", icon: "📚", progress: 15 },
  ];

  return (
    <div className="flex flex-col h-full px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-purple-600">Make Impact</h1>
        <p className="text-sm text-gray-500">Donate G$, fund public goods</p>
      </div>

      {/* Balance Card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500">Available to donate</p>
            <p className="text-xl font-bold">245 G$</p>
          </div>
          <button className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">
            Add Funds
          </button>
        </div>
      </div>

      {/* Causes */}
      <div className="space-y-4 mb-6">
        <h2 className="font-semibold text-lg">Fund These Causes</h2>

        {causes.map((cause) => (
          <div
            key={cause.id}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">{cause.icon}</span>
              <h3 className="font-medium flex-grow">{cause.name}</h3>
              <button className="text-xs px-3 py-1 bg-purple-600 text-white rounded-full">
                Donate
              </button>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${cause.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-right mt-1 text-gray-500">
              {cause.progress}% funded
            </p>
          </div>
        ))}
      </div>

      {/* Impact Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-medium mb-2">Your Impact</h3>
        <div className="flex justify-between text-sm mb-1">
          <span>Total Donated:</span>
          <span className="font-bold">1,250 G$</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>People Helped:</span>
          <span className="font-bold">~84</span>
        </div>
      </div>
    </div>
  );
}
