import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '../config';
import Cookie from 'js-cookie';
import { toast } from 'react-toastify';

const AdminCampaignApprove = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPendingCampaigns = async () => {
    setLoading(true);
    try {
      const token = Cookie.get("AdminToken");
      const res = await axios.get(`${config.BACKEND_URL}/admin/campaign-approvals/pending`, {
        headers: {
          Authorization: token,
        },
      });
      if (res.data.status === 'success') {
        setRequests(res.data.requests);
      } else {
        toast.error("Failed to load campaigns");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching campaigns");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id, type) => {
    try {
      const token = Cookie.get("AdminToken");
      const url = `${config.BACKEND_URL}/admin/campaign-approvals/${id}/${type}`;
      const res = await axios.patch(url, {}, {
        headers: {
          Authorization: token,
        },
      });

      if (res.data.status === 'success') {
        toast.success(`Campaign ${type} successfully`);
        fetchPendingCampaigns();
      } else {
        toast.error(res.data.message || "Action failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating campaign status");
    }
  };

  useEffect(() => {
    fetchPendingCampaigns();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-4">Pending Campaign Approvals</h2>
      {loading ? (
        <p>Loading...</p>
      ) : requests.length === 0 ? (
        <p>No pending campaigns.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((campaign) => (
            <div key={campaign._id} className="bg-[#1f1f1f] p-4 rounded-lg border border-[#333]">
              <h3 className="text-xl font-semibold">{campaign.campaignTitle}</h3>
              <p><strong>Brand:</strong> {campaign.brandName}</p>
              <p><strong>Deadline:</strong> {new Date(campaign.deadline).toLocaleDateString()}</p>
              <p><strong>Description:</strong> {campaign.productDescription}</p>
              <div className="mt-3 space-x-3">
                <button
                  onClick={() => handleApproval(campaign._id, 'approve')}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleApproval(campaign._id, 'reject')}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCampaignApprove;
