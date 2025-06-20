// src/pages/UserApplyCampaign.jsx
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";

const UserApplyCampaign = () => {
  const [appliedCampaigns, setAppliedCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [extensionForm, setExtensionForm] = useState({
    days: 1,
    reason: ""
  });

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("token") || localStorage.getItem("token");

      // Try to fetch from new creator extensions API first
      try {
        const res = await axios.get(
          `${config.BACKEND_URL}/api/creator/extensions/applications`,
          { headers: { authorization: token } }
        );
        if (res.data.status === "success") {
          setAppliedCampaigns(res.data.applications);
          return;
        }
      } catch (extensionApiError) {
        console.log("Extension API not available, falling back to original API");
      }

      // Fallback to original API
      const res = await axios.get(
        `${config.BACKEND_URL}/user/campaigns/appliedCampaigns`,
        { headers: { authorization: token } }
      );
      if (res.data.status === "success") {
        // Transform original data to include extension fields
        const transformedCampaigns = res.data.campaigns.map(campaign => ({
          ...campaign,
          campaignTitle: campaign.title,
          applicationDate: campaign.appliedAt,
          status: campaign.applicationStatus,
          trackingNumber: null, // Would need to be fetched separately
          contentSubmitted: false,
          extensionStatus: 'not_available',
          canRequestExtension: false
        }));
        setAppliedCampaigns(transformedCampaigns);
      }
    } catch (err) {
      console.error("Failed to fetch campaigns:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExtensionRequest = (campaign) => {
    setSelectedCampaign(campaign);
    setExtensionForm({ days: 1, reason: "" });
    setIsExtensionModalOpen(true);
  };

  const submitExtensionRequest = async () => {
    if (!extensionForm.reason || extensionForm.reason.length < 10) {
      toast.error("Reason must be at least 10 characters");
      return;
    }

    try {
      const token = Cookies.get("token") || localStorage.getItem("token");
      const res = await axios.post(
        `${config.BACKEND_URL}/api/creator/extensions/request`,
        {
          campaignId: selectedCampaign.campaignId,
          days: extensionForm.days,
          reason: extensionForm.reason
        },
        { headers: { authorization: token } }
      );

      if (res.data.status === "success") {
        toast.success("Extension request submitted successfully!");
        setIsExtensionModalOpen(false);
        fetchCampaigns(); // Refresh the list
      } else {
        toast.error(res.data.message || "Failed to submit extension request");
      }
    } catch (error) {
      console.error("Extension request error:", error);
      toast.error(error.response?.data?.message || "Failed to submit extension request");
    }
  };

  const getExtensionDisplay = (campaign) => {
    if (!campaign.canRequestExtension && campaign.extensionStatus === 'not_available') {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-gray-400">🔒 Not Available</span>
        </div>
      );
    }

    if (campaign.canRequestExtension) {
      return (
        <button
          onClick={() => handleExtensionRequest(campaign)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
        >
          🔘 Request Extension
        </button>
      );
    }

    // Show extension status
    return (
      <span className="text-sm text-gray-300">
        {campaign.extensionStatus}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Pending': { color: 'bg-yellow-400', textColor: 'text-yellow-400', icon: '🟡' },
      'Approved': { color: 'bg-green-500', textColor: 'text-green-400', icon: '✅' },
      'Rejected': { color: 'bg-red-500', textColor: 'text-red-400', icon: '❌' }
    };

    const config = statusConfig[status] || statusConfig['Pending'];

    return (
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${config.color}`} />
        <span className={config.textColor}>
          {config.icon} {status}
        </span>
      </div>
    );
  };

  return (
    <div className="flex bg-[var(--background)] justify-center w-full p-6">
      <div className="w-full lg:w-[70%] bg-[#171717] p-6 rounded-xl shadow-md border border-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">
          Applied Campaigns
        </h2>

        {loading ? (
          // show 6 skeleton rows
          <div className="w-full">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            {appliedCampaigns.length > 0 ? (
              <table className="w-full border-collapse rounded-lg overflow-hidden min-w-[600px]">
                <thead>
                  <tr className="bg-[#444] text-gray-200">
                    <th className="text-left p-4 font-medium">Campaign Title</th>
                    <th className="text-left p-4 font-medium">Application Date</th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Extension</th>
                    <th className="text-center p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appliedCampaigns.map((c, idx) => (
                    <tr
                      key={idx}
                      className="border-t border-gray-600 hover:bg-[#333] transition"
                    >
                      <td className="p-4 text-gray-100 whitespace-nowrap">
                        <Link to={`/campaign/${c.id || c.campaignId}`}>
                          {c.title || c.campaignTitle}
                        </Link>
                      </td>
                      <td className="p-4 text-gray-300 whitespace-nowrap">
                        {(c.appliedAt || c.applicationDate)?.split("T")[0]}
                      </td>
                      <td className="p-4 font-semibold">
                        {getStatusBadge(c.applicationStatus || c.status)}
                        {(c.applicationStatus === "Rejected" || c.status === "Rejected") &&
                          c.showReasonToInfluencer &&
                          c.rejectionReason && (
                            <details className="ml-2 cursor-pointer text-sm text-white">
                              <summary>Why?</summary>
                              <div className="mt-1 bg-[#2a2a2a] p-2 rounded shadow text-gray-300 w-64">
                                {c.rejectionReason}
                              </div>
                            </details>
                          )}
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        {getExtensionDisplay(c)}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                       {(c.applicationStatus === "Approved" || c.status === "Approved") && (
                         <Link
                         to={`/AddPostUrl/${c.id || c.campaignId}`}
                         state={{ campaignTitle: c.title || c.campaignTitle }}
                           className="bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 transition"
                         >
                           Submit Content
                         </Link>
                       )}
                     </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-300 text-center text-lg">
                No applied campaigns yet.
              </p>
            )}
          </div>
        )}

        <p className="mt-4 text-gray-400 text-sm text-center">
          *All campaign approvals will be communicated individually via email.
        </p>
      </div>
    </div>
  );
};

const Skeleton = () => (
  <div className="flex justify-between gap-4 p-4 border-b border-gray-600 animate-pulse">
    <div className="h-4 bg-gray-700 rounded w-60" />
    <div className="h-4 bg-gray-700 rounded w-40" />
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 bg-gray-500 rounded-full" />
      <div className="h-4 bg-gray-700 rounded w-32" />
    </div>
  </div>
);

export default UserApplyCampaign;
