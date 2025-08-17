// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import Toast from './Toast';

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [toast, setToast] = useState(null);

//   const showToast = (message, type = 'info') => {
//     setToast({ message, type });
//   };

//   const hideToast = () => {
//     setToast(null);
//   };

//   const validateForm = () => {
//     if (!email.trim()) {
//       showToast('Please enter your email address', 'error');
//       return false;
//     }
//     if (!password.trim()) {
//       showToast('Please enter your password', 'error');
//       return false;
//     }
//     if (!email.includes('@')) {
//       showToast('Please enter a valid email address', 'error');
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async () => {
//     if (!validateForm()) return;

//     setIsLoading(true);
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       const result = login(email, password);
      
//       if (result.success) {
//         const role = result.user.role;
//         showToast(`Login successful! Welcome ${role}`, 'success');
        
//         // Navigate based on role after a short delay to show success toast
//         setTimeout(() => {
//           switch (role) {
//             case 'student':
//               navigate('/student');
//               break;
//             case 'teacher':
//               navigate('/teacher');
//               break;
//             case 'admin':
//               navigate('/admin');
//               break;
//             default:
//               navigate('/student');
//           }
//         }, 1500);
//       } else {
//         showToast(result.error || 'Invalid credentials. Please try again.', 'error');
//       }
//     } catch (error) {
//       showToast('An unexpected error occurred. Please try again.', 'error');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleForgotPassword = () => {
//     showToast('Password reset link sent to your email (demo)', 'info');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !isLoading) {
//       handleLogin();
//     }
//   };

//   const containerStyle = {
//     minHeight: '100vh',
//     backgroundColor: '#f8f9fa',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: '16px',
//     fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//   };

//   const logoContainerStyle = {
//     textAlign: 'center',
//     marginBottom: '32px'
//   };

//   const logoStyle = {
//     width: '80px',
//     height: '80px',
//     margin: '0 auto 16px'
//   };

//   const cardStyle = {
//     width: '100%',
//     maxWidth: '400px',
//     backgroundColor: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
//     padding: '32px',
//     margin: '0 auto'
//   };

//   const titleStyle = {
//     fontSize: '24px',
//     fontWeight: '700',
//     color: '#374151',
//     marginBottom: '8px',
//     textAlign: 'center'
//   };

//   const subtitleStyle = {
//     fontSize: '14px',
//     color: '#6b7280',
//     textAlign: 'center',
//     marginBottom: '32px'
//   };

//   const inputGroupStyle = {
//     marginBottom: '20px'
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '12px 16px',
//     backgroundColor: '#f8f9fa',
//     border: '1px solid #e5e7eb',
//     borderRadius: '6px',
//     outline: 'none',
//     fontSize: '14px',
//     transition: 'all 0.2s',
//     boxSizing: 'border-box',
//     color: '#374151'
//   };

//   const inputFocusStyle = {
//     ...inputStyle,
//     borderColor: '#1f2937',
//     backgroundColor: '#ffffff'
//   };

//   const passwordContainerStyle = {
//     position: 'relative'
//   };

//   const eyeIconStyle = {
//     position: 'absolute',
//     right: '16px',
//     top: '50%',
//     transform: 'translateY(-50%)',
//     cursor: 'pointer',
//     color: '#6b7280',
//     fontSize: '16px',
//     userSelect: 'none'
//   };

//   const checkboxContainerStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     margin: '20px 0 24px'
//   };

//   const checkboxLabelStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     fontSize: '14px',
//     color: '#6b7280',
//     cursor: 'pointer'
//   };

//   const checkboxStyle = {
//     width: '16px',
//     height: '16px',
//     marginRight: '8px',
//     accentColor: '#1f2937'
//   };

//   const forgotPasswordStyle = {
//     fontSize: '14px',
//     color: '#374151',
//     textDecoration: 'none',
//     cursor: 'pointer',
//     border: 'none',
//     background: 'none',
//     fontWeight: '500'
//   };

//   const loginButtonStyle = {
//     width: '100%',
//     backgroundColor: '#1f2937',
//     color: 'white',
//     fontWeight: '600',
//     padding: '12px 16px',
//     borderRadius: '6px',
//     border: 'none',
//     cursor: 'pointer',
//     fontSize: '16px',
//     transition: 'background-color 0.2s'
//   };

//   const loginButtonDisabledStyle = {
//     ...loginButtonStyle,
//     backgroundColor: '#9ca3af',
//     cursor: 'not-allowed'
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Logo */}
//       <div style={logoContainerStyle}>
//         <img 
//           src="/rca.png" 
//           alt="RCA Logo" 
//           style={logoStyle}
//         />
//       </div>

//       {/* Login Card */}
//       <div style={cardStyle}>
//         {/* Header */}
//         <div style={{ marginBottom: '32px' }}>
//           <h1 style={titleStyle}>School Account Login</h1>
//           <p style={subtitleStyle}>Log In to your account</p>
//         </div>

//         {/* Login Form */}
//         <div>
//           {/* Email Input */}
//           <div style={inputGroupStyle}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               onKeyPress={handleKeyPress}
//               style={inputStyle}
//               onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//               onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//               disabled={isLoading}
//             />
//           </div>

//           {/* Password Input */}
//           <div style={inputGroupStyle}>
//             <div style={passwordContainerStyle}>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 style={inputStyle}
//                 onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
//                 onBlur={(e) => Object.assign(e.target.style, inputStyle)}
//                 disabled={isLoading}
//               />
//               <span
//                 style={eyeIconStyle}
//                 onClick={() => setShowPassword(!showPassword)}
//                 title={showPassword ? 'Hide password' : 'Show password'}
//               >
//                 {showPassword ? '👁️' : '👁️‍🗨️'}
//               </span>
//             </div>
//           </div>

//           {/* Remember Me & Forgot Password */}
//           <div style={checkboxContainerStyle}>
//             <label style={checkboxLabelStyle}>
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 style={checkboxStyle}
//                 disabled={isLoading}
//               />
//               Remember Me
//             </label>
//             <button
//               onClick={handleForgotPassword}
//               style={forgotPasswordStyle}
//               disabled={isLoading}
//             >
//               Forgot my password
//             </button>
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             style={isLoading ? loginButtonDisabledStyle : loginButtonStyle}
//             onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = '#111827')}
//             onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = '#1f2937')}
//             disabled={isLoading}
//           >
//             {isLoading ? 'Logging in...' : 'Login'}
//           </button>
//         </div>
//       </div>

//       {/* Toast Notifications */}
//       {toast && (
//         <Toast
//           message={toast.message}
//           type={toast.type}
//           onClose={hideToast}
//         />
//       )}
//     </div>
//   );
// };

// export default Login;




import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
      // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      const result = login(email, password);
      if (result.success) {
        const role = result.user.role;
        navigate(`/${role}`);
      } else {
        console.error('Login failed:', result.error);
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-slate-700 rounded-full flex items-center justify-center">
            <div className="text-white text-xs font-bold">
              <div>&lt;/&gt;</div>
              <div className="mt-1">RCA</div>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              School Account Login
            </h1>
            <p className="text-sm text-gray-500">
              Log in to your account
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-800 focus:bg-white transition-all duration-200 text-sm"
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-0 focus:border-gray-800 focus:bg-white transition-all duration-200 text-sm pr-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 mr-2 accent-gray-800"
                  disabled={isLoading}
                />
                Remember Me
              </label>
              <button
                type="button"
                className="text-gray-800 hover:text-gray-600 font-medium"
                disabled={isLoading}
              >
                Forgot my password
              </button>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-md transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;