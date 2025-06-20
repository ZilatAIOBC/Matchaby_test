/** @format */

const config = {
	BACKEND_URL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:2340',
};

console.log('🔧 Frontend Config:', config);

export default config;
