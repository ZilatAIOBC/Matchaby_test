/** @format */

import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LogOut,
  LayoutDashboard,
  Package,
  BadgeDollarSign,
  Megaphone,
  Plus,
  ReceiptText,
  Settings,
} from 'lucide-react';
import { FaTasks } from "react-icons/fa"; 
import BrandRoutes from '../../pages/BrandRoutes';

export default function BrandSidebarLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('BRAND_TOKEN');
    navigate('/brand-auth');
  };

  const menu = [
    {
      name: 'Dashboard',
      path: '/brand/dashboard',
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: 'My Plan',
      path: '/brand/activeplan',
      icon: <Package size={18} />, // 📦 updated
    },
    {
      name: 'Compare Plans',
      path: '/brand/pricing',
      icon: <BadgeDollarSign size={18} />, // 💰 updated
    },
    {
      name: 'My Campaigns',
      path: '/brand/campaigns',
      icon: <Megaphone size={18} />, // 📢 updated
    },
    {
      name: 'Create Campaign',
      path: '/brand/create-campaign',
      icon: <Plus size={18} />, // ➕ updated
    },
    {
      name: 'Tasks',
      path: '/brand/tasks',
      icon: <FaTasks size={18} />, // 📋 updated
    },
    {
      name: 'Payment History',
      path: '/brand/payment-history',
      icon: <ReceiptText size={18} />, // 🧾 updated
    },
    {
      name: 'Brand Settings',
      path: '/brand/brand-settings',
      icon: <Settings size={18} />, // ⚙️ updated
    },
  ];

  return (
    <div className='flex h-screen bg-[#0e0e0e] text-white overflow-hidden'>
      {/* Sidebar */}
      <aside className='w-64 bg-[#141414] p-5 border-r border-gray-800 flex flex-col justify-between'>
        <div>
          <Link to="/">
  <h2 className="pl-5 text-2xl font-bold mb-8 text-blue-600 cursor-pointer">
    MATCHABLY
  </h2>
</Link>

          <nav className='space-y-2'>
            {menu.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive(item.path)
                    ? 'bg-[#1e1e1e] text-white border-l-4 border-blue-600'
                    : 'text-gray-400 hover:bg-[#1e1e1e] hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className='flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-[#1e1e1e] hover:text-red-500 transition font-medium'
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className='flex-1 h-full overflow-y-auto p-6'>
        <BrandRoutes />
      </main>
    </div>
  );
}
