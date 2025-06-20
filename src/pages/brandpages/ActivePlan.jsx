import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { FaArrowRight, FaCartPlus, FaHistory } from "react-icons/fa";

const ActivePlan = () => {
  const [subscription, setSubscription] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("BRAND_TOKEN");

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await axios.get(`${config.BACKEND_URL}/brand/package/subscription`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status === "success") {
          setSubscription(res.data.subscription);
        }
      } catch (err) {
        console.error("Error fetching active plan:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${config.BACKEND_URL}/brand/payments`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPaymentHistory(res.data.history || []);
      } catch (err) {
        console.error("❌ Failed to fetch brand history:", err);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchSubscription();
    fetchHistory();
  }, [token]);

  if (loading) {
    return <div className="text-center text-white py-20">Loading your active plan...</div>;
  }

  if (!subscription) {
    return (
      <div className="text-center text-red-400 py-20">
        No active subscription found. Please choose a plan from{" "}
        <span
          className="underline cursor-pointer text-blue-400"
          onClick={() => navigate("/brand/pricing")}
        >
          pricing page
        </span>.
      </div>
    );
  }

  const isExpired = new Date(subscription.expiresAt) < new Date();
  const totalCampaigns = subscription.plan.campaignsAllowed + (subscription.extraCampaignsAllowed || 0);
  const totalCreators = subscription.plan.creatorsAllowed + (subscription.extraCreatorsAllowed || 0);

  return (
    <div className="px-6 md:px-12 lg:px-24 pt-12 pb-16 bg-[#111] text-white min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">Your Active Plan</h1>

      <div className="max-w-8xl mx-auto bg-gradient-to-br from-[#1f1f1f] to-[#1a1a1a] p-8 rounded-2xl shadow-xl border border-[#2c2c2c]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">
              {subscription.plan?.name || "Unknown Plan"}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Purchased on: {formatDate(subscription.purchaseDate)}
            </p>
            <p className="text-sm text-gray-400">
              Expires on: {formatDate(subscription.expiresAt)}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium">
            {isExpired ? (
              <span className="flex items-center bg-red-600 text-white px-3 py-1 rounded-full">
                <HiOutlineXCircle className="mr-1" /> Expired
              </span>
            ) : (
              <span className="flex items-center bg-green-600 text-white px-3 py-1 rounded-full">
                <HiOutlineCheckCircle className="mr-1" /> Active
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div className="bg-[#2a2a2a] p-5 rounded-xl text-center">
            <p className="text-xl font-bold text-indigo-400">
              {subscription.campaignsUsed} / {totalCampaigns}
            </p>
            <p className="text-sm text-gray-400 mt-1">Campaigns Used</p>
          </div>
          <div className="bg-[#2a2a2a] p-5 rounded-xl text-center">
            <p className="text-xl font-bold text-indigo-400">
              {subscription.creatorsUsed} / {totalCreators}
            </p>
            <p className="text-sm text-gray-400 mt-1">Creators Used</p>
          </div>
          <div className="bg-[#2a2a2a] p-5 rounded-xl text-center">
            <p className="text-xl font-bold text-green-400">
              ${subscription.plan.price || 0}
            </p>
            <p className="text-sm text-gray-400 mt-1">Plan Cost</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/brand/pricing")}
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md font-semibold flex items-center gap-2"
          >
            Upgrade Plan <FaArrowRight className="text-sm" />
          </button>
          <button
            onClick={() => navigate("/brand/pricing")}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-md font-semibold flex items-center gap-2"
          >
            Buy Add-Ons <FaCartPlus className="text-sm" />
          </button>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="max-w-8xl mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-6 flex items-center text-purple-300">
          <FaHistory className="mr-2" /> Payment & Plan History
        </h2>

        {historyLoading ? (
          <p className="text-gray-400">Loading...</p>
        ) : paymentHistory.length === 0 ? (
          <p className="text-gray-400">No payment history found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#2c2c2c] shadow-lg">
            <table className="min-w-full text-sm bg-[#1a1a1a] text-white">
              <thead className="bg-[#222] text-gray-300 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Plan/Add-On</th>
                  <th className="px-6 py-3 text-left">Type</th>
                  <th className="px-6 py-3 text-left">Amount</th>
                  <th className="px-6 py-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((entry, idx) => {
                  const isAddon = entry.type === "addon";
                  const qty = entry.metadata?.quantity;
                  const addonType = entry.metadata?.addonType;
                  const label = isAddon && qty && addonType
                    ? `+${qty} ${addonType}`
                    : entry.planName || "N/A";

                  return (
                    <tr
                      key={idx}
                      className={`border-t border-[#2c2c2c] ${
                        idx % 2 === 0 ? "bg-[#1f1f1f]" : "bg-[#181818]"
                      } hover:bg-[#2a2a2a] transition`}
                    >
                      <td className="px-6 py-3">{label}</td>
                      <td className="px-6 py-3 capitalize">{entry.type}</td>
                      <td className="px-6 py-3 text-green-400">
                        ${entry.amountPaid}
                      </td>
                      <td className="px-6 py-3 text-gray-400">
                        {entry.date
                          ? new Date(entry.date).toLocaleString()
                          : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivePlan;
