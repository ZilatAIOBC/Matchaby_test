import React from "react";

const dummyRequests = [
  {
    id: 1,
    creatorName: "",
    campaignTitle: "",
    daysRequested: 0,
    reason: "",
  },
  {
    id: 2,
    creatorName: "",
    campaignTitle: "",
    daysRequested: 0,
    reason: "",
  },
];

const ExtensionRequestsCard = () => {
  if (!dummyRequests.length) return null;

  return (
    <div className="bg-[#1f1f1f] border border-[#2c2c2c] p-5 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-white mb-2">
        🕐 Pending Extension Requests
      </h2>

      {dummyRequests.map((req) => (
        <div
          key={req.id}
          className="bg-[#2b2b2b] p-4 rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
        >
          <div className="text-gray-300 text-sm">
            <strong className="text-white">{req.creatorName}</strong> |{" "}
            {req.campaignTitle} → <span className="text-yellow-400">+{req.daysRequested} days</span>{" "}
            | Reason: {req.reason}
          </div>

          {/* <div className="flex gap-3">
            <button className="px-4 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded">
              Approve
            </button>
            <button className="px-4 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded">
              Reject
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default ExtensionRequestsCard;
