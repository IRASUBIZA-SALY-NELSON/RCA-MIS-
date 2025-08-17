import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Toast notification function
  const showToast = (message, type = 'success') => {
    // Create toast element
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateX(400px);
      transition: transform 0.3s ease;
      ${type === 'success' ? 'background: #28a745;' : 
        type === 'error' ? 'background: #dc3545;' : 
        'background: #007bff;'}
    `;
    toast.textContent = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 4 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 4000);
  };

  // Step 1: Email Input
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast('Reset email sent successfully! Check your inbox.', 'success');
      setCurrentStep(2);
    }, 1500);
  };

  // Step 2: OTP Verification
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      showToast('Please enter a valid 6-digit OTP', 'error');
      return;
    }

    // Check if OTP contains only numbers
    if (!/^\d{6}$/.test(otp)) {
      showToast('OTP must contain only numbers', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast('OTP verified successfully!', 'success');
      setCurrentStep(3);
    }, 1500);
  };

  // Handle OTP input change with better validation
  const handleOtpChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = otp.split('');
    newOtp[index] = value;
    const newOtpString = newOtp.join('');
    setOtp(newOtpString);
    
    // Auto-focus next input if current input has a value
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[data-otp-index="${index + 1}"]`);
      if (nextInput) {
        nextInput.focus();
      }
    }
    
    // Auto-focus previous input if current input is empty and backspace was pressed
    if (!value && index > 0) {
      const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Handle OTP input keydown for better UX
  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[data-otp-index="${index - 1}"]`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  // Step 3: New Password Setup
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword.length < 8) {
      showToast('Password must be at least 8 characters long', 'error');
      return;
    }

    // Check password strength
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      showToast('Password must contain uppercase, lowercase, and numbers', 'error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      showToast('Password updated successfully! Redirecting to login...', 'success');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 1500);
  };

  // Get password strength indicator
  const getPasswordStrength = () => {
    if (newPassword.length === 0) return { text: '', color: '#e1e5e9', width: '0%' };
    
    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/\d/.test(newPassword)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) score++;

    const strengthMap = {
      1: { text: 'Very Weak', color: '#dc3545', width: '20%' },
      2: { text: 'Weak', color: '#fd7e14', width: '40%' },
      3: { text: 'Fair', color: '#ffc107', width: '60%' },
      4: { text: 'Good', color: '#28a745', width: '80%' },
      5: { text: 'Strong', color: '#20c997', width: '100%' }
    };

    return strengthMap[score] || { text: 'Very Weak', color: '#dc3545', width: '0%' };
  };

  const passwordStrength = getPasswordStrength();

  // Resend OTP function
  const handleResendOtp = () => {
    showToast('New OTP sent to your email', 'success');
  };

  // Go back to previous step
  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Reset form data when going back
      if (currentStep === 3) {
        setNewPassword('');
        setConfirmPassword('');
      } else if (currentStep === 2) {
        setOtp('');
      }
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '20px'
  };

  const cardStyle = {
    background: 'white',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
    textAlign: 'center'
  };

  const headerStyle = {
    marginBottom: '30px'
  };

  const titleStyle = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px'
  };

  const subtitleStyle = {
    fontSize: '16px',
    color: '#666',
    lineHeight: '1.5'
  };

  const formStyle = {
    textAlign: 'left'
  };

  const inputGroupStyle = {
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '10px',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
    boxSizing: 'border-box'
  };

  const inputFocusStyle = {
    outline: 'none',
    borderColor: '#667eea'
  };

  const passwordInputContainerStyle = {
    position: 'relative'
  };

  const passwordToggleStyle = {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#666'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginBottom: '15px'
  };

  const buttonHoverStyle = {
    background: '#5a6fd8'
  };

  const buttonDisabledStyle = {
    background: '#ccc',
    cursor: 'not-allowed'
  };

  const backButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline'
  };

  const otpContainerStyle = {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  const otpInputStyle = {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    fontSize: '20px',
    border: '2px solid #e1e5e9',
    borderRadius: '10px',
    transition: 'border-color 0.3s ease'
  };

  const resendStyle = {
    textAlign: 'center',
    marginTop: '20px'
  };

  const resendButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    fontSize: '14px',
    textDecoration: 'underline'
  };

  const progressBarStyle = {
    width: '100%',
    height: '4px',
    background: '#e1e5e9',
    borderRadius: '2px',
    marginBottom: '30px',
    overflow: 'hidden'
  };

  const progressFillStyle = {
    height: '100%',
    background: '#667eea',
    transition: 'width 0.3s ease',
    width: `${(currentStep / 3) * 100}%`
  };

  const stepIndicatorStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '30px',
    fontSize: '12px',
    color: '#666'
  };

  const stepStyle = (step) => ({
    padding: '8px 12px',
    borderRadius: '20px',
    background: currentStep >= step ? '#667eea' : '#e1e5e9',
    color: currentStep >= step ? 'white' : '#666',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Progress Bar */}
        <div style={progressBarStyle}>
          <div style={progressFillStyle}></div>
        </div>

        {/* Step Indicators */}
        <div style={stepIndicatorStyle}>
          <div style={stepStyle(1)}>Step 1</div>
          <div style={stepStyle(2)}>Step 2</div>
          <div style={stepStyle(3)}>Step 3</div>
        </div>

        {/* Step 1: Email Input */}
        {currentStep === 1 && (
          <>
            <div style={headerStyle}>
              <h1 style={titleStyle}>Forgot Password?</h1>
              <p style={subtitleStyle}>
                Enter your email address and we'll send you a reset link
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} style={formStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...buttonStyle,
                  ...(isLoading ? buttonDisabledStyle : {})
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.background = '#5a6fd8')}
                onMouseLeave={(e) => !isLoading && (e.target.style.background = '#667eea')}
              >
                {isLoading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </form>

            <button
              type="button"
              onClick={() => navigate('/')}
              style={backButtonStyle}
            >
              ← Back to Login
            </button>
          </>
        )}

        {/* Step 2: OTP Verification */}
        {currentStep === 2 && (
          <>
            <div style={headerStyle}>
              <h1 style={titleStyle}>Verify OTP</h1>
              <p style={subtitleStyle}>
                We've sent a 6-digit code to {email}
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} style={formStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>Enter OTP Code</label>
                <div style={otpContainerStyle}>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={otp[index] || ''}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      data-otp-index={index}
                      style={otpInputStyle}
                      onFocus={(e) => e.target.style.borderColor = '#667eea'}
                      onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                      required
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...buttonStyle,
                  ...(isLoading ? buttonDisabledStyle : {})
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.background = '#5a6fd8')}
                onMouseLeave={(e) => !isLoading && (e.target.style.background = '#667eea')}
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>

              <div style={resendStyle}>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  style={resendButtonStyle}
                >
                  Didn't receive? Resend OTP
                </button>
              </div>
            </form>

            <button
              type="button"
              onClick={goBack}
              style={backButtonStyle}
            >
              ← Back to Email
            </button>
          </>
        )}

        {/* Step 3: New Password Setup */}
        {currentStep === 3 && (
          <>
            <div style={headerStyle}>
              <h1 style={titleStyle}>Set New Password</h1>
              <p style={subtitleStyle}>
                Create a strong password for your account
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} style={formStyle}>
              <div style={inputGroupStyle}>
                <label style={labelStyle}>New Password</label>
                <div style={passwordInputContainerStyle}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={passwordToggleStyle}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {newPassword.length > 0 && (
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      marginBottom: '4px'
                    }}>
                      <span style={{ fontSize: '12px', color: '#666' }}>Password Strength:</span>
                      <span style={{ 
                        fontSize: '12px', 
                        fontWeight: '500',
                        color: passwordStrength.color 
                      }}>
                        {passwordStrength.text}
                      </span>
                    </div>
                    <div style={{ 
                      width: '100%', 
                      height: '4px', 
                      background: '#e1e5e9', 
                      borderRadius: '2px',
                      overflow: 'hidden'
                    }}>
                      <div style={{ 
                        height: '100%', 
                        background: passwordStrength.color,
                        width: passwordStrength.width,
                        transition: 'width 0.3s ease'
                      }}></div>
                    </div>
                  </div>
                )}
                
                <small style={{ color: '#666', fontSize: '12px', marginTop: '8px', display: 'block' }}>
                  Password must be at least 8 characters long and contain uppercase, lowercase, and numbers
                </small>
              </div>

              <div style={inputGroupStyle}>
                <label style={labelStyle}>Confirm New Password</label>
                <div style={passwordInputContainerStyle}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={passwordToggleStyle}
                  >
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...buttonStyle,
                  ...(isLoading ? buttonDisabledStyle : {})
                }}
                onMouseEnter={(e) => !isLoading && (e.target.style.background = '#5a6fd8')}
                onMouseLeave={(e) => !isLoading && (e.target.style.background = '#667eea')}
              >
                {isLoading ? 'Updating...' : 'Update Password'}
              </button>
            </form>

            <button
              type="button"
              onClick={goBack}
              style={backButtonStyle}
            >
              ← Back to OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
