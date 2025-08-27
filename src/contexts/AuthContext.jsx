import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi, userApi } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const readAuth = () => {
    try {
      const raw = localStorage.getItem('auth');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  };


  const normalizeRole = (roles) => {
    const roleSet = new Set((roles || []).map(r => r?.toUpperCase?.() || r));
    if (roleSet.has('SUPER_ADMIN') || roleSet.has('ADMIN') || roleSet.has('ROLE_ADMIN')) return 'admin';
    if (roleSet.has('TEACHER') || roleSet.has('ROLE_TEACHER')) return 'teacher';
    if (roleSet.has('ACCOUNTANT') || roleSet.has('ROLE_ACCOUNTANT')) return 'accountant';
    if (roleSet.has('DISCIPLINE') || roleSet.has('ROLE_DISCIPLINE')) return 'discipline';
    if (roleSet.has('STUDENT') || roleSet.has('ROLE_STUDENT')) return 'student';
    return 'student';
  };

  const buildCurrentUser = (resp) => {
    const role = normalizeRole(resp.roles);
    const user = resp.user || {};
    const name = user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email || 'Unknown User';
    
    return {
      id: user.id,
      name,
      email: user.email,
      role,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
      profilePicture: user.profilePicture,
      // Role-specific fields
      class: user.class || null,
      studentCode: user.studentCode || null,
      employeeId: user.employeeId || null,
      department: user.department || null,
      position: user.position || null,
      // Timestamps
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLoginAt: user.lastLoginAt
    };
  };

  // Registration function
  const register = async (userData) => {
    try {
      const resp = await authApi.register(userData);
      return { success: true, message: 'Registration successful! Please login with your credentials.' };
    } catch (error) {
      return { success: false, error: error.message || 'Registration failed. Please try again.' };
    }
  };

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      // Authenticate with the backend
      const resp = await authApi.login(email, password, rememberMe);
      
      // Store authentication data
      const authPayload = {
        accessToken: resp.accessToken,
        refreshToken: resp.refreshToken,
        expiresIn: resp.expiresIn,
        roles: resp.roles,
        permissions: resp.permissions,
        user: resp.user
      };
      localStorage.setItem('auth', JSON.stringify(authPayload));
      
      // Build and store user profile
      const user = buildCurrentUser(resp);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Fetch additional profile data if available
      try {
        const fullProfile = await authApi.getProfile();
        const enhancedUser = buildCurrentUser({ ...resp, user: fullProfile });
        setCurrentUser(enhancedUser);
        localStorage.setItem('currentUser', JSON.stringify(enhancedUser));
      } catch (profileError) {
        console.warn('Could not fetch full profile:', profileError.message);
      }
      
      return { success: true, user };
    } catch (e) {
      return { success: false, error: e.message || 'Invalid credentials. Please check your email and password.' };
    }
  };

  // Logout function
  const logout = async () => {
    try { await authApi.logout(); } catch (e) { /* ignore */ }
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('auth');
  };

  // Check if user has permission for specific actions
  const hasPermission = (permission) => {
    if (!currentUser) return false;
    
    const permissions = {
      student: [
        'view_own_marks',
        'view_own_assignments',
        'view_own_attendance',
        'view_own_report_card',
        'view_own_projects',
        'view_own_opportunities'
      ],
      teacher: [
        'manage_own_classes',
        'manage_own_students',
        'manage_own_marks',
        'manage_own_assignments',
        'manage_own_attendance',
        'create_reports',
        'send_communications',
        'manage_own_projects',
        'manage_own_exams'
      ],
      accountant: [
        'manage_payments',
        'view_financial_data',
        'manage_student_fees',
        'generate_financial_reports',
        'manage_debts',
        'view_student_records'
      ],
      discipline: [
        'manage_conduct_records',
        'manage_incidents',
        'view_student_behavior',
        'generate_discipline_reports',
        'manage_disciplinary_actions'
      ],
      admin: [
        'manage_all_users',
        'manage_all_classes',
        'manage_all_subjects',
        'view_all_data',
        'system_settings'
      ]
    };

    return permissions[currentUser.role]?.includes(permission) || false;
  };

  // Check if user can access specific data
  const canAccessData = (dataType, dataOwner) => {
    if (!currentUser) return false;
    
    switch (currentUser.role) {
      case 'student':
        // Students can only access their own data
        return dataOwner === currentUser.id || dataOwner === currentUser.studentCode;
      case 'teacher':
        // Teachers can access data for students in their classes
        if (dataType === 'student' && dataOwner.class) {
          // This would need to be expanded based on actual class assignments
          return true; // For now, allow access to all student data
        }
        return true; // Teachers have broad access within their scope
      case 'accountant':
        // Accountants can access financial and student data
        return dataType === 'financial' || dataType === 'student' || dataType === 'payment';
      case 'discipline':
        // Discipline masters can access conduct and student data
        return dataType === 'conduct' || dataType === 'student' || dataType === 'incident';
      case 'admin':
        // Admins can access all data
        return true;
      default:
        return false;
    }
  };

  // Refresh user profile from database
  const refreshUserProfile = async () => {
    try {
      const profile = await authApi.getProfile();
      const auth = readAuth();
      if (auth && profile) {
        const enhancedUser = buildCurrentUser({ ...auth, user: profile });
        setCurrentUser(enhancedUser);
        localStorage.setItem('currentUser', JSON.stringify(enhancedUser));
        return enhancedUser;
      }
    } catch (error) {
      console.warn('Could not refresh user profile:', error.message);
    }
    return null;
  };

  // Update user profile
  const updateUserProfile = async (profileData) => {
    try {
      const updatedProfile = await authApi.updateProfile(profileData);
      const auth = readAuth();
      if (auth && updatedProfile) {
        const enhancedUser = buildCurrentUser({ ...auth, user: updatedProfile });
        setCurrentUser(enhancedUser);
        localStorage.setItem('currentUser', JSON.stringify(enhancedUser));
        return { success: true, user: enhancedUser };
      }
      return { success: false, error: 'Failed to update profile' };
    } catch (error) {
      return { success: false, error: error.message || 'Failed to update profile' };
    }
  };

  // Initialize user from localStorage on app start and validate token
  useEffect(() => {
    const init = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        const savedAuth = localStorage.getItem('auth');
        
        if (savedUser && savedAuth) {
          const user = JSON.parse(savedUser);
          setCurrentUser(user);
          
          // Validate token and refresh profile in background
          try {
            const isValid = await authApi.validateToken();
            if (isValid) {
              // Try to refresh user profile from database
              await refreshUserProfile();
            } else {
              await logout();
            }
          } catch (error) {
            console.warn('Token validation failed:', error.message);
            // Keep user logged in with cached data if backend is unavailable
          }
        }
      } catch (error) {
        console.error('Initialization error:', error);
        await logout();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const value = {
    currentUser,
    login,
    register,
    logout,
    hasPermission,
    canAccessData,
    refreshUserProfile,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
