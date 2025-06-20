import React from "react";
import { useNavigate } from "react-router-dom";

// 🧪 Dummy data for tasks
const tasks = [
  {
    id: 1,
    label: "",
    iconColor: "🟡",
    actionText: "",
    route: "/brand/campaigns/1/content",
  },
  {
    id: 2,
    label: "",
    iconColor: "🔴",
    actionText: "",
    route: "/brand/inbox",
  },
  {
    id: 3,
    label: "",
    iconColor: "🟠",
    actionText: "",
    route: "/brand/campaigns/1/edit",
  },
];

const BrandToDoCard = () => {
  const navigate = useNavigate();

  if (!tasks.length) return null;

  return (
    <div className="bg-[#1f1f1f] border border-[#2c2c2c] rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-semibold text-white mb-4">📋 Brand To-Do</h2>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center bg-[#2b2b2b] px-4 py-3 rounded-lg"
          >
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-lg">{task.iconColor}</span>
              <span>{task.label}</span>
            </div>

            <button
              onClick={() => navigate(task.route)}
              className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md transition font-medium"
            >
              {task.actionText}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandToDoCard;
