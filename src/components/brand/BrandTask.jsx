import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyTasks = [
  {
    id: 1,
    campaignId: '',
    campaignName: '',
    taskType: '',
    description: '',
    lastUpdated: '',
  },
  {
    id: 2,
    campaignId: '',
    campaignName: '',
    taskType: '',
    description: '',
    lastUpdated: '',
  },
];

const taskTypes = ['All', 'Tracking', 'Content', 'Extension', 'Application', 'Recruitment'];

const BrandTask = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCampaign, setSelectedCampaign] = useState('');

  const filteredTasks = dummyTasks.filter(task => {
    const matchType = selectedType === 'All' || task.taskType.toLowerCase() === selectedType.toLowerCase();
    const matchCampaign = selectedCampaign === '' || task.campaignName.toLowerCase().includes(selectedCampaign.toLowerCase());
    return matchType && matchCampaign;
  });

  const getCTA = (taskType, campaignId) => {
    const type = taskType.toLowerCase();
    switch (type) {
      case 'tracking':
        return () => navigate(`/brand/campaigns/${campaignId}?tab=creators&filter=trackingPending`);
      case 'content':
        return () => navigate(`/brand/campaigns/${campaignId}/content`);
      case 'extension':
        return () => navigate(`/brand/campaigns/${campaignId}?tab=creators&filter=extensionPending`);
      case 'application':
        return () => navigate(`/brand/campaigns/${campaignId}?tab=creators&filter=applied`);
      case 'recruitment':
        return () => navigate(`/brand/campaigns/${campaignId}?tab=creators`);
      default:
        return () => {};
    }
  };

  const getCTALabel = (taskType) => {
    switch (taskType.toLowerCase()) {
      case 'tracking':
        return 'Input Tracking';
      case 'content':
        return 'Review Content';
      case 'extension':
        return 'Handle Extension';
      case 'application':
        return 'Review Applications';
      case 'recruitment':
        return 'Manage Recruitment';
      default:
        return 'View Task';
    }
  };

  return (
    <div className="p-6 bg-[#0f0f0f] min-h-screen text-white">
      {/* Page Header */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-white">Tasks</h1>
        <p className="text-gray-400">Manage your pending actions across all campaigns.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 mb-6 justify-between">
        {/* Task Type Filter */}
        <div className="flex gap-2 flex-wrap">
          {taskTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-1 rounded-full border ${
                selectedType === type
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Campaign Name Search */}
        <input
          type="text"
          placeholder="Search Campaign"
          value={selectedCampaign}
          onChange={e => setSelectedCampaign(e.target.value)}
          className="bg-gray-800 text-white border border-gray-600 px-3 py-1 rounded-md text-sm placeholder-gray-500"
        />
      </div>

      {/* Task Table */}
      {filteredTasks.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-800 text-gray-400">
                <th className="px-4 py-2 text-left">Campaign</th>
                <th className="px-4 py-2 text-left">Task Type</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => (
                <tr key={task.id} className="border-t border-gray-700 hover:bg-gray-800">
                  <td className="px-4 py-2 text-indigo-400 cursor-pointer hover:underline">
                    {task.campaignName}
                  </td>
                  <td className="px-4 py-2 capitalize">{task.taskType}</td>
                  <td className="px-4 py-2">{task.description}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={getCTA(task.taskType, task.campaignId)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md"
                    >
                      {getCTALabel(task.taskType)}
                    </button>
                  </td>
                  <td className="px-4 py-2 text-gray-500">{task.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-16 text-lg text-gray-400">
          🎉 All caught up! You have no pending actions at the moment.
        </div>
      )}
    </div>
  );
};

export default BrandTask;
