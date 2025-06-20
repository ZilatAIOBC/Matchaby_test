
import HeroSection from "../components/HeroSection";
import HomeActive from "../components/HomeActive";
import BrandLogoCarousel from "../components/BrandLogoCarousel";
import WhyBrandsLoveMatchably from "../components/WhyBrandsLoveMatchably";
import HowItWorks from "../components/HowItWorks";
import CampaignReportPreview from "../components/CampaignReportPreview";
import BrandExamplesShowcase from "../components/BrandExamplesShowcase";
import { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";

import { Helmet } from "react-helmet";
import Devider from "../components/Devider";
import FinalCTA from "../components/FinalCTA";
import useAuthStore from "../state/atoms"; // ✅ import zustand auth store
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLogin } = useAuthStore(); // ✅ access login state
  const navigate = useNavigate();

  const handleMoreCampaignsClick = () => {
    if (isLogin) {
      navigate('/campaigns');
    } else {
      navigate('/signin');
    }
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(
          `${config.BACKEND_URL}/user/campaigns/active`
        );
        if (res.data.status === "success") {
          setDetail(res.data.campaigns);
        }
      } catch (err) {
        console.error("Failed to fetch campaigns:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="bg-black">
       <Helmet>
        <title>Matchably - Stop Chasing Influencers. Get Verified UGC on Autopilot.</title>
        <meta property="og:title" content="Stop chasing influencers. Get verified UGC on autopilot." />
        <meta
          name="description"
          content="No matter what you sell — products or services — Matchably connects you with real creators who deliver authentic content. No DMs. No ghosting. Just real results."
        />
      </Helmet>

      <HeroSection />
      <Devider />

      <BrandLogoCarousel />
      <Devider />

      <WhyBrandsLoveMatchably />
      <Devider />

      <HowItWorks />
      <Devider />

      <CampaignReportPreview />
      <Devider />

      <BrandExamplesShowcase />

      {(loading || detail.length > 0) && (
        <div className="w-full bg-gradient-to-r from-black to-[#080012] flex flex-col items-center pb-10">
          <h1 className="text-[25px] md:text-[30px] text-lime-100 FontNoto mt-10 border-b w-[60%] text-center pb-3">
            Open for You
          </h1>

          {/* ✅ Only show 4 campaigns */}
          <HomeActive detail={detail.slice(0, 3)} loading={loading} />

          {/* ✅ Show message if NOT logged in */}
          {!isLogin && (
            <p className="text-sm text-gray-400 mt-7">
              Sign up to see all available campaigns.
            </p>
          )}

          {/* ✅ Button redirects based on login state */}
          <button
  onClick={handleMoreCampaignsClick}
  className="mt-5 px-6 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
>
  More Campaigns
</button>

        </div>
      )}

      <FinalCTA />

      <div className="bg-gradient-to-r from-black to-[#040014] text-white">
        <Devider />


      </div>
    </div>
  );
}
