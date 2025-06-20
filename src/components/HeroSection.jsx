import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import video from "/assets/backgroundV.mp4";
import { initPerformanceChecks } from "../utils/performanceCheck";

// Google Analytics event tracking function
const trackGAEvent = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize performance checks
    initPerformanceChecks();

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-[85vh] w-full p-2 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 197, 94, 0.3) 0%, rgba(168, 85, 247, 0.2) 50%, rgba(59, 130, 246, 0.1) 100%)`
        }}
      ></div>

      {/* Main content container with improved backdrop overlay */}
      <div className={`bg-black/50 backdrop-blur-md w-[90%] py-20 px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 h-[90%] rounded-[20px] relative z-20 border border-white/10 shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Background video for the container */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-[-1] w-full h-full object-cover rounded-[20px] opacity-[0.4] top-0 left-0 transition-opacity duration-500 hover:opacity-[0.6]"
        >
          <source src={video} type="video/mp4" />
        </video>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 bg-lime-400/30 rounded-full animate-pulse`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Desktop: Left-Right Layout, Mobile: Stacked */}
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8 lg:gap-12">

          {/* Left Side: Text Content */}
          <div className={`flex-1 text-center lg:text-left max-w-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            {/* Headline - Changed to pure white for better readability */}
            <h1 className="text-white text-2xl text-[28px] sm:text-3xl lg:text-4xl font-extrabold leading-tight FontLato mb-4 relative">
              <span className="text-white">
                Stop chasing influencers. Get verified UGC on autopilot.
              </span>
              {/* Glowing underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-lime-400/0 via-lime-400/60 to-lime-400/0 rounded-full animate-pulse"></div>
            </h1>

            {/* Subheadline - Changed to pure white for better readability */}
            <p className={`text-white text-base sm:text-lg lg:text-xl max-w-3xl mx-auto lg:mx-0 FontNoto mb-8 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              No matter what you sell — products or services — Matchably connects you with real creators who deliver authentic content. No DMs. No ghosting. Just real results.
            </p>

            {/* Primary CTA Button - Single "Start Free Today" button */}
            <div className={`flex justify-center lg:justify-start transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Link
                to="/sign-in"
                onClick={() => trackGAEvent('hero_cta_click', {
                  button_text: 'Start Free Today',
                  page_location: window.location.href
                })}
                className="group relative text-white px-8 md:px-12 py-4 md:py-5 rounded-[25px] text-lg md:text-xl font-bold FontNoto
                  bg-lime-500 hover:bg-lime-600
                  border border-lime-400/50 hover:border-lime-300
                  shadow-[0_0_25px_rgba(132,204,22,0.4)] hover:shadow-[0_0_35px_rgba(132,204,22,0.6)]
                  transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                  min-w-[220px] text-center overflow-hidden"
              >
                <span className="relative z-10">Start Free Today</span>
                <div className="absolute inset-0 bg-lime-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12"></div>
              </Link>
            </div>
          </div>

          {/* Right Side: UGC Video */}
          <div className={`flex-shrink-0 w-full max-w-[300px] lg:max-w-[350px] transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative aspect-[9/16] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl group">
              {/* Glowing border effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 rounded-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500 blur-sm"></div>

              <div className="relative bg-black rounded-2xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={video} type="video/mp4" />
                </video>

                {/* Video overlay with play icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                </div>

                {/* Floating play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
