import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth'; // Import the login function

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setLoading(true);

    try {
      // Call the loginUser function from auth.js
      // It will handle storing the token, role, and userId in localStorage
      const data = await loginUser({ email, password });
      console.log('Login successful:', data);

      // 'data' here will contain { token, role, userId } as returned by loginUser in auth.js
      // The `auth.js` service already stored these in localStorage, so no need to do it here again.

      // Redirect based on the role received in the response
      const userRole = data.role; // Access 'role' directly from the data returned by loginUser

      if (userRole === 'Administrator') { // Ensure role names match your backend's RoleName values
        navigate('/admin/dashboard');
      } else if (userRole === 'Support Agent') {
        navigate('/agent/dashboard');
      } else if (userRole === 'Customer') {
        navigate('/customer/dashboard');
      } else {
        // Fallback for unexpected roles or if role is missing (though auth.js checks for it)
        console.warn('Unknown user role, redirecting to customer dashboard:', userRole);
        navigate('/customer/dashboard');
      }

    } catch (err) {
      console.error('Login error:', err); // Log the full error object for better debugging
      setError(err.message || 'An unexpected error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DAD7CD] p-4 font-sans"> {/* Soft Clay for main background */}
      <div className="w-full max-w-md bg-[#DAD7CD] p-8 rounded-xl shadow-lg border-2 border-[#FFB703] animate-popIn"> {/* Soft Clay for card background, Golden Wheat border */}
        <h1 className="text-4xl font-extrabold text-center text-[##086920] mb-8">Welcome Back!</h1> {/* Primary Green for heading */}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg relative mb-6 shadow-md" role="alert">
            <strong className="font-bold mr-2">Login Error:</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-base font-semibold text-[#2F2F2F] mb-2">Email Address</label> {/* Dark Charcoal for labels */}
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 block w-full px-4 py-2 border border-[##086920] rounded-lg shadow-sm focus:ring-[#FFB703] focus:border-[#FFB703] text-[#2F2F2F] placeholder-[##086920] bg-white transition-all duration-300 ease-in-out hover:border-[#FFB703]" /* Primary Green border, Golden Wheat focus/hover, Dark Charcoal text, Primary Green placeholder */
              placeholder="you@nananomfarms.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-base font-semibold text-[#2F2F2F] mb-2">Password</label> {/* Dark Charcoal for labels */}
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 block w-full px-4 py-2 border border-[##086920] rounded-lg shadow-sm focus:ring-[#FFB703] focus:border-[#FFB703] text-[#2F2F2F] placeholder-[##086920] bg-white transition-all duration-300 ease-in-out hover:border-[#FFB703]" /* Primary Green border, Golden Wheat focus/hover, Dark Charcoal text, Primary Green placeholder */
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFB703] text-[#2F2F2F] p-3 rounded-lg font-bold text-lg hover:bg-[##086920] hover:text-[#FFFFFF] transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#086920] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100" /* Golden Wheat background, Dark Charcoal text. Hover to Primary Green background, Pure White text. Golden Wheat focus ring. */
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging In...
              </span>
            ) : (
              'Login to Nananom Farms'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-base text-[#2F2F2F]"> {/* Dark Charcoal for text */}
          Don't have an account?{' '}
          <Link to="/register" className="font-semibold text-[##086920] hover:text-[#FFB703] hover:underline transition-colors duration-300"> {/* Primary Green link, Golden Wheat on hover */}
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;