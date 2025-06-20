import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import config from '../../config';
import BrandToDoCard from './dashboard/BrandToDoCard';
import CampaignStatsCard from './dashboard/CampaignStatsCard';
import CampaignsEndingSoon from './dashboard/CampaignsEndingSoon';
import PlanSummaryCard from './dashboard/PlanSummaryCard';
import ExtensionRequestsCard from './dashboard/ExtensionRequestsCard';

export default function BrandDashboard() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    draft: 0,
    completed: 0,
    avgSubmissionRate: 0
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('BRAND_TOKEN');
      const res = await fetch(`${config.BACKEND_URL}/api/brand/campaigns`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.status === 'success') {
          setCampaigns(data.campaigns);
          calculateStats(data.campaigns);
        }
      }
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      // For now, use mock data for development
      const mockCampaigns = [
        {
          id: 1,
          title: 'Glow Serum Campaign',
          status: 'active',
          deadline: '2024-01-15',
          submissionRate: 85,
          applicants: 12,
          submissions: 10
        },
        {
          id: 2,
          title: 'Vita Ampoule Launch',
          status: 'active',
          deadline: '2024-01-16',
          submissionRate: 90,
          applicants: 8,
          submissions: 7
        },
        {
          id: 3,
          title: 'Summer Collection',
          status: 'draft',
          deadline: '2024-02-01',
          submissionRate: 0,
          applicants: 0,
          submissions: 0
        }
      ];
      setCampaigns(mockCampaigns);
      calculateStats(mockCampaigns);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (campaignData) => {
    const total = campaignData.length;
    const active = campaignData.filter(c => c.status === 'active').length;
    const draft = campaignData.filter(c => c.status === 'draft').length;
    const completed = campaignData.filter(c => c.status === 'completed').length;
    
    const totalSubmissions = campaignData.reduce((sum, c) => sum + (c.submissions || 0), 0);
    const totalApplicants = campaignData.reduce((sum, c) => sum + (c.applicants || 0), 0);
    const avgSubmissionRate = totalApplicants > 0 ? Math.round((totalSubmissions / totalApplicants) * 100) : 0;

    setStats({ total, active, draft, completed, avgSubmissionRate });
  };

  const handleCreateCampaign = () => {
    navigate('/brand/campaigns/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-lime-400 text-xl FontNoto">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-8 px-4">
      <Helmet>
        <title>Brand Dashboard | Matchably</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl FontNoto font-bold text-[#E0FFFA] mb-2">
              Brand Dashboard
            </h1>
            <p className="text-gray-400 FontNoto">
              Track your campaigns and manage your brand presence
            </p>
          </div>

          {/* Create Campaign CTA */}
          {campaigns.length > 0 && (
            <button
              onClick={handleCreateCampaign}
              className="bg-lime-500 hover:bg-lime-600 text-white px-6 py-3 rounded-lg FontNoto font-semibold
                shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]
                transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <span className="text-xl">+</span>
              New Campaign
            </button>
          )}
        </div>

        {campaigns.length === 0 ? (
          /* No Campaigns - Center CTA */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 max-w-md">
              <div className="text-6xl mb-6">🚀</div>
              <h2 className="text-2xl FontNoto font-bold text-[#E0FFFA] mb-4">
                Ready to launch your first campaign?
              </h2>
              <p className="text-gray-400 FontNoto mb-8">
                Create engaging campaigns and connect with top creators
              </p>
              <button
                onClick={handleCreateCampaign}
                className="bg-lime-500 hover:bg-lime-600 text-white px-8 py-4 rounded-lg FontNoto font-semibold text-lg
                  shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]
                  transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
              >
                <span className="text-2xl">+</span>
                Create Your First Campaign
              </button>
            </div>
          </div>
        ) : (
          /* Dashboard Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Campaign Stats */}
              <CampaignStatsCard stats={stats} campaigns={campaigns} />
              
              {/* Campaigns Ending Soon */}
              <CampaignsEndingSoon campaigns={campaigns} />
              
              {/* Extension Requests */}
              <ExtensionRequestsCard />
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Plan Summary */}
              <PlanSummaryCard />
              
              {/* To-Do Card */}
              <BrandToDoCard campaigns={campaigns} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
