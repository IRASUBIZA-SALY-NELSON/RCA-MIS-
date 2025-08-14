import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Static user data
  const staticUsers = {
    'student@gmail.com': { password: 'student123', role: 'student' },
    'teacher@gmail.com': { password: 'teacher123', role: 'teacher' },
    'accountant@gmail.com': { password: 'accountant123', role: 'accountant' },
    'admin@gmail.com': { password: 'admin123', role: 'admin' },
  };

  const handleLogin = () => {
    if (staticUsers[email] && staticUsers[email].password === password) {
      alert(`Login successful! Welcome ${staticUsers[email].role}`);
      // Here you would typically redirect or update app state
    } else {
      alert('Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    alert('Password reset link sent to your email (demo)');
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f3e8ff 0%, #e0e7ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '16px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    padding: '32px',
    margin: '0 auto'
  };

  const logoContainerStyle = {
    textAlign: 'center',
    marginBottom: '32px'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px'
  };

  const logoIconStyle = {
    width: '32px',
    height: '32px',
    backgroundColor: '#7c3aed',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '14px'
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1f2937'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '24px'
  };

  const headerTitleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px'
  };

  const headerSubtitleStyle = {
    color: '#6b7280',
    fontSize: '14px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '14px',
    transition: 'all 0.2s',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#7c3aed',
    boxShadow: '0 0 0 2px rgba(124, 58, 237, 0.2)'
  };

  const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '16px 0'
  };

  const checkboxLabelStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#6b7280'
  };

  const checkboxStyle = {
    width: '16px',
    height: '16px',
    marginRight: '8px',
    accentColor: '#7c3aed'
  };

  const forgotPasswordStyle = {
    fontSize: '14px',
    color: '#7c3aed',
    textDecoration: 'none',
    cursor: 'pointer',
    border: 'none',
    background: 'none'
  };

  const loginButtonStyle = {
    width: '100%',
    backgroundColor: '#7c3aed',
    color: 'white',
    fontWeight: '500',
    padding: '12px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.2s'
  };

  const demoAccountsStyle = {
    marginTop: '32px',
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px'
  };

  const demoTitleStyle = {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '8px'
  };

  const demoItemStyle = {
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '4px'
  };

  const footerStyle = {
    marginTop: '24px',
    textAlign: 'center'
  };

  const footerTextStyle = {
    fontSize: '12px',
    color: '#9ca3af',
    marginBottom: '8px'
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Logo */}
        <div style={logoContainerStyle}>
          <div style={logoStyle}>
            <div style={logoIconStyle}>
              {'</>'}
            </div>
            <span style={titleStyle}>Beacon Coding Academy</span>
          </div>
        </div>

        {/* Header */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Login</h1>
          <p style={headerSubtitleStyle}>
            Welcome back! Please sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div style={{ marginBottom: '24px' }}>
          {/* Email Input */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            />
          </div>

          {/* Remember Me & Forgot Password */}
          <div style={checkboxContainerStyle}>
            <label style={checkboxLabelStyle}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={checkboxStyle}
              />
              Remember Me
            </label>
            <button
              onClick={handleForgotPassword}
              style={forgotPasswordStyle}
              onMouseOver={(e) => e.target.style.color = '#5b21b6'}
              onMouseOut={(e) => e.target.style.color = '#7c3aed'}
            >
              Forgot my password
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            style={loginButtonStyle}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5b21b6'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#7c3aed'}
          >
            Login
          </button>
        </div>

        {/* Demo Accounts Info */}
        <div style={demoAccountsStyle}>
          <h3 style={demoTitleStyle}>Demo Accounts:</h3>
          <div>
            <div style={demoItemStyle}>• student@gmail.com (password: student123)</div>
            <div style={demoItemStyle}>• teacher@gmail.com (password: teacher123)</div>
            <div style={demoItemStyle}>• accountant@gmail.com (password: accountant123)</div>
            <div style={demoItemStyle}>• admin@gmail.com (password: admin123)</div>
          </div>
        </div>

        {/* Footer Text */}
        <div style={footerStyle}>
          <p style={footerTextStyle}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
          <p style={footerTextStyle}>
            Need help? Contact support
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;