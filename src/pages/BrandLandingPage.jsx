/** @format */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Devider from '../components/Devider';
import { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Phone1 from '/assets/phone.png';
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import video1 from '/assets/brandvideo1.mp4';
import video2 from '/assets/brandvideo2.mp4';
import video3 from '/assets/brandvideo3.mp4';
import video4 from '/assets/brandvideo4.mp4';
import video5 from '/assets/brandvideo5.mp4';
import video6 from '/assets/brandvideo6.mp4';
import video7 from '/assets/brandvideo7.mp4';
import video8 from '/assets/brandvideo8.mp4';

import brandlogo1 from '/assets/brandlogos/BrandLogo1.png';
import brandlogo2 from '/assets/brandlogos/BrandLogo2.png';
import brandlogo3 from '/assets/brandlogos/BrandLogo3.png';
import brandlogo4 from '/assets/brandlogos/BrandLogo4.png';
import brandlogo5 from '/assets/brandlogos/BrandLogo5.png';
import brandlogo6 from '/assets/brandlogos/BrandLogo6.png';
import brandlogo7 from '/assets/brandlogos/BrandLogo7.png';
import brandlogo8 from '/assets/brandlogos/BrandLogo8.png';
import brandlogo9 from '/assets/brandlogos/BrandLogo9.png';
import brandlogo10 from '/assets/brandlogos/BrandLogo10.png';
import brandlogo11 from '/assets/brandlogos/BrandLogo11.png';
import brandlogo12 from '/assets/brandlogos/BrandLogo12.png';
import brandlogo13 from '/assets/brandlogos/BrandLogo13.png';
import brandlogo14 from '/assets/brandlogos/BrandLogo14.png';

const BrandLandingPage = () => {

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

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  
  return (
    <div className='bg-black text-white'>
      {/* SEO */}
      <Helmet>
        <title>Matchably</title>
        <meta property='og:title' content='Start Your UGC Campaign in 5 Minutes' />
        <meta
          name='description'
          content='No outreach. No ghosting. No chasing. Just real content from real creators — fully managed for you.'
        />
      </Helmet>

      {/* Hero Section */}
     <section className="relative w-full h-screen overflow-hidden bg-black text-white">

  {/* Content */}
  <div className="relative z-10 h-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
    {/* Left Column: Text + Buttons */}
    <div className="text-center md:text-left max-w-xl" data-aos="fade-right">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Start your campaign<br className="hidden md:block" /> in 5 minutes
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-10">
        No outreach. No ghosting. No chasing. Just real content from real creators — fully managed for you.
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
    <div className="mt-12 md:mt-0 md:ml-8 w-[260px] md:w-[300px] shrink-0" data-aos="fade-left">
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
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How Matchably Works</h2>

  <div className="relative pl-12">
    {/* Vertical dotted line */}
    <div className="absolute left-[22px] top-0 h-full w-1 border-l-4 border-dotted border-green-400"></div>

    {/* Steps */}
    <div>
      {[
        {
          icon: '📄',
          title: 'Launch Your Campaign',
          desc: 'Submit your brief & product — takes less than 5 minutes.',
        },
        {
          icon: '🙋‍♂️',
          title: 'Creators Apply',
          desc: '30+ creators apply within 5 days. You choose who to work with.',
        },
        {
          icon: '📦',
          title: 'Ship Your Product',
          desc: 'You ship the product. We handle all deadlines and reminders.',
        },
        {
          icon: '🎥',
          title: 'Receive Your Content',
          desc: 'Creators upload content. We review and deliver it to your dashboard — ready to use.',
        },
      ].map((step, i) => (
        <div key={i} className="flex items-start gap-4 mb-10" data-aos="fade-up">
          {/* Icon with better vertical alignment */}
          <div className="text-3xl w-10 h-10 flex items-center justify-center">
            {step.icon}
          </div>

          {/* Text block */}
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Step {i + 1}: {step.title}</h3>
            <p className="text-base md:text-lg font-medium text-gray-300">{step.desc}</p>
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
        <h2 className="text-4xl md:text-5xl font-bold mb-3">Watch It. Trust It. Use It.</h2>
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
      <div
        ref={videoWrapperRef}
        className="relative overflow-hidden"
      >
        <div className="flex gap-6 w-fit">
          {[
            video1, video2, video3, video4,
            video5, video6, video7, video8,
            video1, video2, video3, video4,
            video5, video6, video7, video8,
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
            <div className="text-3xl font-extrabold text-green-400">{stat.value}</div>
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
    brandlogo1, brandlogo2, brandlogo3, brandlogo4, brandlogo5, brandlogo6, brandlogo7,
    brandlogo8, brandlogo9, brandlogo10, brandlogo11, brandlogo12, brandlogo13, brandlogo14,
  ]
    .concat([
      brandlogo1, brandlogo2, brandlogo3, brandlogo4, brandlogo5, brandlogo6, brandlogo7,
      brandlogo8, brandlogo9, brandlogo10, brandlogo11, brandlogo12, brandlogo13, brandlogo14,
    ])
    .map((logo, idx) => (
      <div
        key={idx}
        className="mx-4 flex-none flex items-center justify-center h-40 w-35 rounded-md"
      >
        <img
          src={logo}
          alt={`Brand logo ${idx % 14 + 1}`}
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
        desc: "Most brands pay over $6K for 30 UGCs. With Matchably, it’s just $1,200 — flat, all-in.",
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
        <div className="text-3xl w-8 h-8 flex items-center justify-center">{item.icon}</div>
        <h3 className="text-lg font-bold text-white">{item.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
      </section>
      <Devider />

      {/* Section 4: FAQ */}
      <section className='py-20 px-4 max-w-4xl mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-8'>FAQs</h2>
        <div className='space-y-6'>
          {[
            {
              
              q: 'What types of products or businesses are allowed?',
              a: '**Any brand** with a product, service, or experience to promote. Beauty, lifestyle, wellness, restaurants, local services — all are welcome.',
            },
            {
              
              q: 'Do I just ship the product?',
              a: '**Yes.** Once you approve the creators, you ship the product — we handle the rest. For service-based campaigns, we’ll coordinate with creators.',
            },
            {
              
              q: 'Can I use the content however I want?',
              a: '**Yes — commercial use is included.** For resale, paid ads, or affiliate use, we’ll help you get extended permissions if needed.',
            },
            {
              
              q: 'What if I don’t like the content?',
              a: '**You can request one revision per creator.** We’ll handle the reshoot — no back-and-forth needed on your side.',
            },
            {
              
              q: 'Are there contracts or hidden fees?',
              a: '**No.** We use flat-rate pricing. No commissions. No surprises.',
            },
            {
             
              q: 'Can I choose the creators?',
              a: '**Yes — you approve every creator.** In rare cases, we may assign backups with your approval, if someone drops out.',
            },
          ].map(({ q, a }, i) => (
            <details
              key={i}
              className='bg-[#111] p-4 rounded-xl border border-gray-700 group transition-all'
              data-aos='fade-up'
            >
              <summary className='text-lg font-semibold cursor-pointer flex items-center gap-2'>
                 {q}
              </summary>
              <p className='mt-2 text-gray-300' dangerouslySetInnerHTML={{ __html: a.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
            </details>
          ))}
        </div>
      </section>
      <Devider />

      {/* Final CTA Footer */}
      <section className='py-20 px-4 text-center'>
        <h2 className='text-3xl md:text-4xl font-bold mb-6 text-white'>
          Ready to get real creator content — without the hassle?
        </h2>
        <Link
          to='/brand-price'
          className='inline-block mt-4 px-10 py-5 text-lg font-semibold rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-black shadow-xl hover:scale-110 transition-transform'
        >
          Compare Pricing Plans →
        </Link>
      </section>
    </div>
  );
};

export default BrandLandingPage;
