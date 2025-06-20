import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../config";
import { FaPlusCircle, FaShoppingCart } from "react-icons/fa";

export default function PricingPlans() {
  const [plans, setPlans] = useState([]);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("BRAND_TOKEN");

  useEffect(() => {
    fetchPlans();
    fetchSubscription();
  }, []);

  const fetchPlans = async () => {
    try {
      const { data } = await axios.get(
        `${config.BACKEND_URL}/brand/package/plans`
      );
      console.log("Plans fetched:", data);
      setPlans(data.plans || []);
    } catch (err) {
      console.error("❌ Error fetching plans", err);
    }
  };

  const fetchSubscription = async () => {
    try {
      const { data } = await axios.get(
        `${config.BACKEND_URL}/brand/package/subscription`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.status === "success") {
        setSubscription(data.subscription);
      }
    } catch {
      // No active subscription
    }
  };

  const handlePurchase = async (planId) => {
    setLoading(true);
    try {
      const endpoint = subscription
        ? "/brand/package/upgrade"
        : "/brand/package/subscribe";
      const payload = subscription ? { newPlanId: planId } : { planId };
      const { data } = await axios.post(
        `${config.BACKEND_URL}${endpoint}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("❌ Checkout error", err);
      alert("Failed to initiate checkout");
    } finally {
      setLoading(false);
    }
  };

  const handleAddOn = async (type, qty) => {
    if (!subscription) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${config.BACKEND_URL}/brand/package/addon`,
        { addonType: type, quantity: qty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to add-on.");
      }
    } catch (err) {
      console.error("❌ Add-on error", err);
      alert("Add-on purchase failed");
    } finally {
      setLoading(false);
    }
  };

  const Badge = ({ label }) => {
    const colorMap = {
      "Most Popular": "bg-pink-500",
      "Best Value": "bg-blue-500",
      Active: "bg-green-600",
    };

    return (
      <div
        className={`px-2 py-1 text-xs font-semibold text-white rounded-md ${colorMap[label]}`}
      >
        {label}
      </div>
    );
  };

  return (
    <div className="px-6 md:px-12 lg:px-24 pt-12 pb-6 bg-black text-white min-h-screen">
      <h1 className="text-4xl font-bold text-center">
        Choose Your Campaign Plan
      </h1>
      <p className="text-center text-lg text-gray-400 mt-2">
        Save up to 20% compared to other UGC platforms
      </p>

      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">
        {plans.map((plan, index) => {
          const isActive = subscription && subscription.plan._id === plan._id;

          const isModernStyle = plan.name === "Standard" || plan.name === "Pro";
          console.log(plan.name, {
            isActive,
            showPopular: plan.name === "Starter",
            showValue: plan.name === "Pro",
          });

          return (
            <div
              key={plan._id}
              className={`relative flex flex-col justify-between bg-[#111] p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-green-500 hover:scale-105 transition-all duration-200 min-h-[420px]`}
            >
              <div className="absolute top-0 right-0 p-2 flex flex-col items-end gap-1 z-10">
                {[
                  isActive && "Active",
                  plan.name === "Standard Plan" && "Most Popular",
                  plan.name === "Pro Plan" && "Best Value",
                ]
                  .filter(Boolean)
                  .map((label) => (
                    <Badge key={label} label={label} />
                  ))}
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
                <p className="text-3xl font-extrabold text-green-400 mb-4">
                  ${plan.price.toLocaleString()}
                </p>
                <ul className="space-y-2 text-sm font-medium text-gray-300">
                  {isModernStyle ? (
                    <>
                      <li className="flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2" />{" "}
                        {plan.campaignsAllowed} Campaigns
                      </li>
                      <li className="flex items-center">
                        <span className="inline-block w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />{" "}
                        Max {plan.creatorsAllowed} Creators
                      </li>
                    </>
                  ) : (
                    <>
                      <li>🎯 {plan.campaignsAllowed} Campaigns</li>
                      <li>👥 Up to {plan.creatorsAllowed} Creators</li>
                      <li>📆 {plan.validityMonths} Month Validity</li>
                    </>
                  )}
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(plan._id)}
                disabled={loading || isActive}
                className="mt-6 bg-green-500 hover:bg-green-400 text-black py-2 rounded-xl font-semibold text-sm w-full disabled:opacity-50"
              >
                {loading
                  ? "Processing..."
                  : isActive
                  ? "Current Plan"
                  : subscription
                  ? "Upgrade Plan"
                  : "Select Plan"}
              </button>
            </div>
          );
        })}
      </div>

      {subscription && (
        <>
          <h2 className="text-2xl font-bold text-white text-left my-12 flex items-center">
            <FaPlusCircle className="mr-2 text-purple-400" /> Add-On Options
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Creator Add-on */}
            <div className="bg-[#111] p-8 rounded-2xl border border-gray-700 flex flex-col justify-between min-h-[280px]">
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  ① Extra Creator Add-on
                </h3>
                <p className="text-base">
                  <span className="text-green-400 font-semibold">
                    +{subscription.plan.creatorsAllowed} creators
                  </span>{" "}
                  for ${subscription.plan.creatorAddonPrice}
                </p>
                <ul className="text-sm font-medium mt-4 space-y-2">
                  <li className="text-red-400">
                    ❗ Only for Starter plans and above
                  </li>
                  <li className="text-red-400">
                    ❗ Max 20 creators per campaign
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => handleAddOn("creator", 1)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded font-semibold"
                >
                  Add to Checkout
                </button>
              </div>
            </div>

            {/* Campaign Add-on */}
            <div className="bg-[#111] p-8 rounded-2xl border border-gray-700 flex flex-col justify-between min-h-[280px]">
              <div>
                <h3 className="text-white font-semibold text-lg mb-3">
                  ② Extra Campaign Add-on
                </h3>
                <p className="text-base">
                  <span className="text-green-400 font-semibold">
                    +1 campaign
                  </span>{" "}
                  for ${subscription.plan.campaignAddonPrice}
                </p>
                <ul className="text-sm font-medium mt-4 space-y-2">
                  <li className="text-red-400">
                    ❗ Only after 80% of the original plan is used
                  </li>
                  <li className="text-red-400">
                    ❗ Max 2 extra campaigns per plan
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => handleAddOn("campaign", 1)}
                  disabled={
                    loading ||
                    subscription.campaignsUsed <
                      0.8 * subscription.plan.campaignsAllowed
                  }
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded font-semibold disabled:opacity-50"
                >
                  Add to Checkout
                </button>
              </div>
            </div>
          </div>

          {/* Upgrade Info */}
          <div className="bg-[#1a1a1a] mt-12 p-5 rounded-lg border border-gray-600 w-full lg:w-1/2 mx-auto text-center">
            <h3 className="font-bold text-white">✨ Upgrade Window</h3>
            <p className="text-sm text-gray-400 mt-2">
              Upgrade by{" "}
              {new Date(subscription.upgradeEligibleTill).toLocaleDateString()}{" "}
              — pay the difference.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
