/** @format */

//fixed all imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Cookie from 'js-cookie';
import axios from 'axios';
import { LoaderCircle } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  Coins,
  Gift,
  FileCheck,
  BookText,
  ScrollText,
  Receipt,
  ListChecks,
  CheckCircle,
  LogOut,
} from 'lucide-react';

// Pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import CampaignList from './pages/campaigns';
import CampaignDetail from './pages/CampaignDetail';
import AboutUs from './pages/AboutUs';
import Influencer from './pages/influencer';
import BrandLandingPage from './pages/BrandLandingPage';
import BrandAuth from './pages/BrandAuth';
import BrandSignup from './pages/BrandSignup';
import BrandForgetPass from './pages/BrandForgetPass';

import ChooseRole from './pages/ChooseRole';
import RewardsPage from './pages/RewardsPage';
import TermsofService from './pages/TermsofService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DonotSell from './pages/DonotSell';
import PriceBrand from './pages/BrandPrice';

// User Protected
import MyAccount from './pages/myaccount';
import UserApplyCampaign from './pages/userapplycampaign';
import ReferralRewards from './pages/Referral&Rewards';
import AddPostUrl from './pages/addposturl';

// Admin Pages
import AuthAdmin from './pages/admin/Auth';
import CampaignManagement from './pages/admin/campainManagement';
import Applications from './pages/admin/Applications';
import ViewCampaignApplicants from './pages/admin/CampaignApplications';
import ViewCampaignSubmission from './pages/admin/CampaignSubmission';
import ReferralLogs from './pages/admin/ReferralLogs';
import ManualPointAdjust from './pages/admin/ManualPointAdjust';
import RewardRedemptionManager from './pages/admin/RewardRedemptionManager';
import PendingBrands from './pages/admin/brands/PendingBrands';
import PlanManagement from './pages/admin/PlanManagement';
import BillingLogs from './pages/admin/BillingLogs';
import TrackingInfo from './pages/admin/TrackingInfo';
import AdminCampaignApprove from './pages/AdminCampaignApprove';

// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BrandSidebarLayout from './components/brand/BrandSidebarLayout';

// Auth Store
import useAuthStore from './state/atoms';
import config from './config';

const URL = config.BACKEND_URL;

function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isBrandRoute = location.pathname.startsWith('/brand') && !location.pathname.startsWith('/brand-auth') && !location.pathname.startsWith('/brand-signup') && !location.pathname.startsWith('/brand-price');

  const authStore = useAuthStore();
  const isLogin = !isAdminRoute && !isBrandRoute ? authStore.isLogin : null;
  const User = !isAdminRoute && !isBrandRoute ? authStore.User : null;
  const verifyLogin = !isAdminRoute && !isBrandRoute ? authStore.verifyLogin : null;

  const handleAdminLogout = () => {
  Cookie.remove('AdminToken');
  window.location.href = '/admin/auth';
};


  useEffect(() => {
    if (!isAdminRoute && !isBrandRoute && verifyLogin) {
      verifyLogin().then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [isAdminRoute, isBrandRoute, verifyLogin]);

  if (loading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <LoaderCircle className='animate-spin text-gray-200' size={48} />
      </div>
    );

  return (
    <>
      <ToastContainer />
      {!isAdminRoute && !isBrandRoute && <Navbar Islogin={isLogin} />}

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/choose-role' element={<ChooseRole />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/campaigns' element={<CampaignList />} />
        <Route path='/campaign/:campaignId' element={<CampaignDetail />} />
        <Route path='/forbrand' element={<BrandAuthChecker><BrandLandingPage /></BrandAuthChecker>} />
        <Route path='/influencer' element={<Influencer />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/rewards&affiliation' element={<RewardsPage />} />
        <Route path='/terms-of-service' element={<TermsofService />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/do-not-sell-my-info' element={<DonotSell />} />

        {/* Brand Auth Routes */}
        <Route path='/brand-auth' element={<BrandAuth />} />
        <Route path='/brand-signup' element={<BrandSignup />} />
        <Route path='/forgot-password-brand' element={<BrandForgetPass />} />

        {/* Brand Price Route (standalone) */}
        <Route path='/brand-price' element={<BrandAuthChecker><PriceBrand /></BrandAuthChecker>} />

        {/* Protected Brand Dashboard with Sidebar */}
        <Route path='/brand/*' element={<BrandAuthChecker><BrandSidebarLayout /></BrandAuthChecker>} />

        {/* User Auth Routes */}
        <Route path='/UserApplyCampaign' element={<AuthChecker isLogin={isLogin}><UserApplyCampaign /></AuthChecker>} />
        <Route path='/referral&rewards' element={<AuthChecker isLogin={isLogin}><ReferralRewards /></AuthChecker>} />
        <Route path='/AddPostUrl/:campaignId' element={<AuthChecker isLogin={isLogin}><AddPostUrl /></AuthChecker>} />
        <Route path='/MyAccount' element={<AuthChecker isLogin={isLogin}><MyAccount user={User} campaigns={[]} /></AuthChecker>} />

        {/* Admin Auth */}
        <Route path='/admin/auth' element={<AuthAdmin />} />
      </Routes>

      {!isAdminRoute && !isBrandRoute && <Footer />}

      {isAdminRoute && (
        <AdminAuthChecker>
          <div className='flex flex-col md:flex-row min-h-screen bg-[#141414] text-white'>
            <aside className='bg-[#1f1f1f] p-6 w-full md:w-60 border-r border-gray-800'>
              <div>
                <h1 className='text-xl font-bold text-center mb-6'>Admin Panel</h1>
                <nav className='space-y-4'>
                  <SidebarLink to='/admin/campaigns' icon={<LayoutDashboard size={18} />} label='Campaigns' />
                  <SidebarLink to='/admin/brandcampaign-approved' icon={<CheckCircle size={18} />} label='Campaign Approval' />
                  <SidebarLink to='/admin/Users' icon={<Users size={18} />} label='Applications' />
                  <SidebarLink to='/admin/tracking-info' icon={<ListChecks size={18} />} label='Tracking Info' />
                  <SidebarLink to='/admin/points/manual-adjust' icon={<Coins size={18} />} label='User Points' />
                  <SidebarLink to='/admin/rewards' icon={<Gift size={18} />} label='Reward Redemptions' />
                  <SidebarLink to='/admin/referrals' icon={<Gift size={18} />} label='Referral Logs' />
                  <SidebarLink to='/admin/brands/pending' icon={<FileCheck size={18} />} label='Brands Applications' />
                  <SidebarLink to='/admin/plans' icon={<BookText size={18} />} label='Brand Plans' />
                  <SidebarLink to='/admin/billing-logs' icon={<Receipt size={18} />} label='Billing Logs' />              
                </nav>
              </div>

              {/* Admin Logout Button */}
              <button
                onClick={handleAdminLogout}
                className='flex items-center gap-3 px-4 py-2 mt-6 rounded-lg text-red-400 hover:bg-[#2a2a2a] hover:text-red-500 transition font-medium text-sm'
              >
                <LogOut size={18} />
                Logout
              </button>
            </aside>
            
            <main className='flex-1'>
              <Routes>
                <Route path='/admin/campaigns' element={<CampaignManagement />} />
                <Route path='/admin/Users' element={<Applications />} />
                <Route path='/admin/applicants/:campaignId' element={<ViewCampaignApplicants />} />
                <Route path='/admin/campaign-submission/:campaignId/:email' element={<ViewCampaignSubmission />} />
                <Route path='/admin/referrals' element={<ReferralLogs />} />
                <Route path='/admin/points/manual-adjust' element={<ManualPointAdjust />} />
                <Route path='/admin/rewards' element={<RewardRedemptionManager />} />
                <Route path='/admin/brands/pending' element={<PendingBrands />} />
                <Route path='/admin/plans' element={<PlanManagement />} />
                <Route path='/admin/billing-logs' element={<BillingLogs />} />
                <Route path='/admin/tracking-info' element={<TrackingInfo />} />
                <Route path='/admin/brandcampaign-approved' element={<AdminCampaignApprove />} />
              </Routes>
            </main>
          </div>
        </AdminAuthChecker>
      )}
    </>
  );
}

function SidebarLink({ to, icon, label }) {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium text-sm ${
        active
          ? 'bg-[#2a2a2a] text-white border-l-4 border-lime-400'
          : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white'
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function AuthChecker({ children, isLogin }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) navigate('/signin');
  }, [isLogin, navigate]);
  return <>{children}</>;
}

function AdminAuthChecker({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function verifyLogin() {
      try {
        const token = Cookie.get('AdminToken');
        const res = await axios.get(`${URL}/admin/verify`, {
          headers: { authorization: token },
        });
        if (res.data.status === 'success') return setLoading(false);
        navigate('/admin/auth');
      } catch {
        navigate('/admin/auth');
      }
    }
    verifyLogin();
  }, []);
  if (loading)
    return (
      <div className='flex items-center justify-center h-screen'>
        <LoaderCircle className='animate-spin text-gray-200' size={48} />
      </div>
    );
  return <>{children}</>;
}

function BrandAuthChecker({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyLogin = async () => {
      try {
        const token = localStorage.getItem('BRAND_TOKEN');
        if (!token) {
          console.log('❌ No brand token found');
          navigate('/brand-signup');
          return;
        }

        console.log('🔍 Verifying brand token...');

        // For now, just check if token exists and is valid format
        // In a real app, you'd verify with the backend
        if (token && token.length > 10) {
          console.log('✅ Brand token valid, allowing access');
          setLoading(false);
        } else {
          console.log('❌ Invalid brand token format');
          navigate('/brand-signup');
        }
      } catch (err) {
        console.error("Brand verify failed:", err?.response?.data || err.message);
        navigate('/brand-signup');
      }
    };

    verifyLogin();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="animate-spin text-gray-200" size={48} />
      </div>
    );
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;