import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Static user data with more detailed information
  const staticUsers = {
    'student@gmail.com': { 
      password: 'student123', 
      role: 'student',
      id: 'S001',
      name: 'John Doe',
      email: 'student@gmail.com',
      class: 'Year 2A',
      studentCode: 'RCA0302RYZ'
    },
    'teacher@gmail.com': { 
      password: 'teacher123', 
      role: 'teacher',
      id: 'T001',
      name: 'Dr. Sarah Mukamana',
      email: 'teacher@gmail.com',
      subject: 'Mathematics',
      subjectCode: 'MATH'
    },
    'admin@gmail.com': { 
      password: 'admin123', 
      role: 'admin',
      id: 'A001',
      name: 'Admin User',
      email: 'admin@gmail.com'
    }
  };

  // Login function
  const login = (email, password) => {
    const user = staticUsers[email];
    if (user && user.password === password) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
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

  // Initialize user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
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
