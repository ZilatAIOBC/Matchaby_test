/** @format */

import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Devider from "../components/Devider";
import { useRef, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Phone1 from "/assets/phone.png";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import video1 from "/assets/brandvideo1.mp4";
import video2 from "/assets/brandvideo2.mp4";
import video3 from "/assets/brandvideo3.mp4";
import video4 from "/assets/brandvideo4.mp4";
import video5 from "/assets/brandvideo5.mp4";
import video6 from "/assets/brandvideo6.mp4";
import video7 from "/assets/brandvideo7.mp4";
import video8 from "/assets/brandvideo8.mp4";

import brandlogo1 from "/assets/brandlogos/BrandLogo1.png";
import brandlogo2 from "/assets/brandlogos/BrandLogo2.png";
import brandlogo3 from "/assets/brandlogos/BrandLogo3.png";
import brandlogo4 from "/assets/brandlogos/BrandLogo4.png";
import brandlogo5 from "/assets/brandlogos/BrandLogo5.png";
import brandlogo6 from "/assets/brandlogos/BrandLogo6.png";
import brandlogo7 from "/assets/brandlogos/BrandLogo7.png";
import brandlogo8 from "/assets/brandlogos/BrandLogo8.png";
import brandlogo9 from "/assets/brandlogos/BrandLogo9.png";
import brandlogo10 from "/assets/brandlogos/BrandLogo10.png";
import brandlogo11 from "/assets/brandlogos/BrandLogo11.png";
import brandlogo12 from "/assets/brandlogos/BrandLogo12.png";
import brandlogo13 from "/assets/brandlogos/BrandLogo13.png";
import brandlogo14 from "/assets/brandlogos/BrandLogo14.png";

// Import demo videos for each step
import demoVideo1 from "/assets/brandvideo7.mp4";
import demoVideo2 from "/assets/brandvideo8.mp4";
import demoVideo3 from "/assets/brandvideo9.mp4";

const GiftedCampaignsContent = () => {
  const videoWrapperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const el = videoWrapperRef.current;
      if (!el) return;
      let scrollAmount = 1;

      const interval = setInterval(() => {
        el.scrollLeft -= scrollAmount;
        if (el.scrollLeft <= 0) {
          el.scrollLeft = el.scrollWidth / 2;
        }
      }, 20); // smoother scroll

      return () => clearInterval(interval);
    }
  }, [isHovered]);
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden bg-black text-white">
        {/* Content */}
        <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          {/* Left Column: Text + Buttons */}
          <div
            className="text-center md:text-left max-w-xl"
            data-aos="fade-right"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Start your campaign
              <br className="hidden md:block" /> in 5 minutes
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10">
              No outreach. No ghosting. No chasing. Just real content from real
              creators — fully managed for you.
            </p>

            <div className="flex flex-col sm:flex-row gap-y-4 gap-x-4 sm:gap-x-6 justify-center md:justify-start">
              <Link
                to="/brand"
                className="relative group inline-block w-[240px] h-[64px] text-lg font-semibold text-center leading-[64px] rounded-xl bg-lime-500 hover:bg-lime-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]"
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-lime-500 z-[-1]"></span>
                Brand Dashboard
              </Link>

              <Link
                to="/brand/dashboard"
                className="relative group inline-block w-[240px] h-[64px] text-lg font-semibold text-center leading-[64px] rounded-xl bg-lime-500 hover:bg-lime-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]"
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-lime-500 z-[-1]"></span>
                Start Your Campaign
              </Link>

              <Link
                to="/brand-price"
                className="relative group inline-block w-[240px] h-[64px] text-lg font-semibold text-center leading-[64px] rounded-xl bg-lime-500 hover:bg-lime-600 text-black transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_30px_rgba(132,204,22,0.5)]"
              >
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl bg-lime-500 z-[-1]"></span>
                Compare Plans
              </Link>
            </div>
          </div>

          {/* Right Column: Phone Mockup */}
          <div
            className="mt-12 md:mt-0 md:ml-8 w-[260px] md:w-[300px] shrink-0"
            data-aos="fade-left"
          >
            <img
              src={Phone1}
              alt="New Campaign Mockup"
              className="rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </section>
      <Devider />

      {/* Section 1: How Matchably Works - Vertical Timeline */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How Matchably Works
        </h2>

        <div className="relative pl-12">
          {/* Vertical dotted line */}
          <div className="absolute left-[22px] top-0 h-full w-1 border-l-4 border-dotted border-green-400"></div>

          {/* Steps */}
          <div>
            {[
              {
                icon: "📄",
                title: "Launch Your Campaign",
                desc: "Submit your brief & product — takes less than 5 minutes.",
              },
              {
                icon: "🙋‍♂️",
                title: "Creators Apply",
                desc: "30+ creators apply within 5 days. You choose who to work with.",
              },
              {
                icon: "📦",
                title: "Ship Your Product",
                desc: "You ship the product. We handle all deadlines and reminders.",
              },
              {
                icon: "🎥",
                title: "Receive Your Content",
                desc: "Creators upload content. We review and deliver it to your dashboard — ready to use.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className="flex items-start gap-4 mb-10"
                data-aos="fade-up"
              >
                {/* Icon with better vertical alignment */}
                <div className="text-3xl w-10 h-10 flex items-center justify-center">
                  {step.icon}
                </div>

                {/* Text block */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    Step {i + 1}: {step.title}
                  </h3>
                  <p className="text-base md:text-lg font-medium text-gray-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Devider />

      {/* Watch It. Trust It. Use It. Section */}
      <section className="bg-black text-white py-5 px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Watch It. Trust It. Use It.
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Real content from real creators, Backed by real results.
          </p>
        </div>

        {/* Video Carousel */}
        <div
          className="relative group mb-14"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Scrollable Container */}
          <div ref={videoWrapperRef} className="relative overflow-hidden">
            <div className="flex gap-6 w-fit">
              {[
                video1,
                video2,
                video3,
                video4,
                video5,
                video6,
                video7,
                video8,
                video1,
                video2,
                video3,
                video4,
                video5,
                video6,
                video7,
                video8,
              ].map((vid, idx) => (
                <div
                  key={idx}
                  className="min-w-[200px] sm:min-w-[280px] md:min-w-[320px] rounded-xl overflow-hidden"
                >
                  <video
                    src={vid}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className=" object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => {
              videoWrapperRef.current.scrollLeft -= 320;
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full z-10 hover:bg-opacity-80 transition hidden group-hover:block"
          >
            ◀
          </button>
          <button
            onClick={() => {
              videoWrapperRef.current.scrollLeft += 320;
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-60 text-white p-3 rounded-full z-10 hover:bg-opacity-80 transition hidden group-hover:block"
          >
            ▶
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16 px-2">
          {[
            { icon: "✅", value: "93%", label: "On-time content delivery" },
            { icon: "👥", value: "50+", label: "Avg applicants per campaign" },
            { icon: "📈", value: "9.5K+", label: "Avg views per UGC post" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#111] p-6 rounded-2xl border border-gray-700 text-center shadow-lg"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-extrabold text-green-400">
                {stat.value}
              </div>
              <p className="text-sm text-gray-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Trusted Brands */}

        <div className="bg-black py-8">
          <div className="text-center mt-4 mb-6">
            <p className="text-white uppercase tracking-wider text-sm">
              Trusted by:
            </p>
          </div>

          {/* Marquee Wrapper */}
          <div className="overflow-hidden w-full">
            <div className="flex whitespace-nowrap animate-scroll group-hover:[animation-play-state:paused]">
              {[
                brandlogo1,
                brandlogo2,
                brandlogo3,
                brandlogo4,
                brandlogo5,
                brandlogo6,
                brandlogo7,
                brandlogo8,
                brandlogo9,
                brandlogo10,
                brandlogo11,
                brandlogo12,
                brandlogo13,
                brandlogo14,
              ]
                .concat([
                  brandlogo1,
                  brandlogo2,
                  brandlogo3,
                  brandlogo4,
                  brandlogo5,
                  brandlogo6,
                  brandlogo7,
                  brandlogo8,
                  brandlogo9,
                  brandlogo10,
                  brandlogo11,
                  brandlogo12,
                  brandlogo13,
                  brandlogo14,
                ])
                .map((logo, idx) => (
                  <div
                    key={idx}
                    className="mx-4 flex-none flex items-center justify-center h-40 w-35 rounded-md"
                  >
                    <img
                      src={logo}
                      alt={`Brand logo ${(idx % 14) + 1}`}
                      className="h-full mw-full object-contain border-green-300 border-[1px] shadow-lg shadow-green-300"
                    />
                  </div>
                ))}
            </div>
          </div>

          {/* Local animation CSS */}
          <style>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      animation: scroll 30s linear infinite;
    }
  `}</style>
        </div>
      </section>
      <Devider />

      {/* Section 3: Why Matchably */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-white">
          <span className="text-red-500"></span> STOP WASTING TIME AND MONEY.
        </h2>
        <p className="text-center text-lg text-gray-300 mb-12">
          Matchably saves you $5,000 and 15 hours — with guaranteed results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-10 md:gap-x-12">
          {[
            {
              icon: "💸",
              title: "$6,360 → $1,200",
              desc: "Most brands pay over $6K for 30 UGCs. With Matchably, it's just $1,200 — flat, all-in.",
            },
            {
              icon: "⏱️",
              title: "15 hours → 0 hours",
              desc: "No cold outreach. No follow-ups. We manage the entire process for you.",
            },
            {
              icon: "🚫",
              title: "Guaranteed Delivery",
              desc: "No content? No problem. We instantly replace creators who drop out.",
            },
            {
              icon: "📜",
              title: "Usage Rights Included",
              desc: "Use your content anywhere — forever. Raw files optional on request.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#111] py-8 px-6 rounded-2xl border border-gray-700 shadow-lg flex flex-col space-y-4"
              data-aos="fade-up"
            >
              <div className="text-3xl w-8 h-8 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      <Devider />

      {/* Section 4: FAQ */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
        <div className="space-y-6">
          {[
            {
              q: "What types of products or businesses are allowed?",
              a: "**Any brand** with a product, service, or experience to promote. Beauty, lifestyle, wellness, restaurants, local services — all are welcome.",
            },
            {
              q: "Do I just ship the product?",
              a: "**Yes.** Once you approve the creators, you ship the product — we handle the rest. For service-based campaigns, we will coordinate with creators.",
            },
            {
              q: "Can I use the content however I want?",
              a: "**Yes — commercial use is included.** For resale, paid ads, or affiliate use, we will help you get extended permissions if needed.",
            },
            {
              q: "What if I do not like the content?",
              a: "**You can request one revision per creator.** We will handle the reshoot — no back-and-forth needed on your side.",
            },
            {
              q: "Are there contracts or hidden fees?",
              a: "**No.** We use flat-rate pricing. No commissions. No surprises.",
            },
            {
              q: "Can I choose the creators?",
              a: "**Yes — you approve every creator.** In rare cases, we may assign backups with your approval, if someone drops out.",
            },
          ].map(({ q, a }, i) => (
            <details
              key={i}
              className="bg-[#111] p-4 rounded-xl border border-gray-700 group transition-all"
              data-aos="fade-up"
            >
              <summary className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                {q}
              </summary>
              <p
                className="mt-2 text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: a.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              ></p>
            </details>
          ))}
        </div>
      </section>
      <Devider />

      {/* Final CTA Footer */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
          Ready to get real creator content — without the hassle?
        </h2>
        <Link
          to="/brand-price"
          className="inline-block mt-4 px-10 py-5 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-black shadow-xl hover:scale-110 transition-transform"
        >
          Compare Pricing Plans →
        </Link>
      </section>
    </>
  );
};

const PaidCollaborationsContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("how-it-works");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Auto-cycle through steps for demo
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 3);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      step: "1",
      icon: "🚀",
      title: "Create",
      description: "Build a campaign and choose Bid or Fixed model.",
      videoSrc: demoVideo1,
      gradient: "from-blue-500 to-purple-600",
      bgColor: "bg-blue-500/10",
    },
    {
      step: "2",
      icon: "📝",
      title: "Match",
      description: "Creators apply, brands review and approve.",
      videoSrc: demoVideo2,
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-500/10",
    },
    {
      step: "3",
      icon: "⚡",
      title: "Deliver",
      description: "Content is submitted, reviewed, and approved on-platform.",
      videoSrc: demoVideo3,
      gradient: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-500/10",
    },
  ];
  return (
    <>
      {/* 1. Hero Section */}
      <section className="bg-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div
            className="md:w-1/2 text-center md:text-left"
            data-aos="fade-right"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Run Paid UGC Campaigns — Safely, Zero Commission
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Full creator access. All communication stays in-platform.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <Link
                to="/brand-price"
                className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
              >
                Start Campaign →
              </Link>
              <Link
                to="/brand-price"
                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-transform transform hover:scale-105"
              >
                See Plans →
              </Link>
            </div>
          </div>
          <div className="md:w-1/2" data-aos="fade-left">
            <video
              src={video1}
              muted
              autoPlay
              loop
              playsInline
              className="rounded-xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </section>

      <Devider />

      {/* 2. Pain vs Solution Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Brand Pain Card */}
          <div
            className="relative group cursor-pointer transition-all duration-500 hover:scale-102"
            data-aos="fade-up"
          >
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 transition-opacity duration-500 blur-sm group-hover:opacity-20"></div>

            <div className="relative bg-transparent backdrop-blur-sm border rounded-2xl p-8 shadow-lg transition-all duration-500 border-white/20 hover:border-red-400/50 hover:shadow-2xl h-full">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    ❌
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    Brand Pain
                  </h3>
                </div>

                {/* Pain Points */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      Creators don't care about the product
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      No idea if it'll perform
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      What if creators ghost?
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      Communication gets messy
                    </p>
                  </div>
                </div>

                {/* Learn More Link */}
                {/* <div className="mt-6 pt-4 border-t border-white/20">
                  <button className="text-red-400 hover:text-red-300 font-medium text-sm flex items-center gap-2 transition-colors duration-300 group">
                    Learn More About These Challenges
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>

          {/* Matchably Solution Card */}
          <div
            className="relative group cursor-pointer transition-all duration-500 hover:scale-102"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Glowing border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl opacity-0 transition-opacity duration-500 blur-sm group-hover:opacity-20"></div>

            <div className="relative bg-transparent backdrop-blur-sm border rounded-2xl p-8 shadow-lg transition-all duration-500 border-white/20 hover:border-green-400/50 hover:shadow-2xl h-full">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    ✅
                  </div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    Matchably Solution
                  </h3>
                </div>

                {/* Solutions */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      Only creators who completed 2+ gifted campaigns can join
                      paid
                    </p>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      Data-backed projections based on past campaign results
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      All chats, files, and decisions stay in-platform,
                      time-stamped
                    </p>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 transition-colors duration-300">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 leading-relaxed">
                      Matchably reviews the case — everything is logged and
                      traceable
                    </p>
                  </div>
                </div>

                {/* Learn More Link */}
                {/* <div className="mt-6 pt-4 border-t border-white/20">
                  <button className="text-green-400 hover:text-green-300 font-medium text-sm flex items-center gap-2 transition-colors duration-300 group">
                    Learn More About Our Solutions
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Devider />

      <section
        id="how-it-works"
        className="w-full bg-[var(--background)] py-20 px-4 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Title */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-[25px] md:text-[30px] FontNoto leading-tight mb-4 relative">
              <span className="text-lime-400 font-semibold drop-shadow-[0_0_8px_rgba(132,204,22,0.6)]">
                How It Works
              </span>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 rounded-full"></div>
            </h2>
          </div>

          {/* Main Content Layout */}
          <div className="text-center items-center">
            {/* Desktop: 3 horizontal cards, Mobile: vertical stack */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`relative transition-all duration-700 delay-${
                    index * 200 + 500
                  } ${
                    isVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step Card */}
                  <div
                    className={`relative group cursor-pointer transition-all duration-500 h-full ${
                      activeStep === index ? "scale-105" : "hover:scale-102"
                    }`}
                  >
                    {/* Glowing border effect */}
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${
                        step.gradient
                      } rounded-2xl opacity-0 transition-opacity duration-500 blur-sm ${
                        activeStep === index
                          ? "opacity-30"
                          : "group-hover:opacity-20"
                      }`}
                    ></div>

                    <div
                      className={`relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border rounded-2xl p-6 shadow-lg transition-all duration-500 h-full flex flex-col ${
                        step.bgColor
                      } ${
                        activeStep === index
                          ? "border-lime-400/50 shadow-2xl"
                          : "border-white/10 hover:border-white/20"
                      }`}
                    >
                      {/* Icon at top */}
                      <div className="flex justify-center mb-4">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {step.icon}
                        </div>
                      </div>

                      {/* Step Number Badge */}
                      <div className="flex justify-center mb-4">
                        <div
                          className={`w-10 h-10 bg-gradient-to-r ${step.gradient} text-white rounded-full flex items-center justify-center font-bold text-sm FontNoto shadow-lg`}
                        >
                          {step.step}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-white text-lg md:text-xl font-bold FontNoto leading-tight mb-3 text-center">
                        {step.title}
                      </h3>

                      {/* Description - keep it concise for horizontal layout */}
                      <p className="text-gray-300 text-sm md:text-base FontNoto leading-relaxed text-center flex-1">
                        {step.description}
                      </p>

                      {/* Active indicator */}
                      {activeStep === index && (
                        <div className="flex justify-center mt-4">
                          <div
                            className={`w-3 h-3 bg-gradient-to-r ${step.gradient} rounded-full animate-pulse`}
                          ></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Campaigns That Actually Perform
        </h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-2">
          {[
            { icon: "⏱️", value: "3.8 days", label: "Avg. submission time" },
            { icon: "👀", value: "45,000+", label: "Avg. video views" },
            { icon: "📞", value: "98%", label: "Creator response rate" },
            { icon: "🔄", value: "87%", label: "Brand repeat rate" },
            { icon: "✅", value: "94%", label: "Approval on first upload" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="relative group cursor-pointer transition-all duration-500 hover:scale-105"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-0 transition-opacity duration-500 blur-sm group-hover:opacity-30"></div>

              <div className="relative bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center shadow-lg transition-all duration-500 group-hover:border-blue-400/50 group-hover:shadow-2xl h-full flex flex-col justify-center">
                {/* Icon */}
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* Value */}
                <div className="text-3xl font-extrabold text-blue-400 mb-2 group-hover:text-blue-300 transition-colors duration-300">
                  {stat.value}
                </div>

                {/* Label */}
                <p className="text-sm text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                  {stat.label}
                </p>

                {/* Active indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Devider />

      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">FAQs</h2>
        <div className="space-y-6">
          {[
            {
              q: " How do I pay creators?",
              a: "You pay creators directly after agreement. Matchably does not touch the money.",
            },
            {
              q: "Can I talk to creators outside the platform?",
              a: "Yes, but Matchably will not be able to help if any issue arises outside.",
            },
            {
              q: " What if they don’t submit content?",
              a: "All agreements are logged. If there is a problem, we will step in based on records.",
            },
            {
              q: "Can I ask for revisions?",
              a: "Yes. Use the chat to request changes. Set clear expectations upfront.",
            },
            {
              q: "How is usage defined?",
              a: " Brands define usage terms (duration, channels) during campaign setup.",
            },
          ].map(({ q, a }, i) => (
            <details
              key={i}
              className="bg-[#111] p-4 rounded-xl border border-gray-700 group transition-all"
              data-aos="fade-up"
            >
              <summary className="text-lg font-semibold cursor-pointer flex items-center gap-2">
                {q}
              </summary>
              <p
                className="mt-2 text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: a.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
                }}
              ></p>
            </details>
          ))}
        </div>
      </section>

      <Devider />

      <section className="py-20 px-4 text-center">
        <Link
          to="/brand-price"
          className="inline-block mt-4 px-10 py-5 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-black shadow-xl hover:scale-110 transition-transform"
        >
          Launch Campaign Now →
        </Link>
      </section>
    </>
  );
};

const BrandLandingPage = () => {
  const [campaignType, setCampaignType] = useState("gifted");

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="bg-black text-white">
      <Helmet>
        <title>Matchably for Brands</title>
        <meta
          property="og:title"
          content="Start Your UGC Campaign in 5 Minutes"
        />
        <meta
          name="description"
          content="No outreach. No ghosting. No chasing. Just real content from real creators — fully managed for you."
        />
      </Helmet>

      <div className="text-center py-4">
        <div className="inline-flex rounded-lg bg-gray-800 p-1">
          <button
            onClick={() => setCampaignType("gifted")}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${
              campaignType === "gifted"
                ? "bg-lime-500 text-black"
                : "text-white"
            }`}
          >
            Gifted Campaigns
          </button>
          <button
            onClick={() => setCampaignType("paid")}
            className={`px-6 py-2 text-sm font-semibold rounded-md transition-colors ${
              campaignType === "paid" ? "bg-lime-500 text-black" : "text-white"
            }`}
          >
            Paid Collaborations
          </button>
        </div>
      </div>

      {campaignType === "gifted" ? (
        <GiftedCampaignsContent />
      ) : (
        <PaidCollaborationsContent />
      )}
    </div>
  );
};

export default BrandLandingPage;