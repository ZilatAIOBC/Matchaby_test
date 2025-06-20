/* Updated BrandPricingPage with UI/UX Enhancements */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";

const giftedPlans = [
  {
    name: "Single",
    price: "$450",
    campaigns: 1,
    creators: 10,
    perCreator: "$45",
  },
  {
    name: "Starter",
    price: "$1,350",
    campaigns: 3,
    creators: 30,
    perCreator: "$45",
  },
  {
    name: "Standard",
    price: "$2,150",
    campaigns: 5,
    creators: 50,
    perCreator: "$43",
    badge: "Most Popular",
  },
  {
    name: "Pro",
    price: "$2,800",
    campaigns: 7,
    creators: 70,
    perCreator: "$40",
    badge: "Best Value",
  },
];

const paidPlans = [
  {
    name: 'Launch',
    price: '$299',
    priceNote: 'Monthly*',
    features: [
      'Gifted Campaign Wizard',
      '1 Active Campaign',
      '15 Creators/mo',
      'Basic analytics',
      'Live chat',
    ],
    ctaText: 'Get Started',
    ctaLink: '/checkout/subscription?plan=launch',
  },
  {
    name: 'Growth',
    price: '$599',
    priceNote: 'Monthly*',
    features: [
      'Everything in Launch plus',
      '3 Active Campaigns',
      '50 Creators/mo',
      'Paid Campaign Wizard (Fixed only)',
      'Performance score',
    ],
    ctaText: 'Get Started',
    ctaLink: '/checkout/subscription?plan=growth',
    badge: 'Most Popular',
  },
  {
    name: 'Scale',
    price: '$999',
    priceNote: 'Monthly*',
    features: [
      'Everything in Growth plus',
      '10 Active Campaigns',
      'Unlimited Creators',
      'Paid Wizard (Fixed + Bidding)',
      'Performance score',
      'ROI + EMV dashboard',
      'Dedicated success manager',
    ],
    ctaText: 'Get Started',
    ctaLink: '/checkout/subscription?plan=scale',
    badge: 'Best Value',
  },
];

const giftedAddons = [
  {
    title: "① Extra Creator Add-on",
    highlight: "+10 creators",
    price: "$499",
    noteColor: "green",
    notes: [
      "❗ Only for Starter plans and above",
      "❗ Max 20 creators per campaign",
    ],
    query: "extra-creators",
  },
  {
    title: "② Extra Campaign Add-on",
    highlight: "+1 campaign",
    price: "$399",
    noteColor: "green",
    notes: [
      "❗ Only after 80% of the original plan is used",
      "❗ Max 2 extra campaigns per plan",
    ],
    query: "extra-campaign",
  },
];

const paidAddons = [
  {
    title: "① Paid Extra Creator",
    highlight: "+10 creators",
    price: "$999",
    noteColor: "blue",
    notes: [
      "❗ Only for Paid Plus plans and above",
      "❗ Max 20 creators per campaign",
    ],
    query: "paid-extra-creators",
  },
  {
    title: "② Paid Extra Campaign",
    highlight: "+1 campaign",
    price: "$899",
    noteColor: "blue",
    notes: [
      "❗ Only after 80% of the original plan is used",
      "❗ Max 2 extra campaigns per plan",
    ],
    query: "paid-extra-campaign",
  },
];

// const giftedFaqs = [
//   {
//     q: "When do I need to pay?",
//     a: "All plans are paid upfront at checkout.",
//   },
//   {
//     q: "Can I upgrade my plan later?",
//     a: "Yes — you can upgrade within 7 days by just paying the difference.",
//   },
//   {
//     q: "If I upgrade, do I get new creators?",
//     a: "Yes — your creator count resets, but creators already used in your previous plan cannot be reused.",
//   },
//   {
//     q: "Can I cancel or get a refund?",
//     a: "No — all purchases and add-ons are non-refundable.",
//   },
// ];

const giftedFaqs = [
  {
    q: "When do I need to pay?",
    a: "All plans are paid upfront at checkout.",
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes — you can upgrade within 7 days by just paying the difference.",
  },
  {
    q: "If I upgrade, do I get new creators?",
    a: "Yes — your creator count resets, but creators already used in your previous plan cannot be reused.",
  },
  {
    q: "Can I cancel or get a refund?",
    a: "No — all purchases and add-ons are non-refundable.",
  },
];

const paidFaqs = [
  {
    q: 'How does creator pricing work—fixed vs. bidding?',
    a: 'You choose either a fixed price or a bid range. Creators see this before applying.',
  },
  {
    q: 'Who handles payments?',
    a: 'You pay creators directly. Matchably does not collect, hold, or guarantee payments.',
  },
  {
    q: 'Can I switch a campaign from Gifted to Paid after launch?',
    a: 'No. You\'ll need to create a new campaign or use the "Add Paid Pricing" button if available.',
  },
  {
    q: 'What if an approved creator doesn\'t deliver content?',
    a: 'You may withhold payment. Matchably does not mediate or issue refunds.',
  },
  {
    q: 'Do Paid campaigns count toward my plan limits?',
    a: 'Yes. Every active campaign and its creators count toward your monthly plan quota.',
  },
  {
    q: 'Can I cancel a campaign after launching it?',
    a: 'Yes—within 24 hours, it\'s free. After that, even canceled campaigns still count against your plan.',
  },
];

const giftedCtas = [
  {
    label: "Launch Gifted Campaign",
    to: "/brand/campaign/create",
    className: "bg-green-500 text-black",
  },
  {
    label: "Contact Sales",
    onClick: () => (window.location.href = "mailto:info@matchably.kr"),
    className: "bg-gray-700 text-white",
  },
];

const paidCtas = [
  {
    label: 'Get Started',
    to: '/checkout/subscription?plan=launch',
    className: 'bg-blue-500 text-white',
  },
  {
    label: "Contact Sales",
    onClick: () => (window.location.href = "mailto:info@matchably.kr"),
    className: "bg-gray-700 text-white",
  },
];

const Badge = ({ type }) => {
  const bgColor = type === "Most Popular" ? "bg-pink-500" : "bg-blue-500";

  return (
    <div
      className={`absolute right-0 top-0 px-3 py-[6px] text-xs font-semibold text-white rounded-bl-lg ${bgColor} z-10`}
    >
      {type}
    </div>
  );
};

const BrandPricingPage = () => {
  const navigate = useNavigate();
  const [campaignType, setCampaignType] = useState(() => {
    return localStorage.getItem("campaignType") || "gifted";
  });

  useEffect(() => {
    localStorage.setItem("campaignType", campaignType);
  }, [campaignType]);

  const plans = campaignType === "gifted" ? giftedPlans : paidPlans;
  const addons = campaignType === "gifted" ? giftedAddons : [];
  const faqs = campaignType === "gifted" ? giftedFaqs : paidFaqs;
  const ctas = campaignType === "gifted" ? giftedCtas : paidCtas;

  return (
    <div className="bg-black text-white px-4 md:px-12 lg:px-24 pt-12 pb-8 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-snug mb-2">
          Choose Your Campaign Plan
        </h1>
        <p className="text-gray-300 text-lg">
          Flexible plans for growing your brand with creators
        </p>
      </div>

      {/* Toggle Section */}
      <div className="flex justify-center gap-4 mt-10 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            campaignType === "gifted"
              ? "bg-green-500 text-black shadow-lg"
              : "bg-gray-800 text-white"
          }`}
          onClick={() => setCampaignType("gifted")}
        >
          Gifted Campaigns
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 ${
            campaignType === "paid"
              ? "bg-blue-500 text-white shadow-lg"
              : "bg-gray-800 text-white"
          }`}
          onClick={() => setCampaignType("paid")}
        >
          Paid Collaborations
        </button>
      </div>

      <div className="border-t border-gray-800 mt-8"></div>

      {/* Plan Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={campaignType + "-plans"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative bg-[#111] p-10 rounded-2xl shadow-lg border border-gray-700 hover:border-green-500 hover:scale-105 transition-all duration-200 flex flex-col justify-between min-h-[420px]"
            >
              {plan.badge && <Badge type={plan.badge} />}
              <div>
                <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-3xl font-bold text-green-400">{plan.price}</p>
                {plan.priceNote && <p className="text-xs text-gray-400 mb-6">{plan.priceNote}</p>}

                {campaignType === 'gifted' ? (
                  <ul className="space-y-3 text-base font-semibold text-gray-200">
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                      </svg>
                      {plan.campaigns} Campaign{plan.campaigns > 1 ? 's' : ''}
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4h-4a4 4 0 00-4 4v2h5" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14a4 4 0 100-8 4 4 0 000 8z" />
                      </svg>
                      Max {plan.creators} Creators
                    </li>
                    <li className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.5 0-2.7 1.2-2.7 2.7S10.5 13.4 12 13.4c1.5 0 2.7-1.2 2.7-2.7S13.5 8 12 8zm0 10v-2m0-4V6" />
                      </svg>
                      {plan.perCreator} per Creator
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2 text-sm text-gray-200 text-left mt-4">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <button
                onClick={() => navigate(plan.ctaLink || '/brand/pricing')}
                className="mt-8 bg-green-500 text-black py-2 rounded-xl hover:bg-green-400 font-semibold"
              >
                {plan.ctaText || 'Select Plan'}
              </button>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {campaignType === 'paid' && (
        <div className="text-center mt-4 text-gray-400 text-sm">
          * Annual billing. Monthly billing = +15%.
        </div>
      )}

      {addons.length > 0 && (
        <>
          <div className="border-t border-gray-800 mt-20"></div>
          <AnimatePresence mode="wait">
            <motion.div
              key={campaignType + '-addons'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-20"
            >
              <h2 className="text-2xl font-bold text-white mb-8">➕ Add-on Options</h2>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-6">
                {addons.map((addon, idx) => (
                  <div
                    key={idx}
                    className="bg-[#111] p-8 rounded-2xl border border-gray-700 flex flex-col justify-between min-h-[280px]"
                  >
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-3">{addon.title}</h3>
                      <p className="text-base">
                        <span className="text-green-400 font-semibold">{addon.highlight}</span> for {addon.price}
                      </p>
                      <ul className="text-sm font-medium mt-4 space-y-2">
                        {addon.notes.map((note, i) => (
                          <li key={i} className="text-red-400">{note}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button
                        onClick={() => navigate(`/checkout?addon=${addon.query}`)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded font-semibold"
                      >
                        Add to Checkout
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </>
      )}

      <div className="border-t border-gray-800 mt-20"></div>
      <AnimatePresence mode="wait">
        <motion.div
          key={campaignType + '-faqs'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-12">FAQs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((item, idx) => (
              <details key={idx} className="bg-[#111] p-5 rounded-xl border border-gray-700">
                <summary className="cursor-pointer text-white text-base font-medium">{item.q}</summary>
                <p className="mt-2 text-gray-300 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="border-t border-gray-800 mt-20"></div>

      {/* CTA Buttons */}
      <div className="text-center py-14">
        <h2 className="text-2xl font-bold mb-4 text-white">
          Ready to launch your campaign?
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          {ctas.map((cta, idx) =>
            cta.to ? (
              <Link
                key={idx}
                to={cta.to}
                className={`px-6 py-3 rounded-xl hover:bg-green-400 font-semibold text-lg ${cta.className}`}
              >
                {cta.label}
              </Link>
            ) : (
              <button
                key={idx}
                onClick={cta.onClick}
                className={`px-6 py-3 rounded-xl hover:bg-gray-600 font-semibold text-lg ${cta.className}`}
              >
                {cta.label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandPricingPage;
