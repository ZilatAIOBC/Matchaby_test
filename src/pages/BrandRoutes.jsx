import { Routes, Route, useParams } from 'react-router-dom';
import BrandDashboard from '../pages/brandpages/BrandDashboard';
import Pricing from '../components/PricingPlans';
import PaymentSuccess from '../components/brand/PaymentSuccess'; // ✅ import
import BrandHistory from '../components/brand/BrandHistory';
import BrandCampaign from '../components/brand/BrandCampaign';
import BrandCampaigns from '../pages/brandpages/BrandCampaigns'; // ✅ NEW campaigns page
import BrandCampaignDetail from '../pages/brandpages/BrandCampaignDetail'; // ✅ NEW campaign detail page
import BrandApplication from '../components/brand/BrandApplication';
import BrandCampaignSubmission from '../components/brand/BrandCampaignSubmission'; // ✅ import
import BrandSettings from '../pages/brandpages/BrandSettings'; // ✅ import if needed
import ActivePlan from './brandpages/ActivePlan';
import BrandTasks from '../pages/brandpages/BrandTasks'; // ✅ NEW tasks page


export default function BrandRoutes() {
  // const { campaignId } = useParams();

  return (
    <Routes>
      <Route path='dashboard' element={<BrandDashboard />} />
      <Route path='pricing' element={<Pricing />} />
      <Route path='payment-success' element={<PaymentSuccess />} /> {/* ✅ ADD THIS */}
      <Route path='payment-history' element={<BrandHistory />} />
      <Route path='campaigns' element={<BrandCampaigns />} /> {/* ✅ NEW campaigns page */}
      <Route path='campaigns/new' element={<BrandCampaign />} /> {/* ✅ NEW campaign creation */}
      <Route path='campaigns/:id' element={<BrandCampaignDetail />} /> {/* ✅ NEW campaign detail page */}
      <Route path='create-campaign' element={<BrandCampaign />} />
      <Route path='brand-applications/:campaignId' element={<BrandApplication />} />
      <Route
  path="campaign-submission/:campaignId/:email"
  element={<BrandCampaignSubmission />}
/>
<Route path='activeplan' element={<ActivePlan />} />
<Route path='brand-settings' element={<BrandSettings />} />
<Route path='tasks' element={<BrandTasks />} />
    </Routes>
  );
}
