import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Toast from './Toast';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  const validateForm = () => {
    if (!email.trim()) {
      showToast('Please enter your email address', 'error');
      return false;
    }
    if (!password.trim()) {
      showToast('Please enter your password', 'error');
      return false;
    }
    if (!email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const result = await login(email, password, rememberMe);
      
      if (result.success) {
        const role = result.user.role;
        const userName = result.user.name || result.user.fullName || 'User';
        
        showToast(`Login successful! Welcome back ${userName}`, 'success');
        
        // Navigate based on role after a short delay to show success toast
        setTimeout(() => {
          switch (role) {
            case 'student':
              navigate('/student');
              break;
            case 'teacher':
              navigate('/teacher');
              break;
            case 'admin':
              navigate('/admin');
              break;
            case 'accountant':
              navigate('/accountant');
              break;
            case 'discipline':
              navigate('/discipline');
              break;
            default:
              navigate('/student');
          }
        }, 1500);
      } else {
        showToast(result.error || 'Invalid credentials. Please check your email and password.', 'error');
      }
    } catch (error) {
      console.error('Login error:', error);
      showToast('An unexpected error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Logo */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10">
          <img 
            src="/rca.png.png" 
            alt="RCA Logo" 
            className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto"
          />
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-2 sm:mb-3">
              School Account Login
            </h1>
            <p className="text-sm sm:text-base text-gray-600 text-center">
              Log In to your account
            </p>
          </div>

          {/* Login Form */}
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-200"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-sm sm:text-base transition-all duration-200"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
              <label className="flex items-center text-gray-600 cursor-pointer text-sm sm:text-base">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 accent-blue-600 w-4 h-4 sm:w-5 sm:h-5"
                  disabled={isLoading}
                />
                Remember Me
              </label>
              <button
                onClick={handleForgotPassword}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-200"
                disabled={isLoading}
              >
                Forgot my password
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className={`w-full py-2 sm:py-3 px-4 rounded-md font-semibold text-white transition-all duration-200 text-sm sm:text-base ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gray-800 hover:bg-gray-900 active:bg-gray-950 transform active:scale-95'
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Logging in...</span>
                </div>
              ) : (
                'Login'
              )}
            </button>

            {/* Forgot Password Link */}
            {/* Registration and Forgot Password Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 mt-6">
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-green-600 hover:text-green-800 font-medium text-sm sm:text-base transition-colors duration-200"
                disabled={isLoading}
              >
                Create New Account
              </button>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base transition-colors duration-200"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </div>
  );
};

export default Login;