/** @format */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import config from '../config';

export default function BrandAuth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔍 Attempting login with:', { email, backend: config.BACKEND_URL });

    try {
      const res = await fetch(`${config.BACKEND_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('📡 Response status:', res.status);

      if (!res.ok) {
        const errorText = await res.text();
        console.error('❌ HTTP Error:', res.status, errorText);
        setError(`Server error: ${res.status}. Please check if the backend is running.`);
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('📦 Response data:', data);

      if (data.status === 'failed') {
        setError(data.message || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('BRAND_TOKEN', data.token);
      console.log('✅ Login successful, redirecting to dashboard');
      navigate('/brand/dashboard');
    } catch (err) {
      console.error('💥 Network/Parse error:', err);
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        setError('Cannot connect to server. Please check if the backend is running on port 2340.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#1f1f1f] rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          {/* Brand Login title removed */}
        </div>

        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-300">Work Email</label>
            <input
              type="email"
              name="email"
              required
              placeholder="brand@example.com"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-medium py-2 rounded-lg disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 flex flex-col items-center text-sm text-gray-400">
          <Link
            to="/forgot-password-brand"
            className="hover:text-indigo-400 underline mb-2"
          >
            Forgot your password?
          </Link>
          <p>
            Don't have a brand account?{' '}
            <Link to="/brand-signup" className="text-indigo-400 underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
