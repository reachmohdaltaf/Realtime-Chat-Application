import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import googlelogo from '../../public/logogoogle.png'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  const { login, isLoggingIng } = useAuthStore();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h2>
        <p className="text-sm text-gray-600 text-center mb-8">Please log in to continue</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <button
            disabled={isLoggingIng}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
            type="submit"
          >
            {isLoggingIng ? "Logging in..." : "Log In"}
          </button>
          <div className="text-center mt-4 text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
        <div className="flex items-center my-6">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <button
          className="w-full py-1  text-black flex items-center justify-center gap-4 border font-semibold rounded-lg transition-all duration-300"
          onClick={() => alert("Sign in with Google clicked")}
          type="button"
        >
          <img src={googlelogo} className='h-8' alt="" />
          Sign in with Google
        </button>
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Need help?{' '}
            <Link to="/support" className="text-blue-500 hover:text-blue-700 font-medium">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
