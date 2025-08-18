import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

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

  // Demo accounts fallback (for when backend is unavailable)
  const demoAccounts = {
    'student@gmail.com': {
      password: 'student123',
      roles: ['ROLE_STUDENT'],
      user: { id: 'stu-1', email: 'student@gmail.com', fullName: 'Demo Student' }
    },
    'teacher@gmail.com': {
      password: 'teacher123',
      roles: ['ROLE_TEACHER'],
      user: { id: 'tch-1', email: 'teacher@gmail.com', fullName: 'Demo Teacher' }
    },
    'admin@gmail.com': {
      password: 'admin123',
      roles: ['ROLE_ADMIN'],
      user: { id: 'adm-1', email: 'admin@gmail.com', fullName: 'Demo Admin' }
    }
  };

  const buildDemoAuthResponse = (email) => {
    const entry = demoAccounts[email];
    return {
      accessToken: 'demo-access-token',
      refreshToken: 'demo-refresh-token',
      expiresIn: 3600,
      roles: entry.roles,
      permissions: [],
      user: entry.user
    };
  };

  const normalizeRole = (roles) => {
    const roleSet = new Set((roles || []).map(r => r?.toUpperCase?.() || r));
    if (roleSet.has('SUPER_ADMIN') || roleSet.has('ADMIN') || roleSet.has('ROLE_ADMIN')) return 'admin';
    if (roleSet.has('TEACHER') || roleSet.has('ROLE_TEACHER')) return 'teacher';
    if (roleSet.has('STUDENT') || roleSet.has('ROLE_STUDENT')) return 'student';
    return 'student';
  };

  const buildCurrentUser = (resp) => {
    const role = normalizeRole(resp.roles);
    const name = resp.user?.fullName || [resp.user?.firstName, resp.user?.lastName].filter(Boolean).join(' ') || resp.user?.email;
    return {
      id: resp.user?.id,
      name,
      email: resp.user?.email,
      role,
      // Optional fields used in some views; may be undefined until implemented in backend
      class: null,
      studentCode: null
    };
  };

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      const resp = await authApi.login(email, password, rememberMe);
      const authPayload = {
        accessToken: resp.accessToken,
        refreshToken: resp.refreshToken,
        expiresIn: resp.expiresIn,
        roles: resp.roles,
        permissions: resp.permissions,
        user: resp.user
      };
      localStorage.setItem('auth', JSON.stringify(authPayload));
      const user = buildCurrentUser(resp);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    } catch (e) {
      // Fallback to demo accounts if credentials match
      const demo = demoAccounts[email];
      if (demo && demo.password === password) {
        const resp = buildDemoAuthResponse(email);
        const authPayload = {
          accessToken: resp.accessToken,
          refreshToken: resp.refreshToken,
          expiresIn: resp.expiresIn,
          roles: resp.roles,
          permissions: resp.permissions,
          user: resp.user
        };
        localStorage.setItem('auth', JSON.stringify(authPayload));
        const user = buildCurrentUser(resp);
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return { success: true, user, demo: true };
      }
      return { success: false, error: e.message || 'Login failed' };
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
      case 'admin':
        // Admins can access all data
        return true;
      default:
        return false;
    }
  };

  // Initialize user from localStorage on app start and validate token
  useEffect(() => {
    const init = async () => {
      try {
        const savedUser = localStorage.getItem('currentUser');
        const savedAuth = localStorage.getItem('auth');
        if (savedUser && savedAuth) {
          setCurrentUser(JSON.parse(savedUser));
          // validate in background
          try {
            const isValid = await authApi.validateToken();
            if (!isValid) {
              await logout();
            }
          } catch (_) {
            // best-effort
          }
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const value = {
    currentUser,
    login,
    logout,
    hasPermission,
    canAccessData,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
