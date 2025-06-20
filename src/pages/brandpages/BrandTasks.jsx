import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FaArrowLeft, FaSearch, FaSync, FaExternalLinkAlt, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import config from '../../config';

export default function BrandTasks() {
  const navigate = useNavigate();
  
  // State management
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [summary, setSummary] = useState(null);

  const taskTypes = [
    { id: 'all', label: 'All', count: 0 },
    { id: 'tracking', label: 'Tracking', count: 0 },
    { id: 'content', label: 'Content', count: 0 },
    { id: 'extension', label: 'Extension', count: 0 },
    { id: 'application', label: 'Application', count: 0 },
    { id: 'recruitment', label: 'Recruitment', count: 0 }
  ];

  useEffect(() => {
    fetchTasks();
  }, [activeTab, searchTerm]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeTab !== 'all') params.append('type', activeTab);
      if (searchTerm) params.append('search', searchTerm);

      const response = await axios.get(`${config.BACKEND_URL}/api/brand/tasks?${params.toString()}`);
      
      if (response.data.status === 'success') {
        setTasks(response.data.tasks);
        setSummary(response.data.summary);
      } else {
        setTasks([]);
        setSummary(null);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchTasks();
  };

  const getTaskTypeIcon = (type) => {
    switch (type) {
      case 'tracking': return '📦';
      case 'content': return '📝';
      case 'extension': return '⏰';
      case 'application': return '👤';
      case 'recruitment': return '📢';
      default: return '📋';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-400/10';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10';
      case 'low': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getRedirectUrl = (task) => {
    const { type, campaignId } = task;
    switch (type) {
      case 'tracking':
        return `/brand/campaigns/${campaignId}?tab=creators&filter=trackingPending`;
      case 'content':
        return `/brand/campaigns/${campaignId}/content`;
      case 'extension':
        return `/brand/campaigns/${campaignId}?tab=creators&filter=extensionPending`;
      case 'application':
        return `/brand/campaigns/${campaignId}?tab=creators&filter=applied`;
      case 'recruitment':
        return `/brand/campaigns/${campaignId}?tab=creators`;
      default:
        return `/brand/campaigns/${campaignId}`;
    }
  };

  const getCtaLabel = (type) => {
    switch (type) {
      case 'tracking': return 'Input Tracking';
      case 'content': return 'Review Content';
      case 'extension': return 'Review Request';
      case 'application': return 'Review Creators';
      case 'recruitment': return 'View Campaign';
      default: return 'View Details';
    }
  };

  const handleTaskAction = (task) => {
    const url = getRedirectUrl(task);
    navigate(url);
  };

  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  // Update task type counts
  const updatedTaskTypes = taskTypes.map(type => ({
    ...type,
    count: type.id === 'all' ? 
      summary?.total || 0 : 
      summary?.byType?.[type.id] || 0
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] text-gray-100 p-6 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] text-gray-100">
      <Helmet>
        <title>Task Dashboard | Matchably</title>
      </Helmet>

      {/* Header */}
      <div className="bg-[#1a1a1a] border-b border-gray-800 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/brand/dashboard')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold FontNoto text-white">Task Dashboard</h1>
                <p className="text-gray-400 FontNoto">
                  {summary?.total || 0} pending tasks across all campaigns
                </p>
              </div>
            </div>
            
            <button
              onClick={handleRefresh}
              className="flex items-center space-x-2 bg-lime-500 hover:bg-lime-600 text-black px-4 py-2 rounded-lg FontNoto font-medium transition-colors"
            >
              <FaSync className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-[#1a1a1a] rounded-lg p-6 mb-6">
          {/* Task Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {updatedTaskTypes.map(type => (
              <button
                key={type.id}
                onClick={() => setActiveTab(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 FontNoto ${
                  activeTab === type.id
                    ? 'bg-lime-500 text-black'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {type.label} ({type.count})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search tasks by campaign name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500 FontNoto"
            />
          </div>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <div className="bg-[#1a1a1a] rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-bold text-white FontNoto mb-2">All caught up!</h3>
            <p className="text-gray-400 FontNoto mb-6">You have no pending tasks.</p>
            <p className="text-gray-500 FontNoto text-sm mb-6">You're up to date with all your campaign actions.</p>
            <button
              onClick={() => navigate('/brand/dashboard')}
              className="bg-lime-500 hover:bg-lime-600 text-black px-6 py-3 rounded-lg FontNoto font-medium transition-colors"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-[#1a1a1a] rounded-lg p-6 hover:bg-[#2a2a2a] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-2xl">{getTaskTypeIcon(task.type)}</span>
                      <div>
                        <h3 className="text-lg font-semibold text-white FontNoto">
                          {task.campaignTitle}
                        </h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority.toUpperCase()}
                          </span>
                          <span className="flex items-center space-x-1">
                            <FaClock className="w-3 h-3" />
                            <span>{formatTimeAgo(task.createdAt)}</span>
                          </span>
                          {isOverdue(task.dueDate) && (
                            <span className="flex items-center space-x-1 text-red-400">
                              <FaExclamationTriangle className="w-3 h-3" />
                              <span>Overdue</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 FontNoto mb-3">{task.description}</p>
                    
                    {task.creatorName && (
                      <p className="text-sm text-gray-400 FontNoto">
                        Creator: <span className="text-lime-400">{task.creatorName}</span>
                      </p>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleTaskAction(task)}
                    className="bg-lime-500 hover:bg-lime-600 text-black px-4 py-2 rounded-lg FontNoto font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>{getCtaLabel(task.type)}</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
