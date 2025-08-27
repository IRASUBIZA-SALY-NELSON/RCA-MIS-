// User profile and management service
import { authApi, userApi } from './api';

export const userService = {
  // Profile management
  async getCurrentUserProfile() {
    try {
      return await authApi.getProfile();
    } catch (error) {
      console.error('Failed to fetch current user profile:', error);
      throw error;
    }
  },

  async updateCurrentUserProfile(profileData) {
    try {
      return await authApi.updateProfile(profileData);
    } catch (error) {
      console.error('Failed to update current user profile:', error);
      throw error;
    }
  },

  async getUserProfile(userId) {
    try {
      return await userApi.getProfile(userId);
    } catch (error) {
      console.error(`Failed to fetch user profile for ID ${userId}:`, error);
      throw error;
    }
  },

  // User management (admin functions)
  async getAllUsers() {
    try {
      return await userApi.getAllUsers();
    } catch (error) {
      console.error('Failed to fetch all users:', error);
      throw error;
    }
  },

  async getUsersByRole(role) {
    try {
      return await userApi.getUsersByRole(role);
    } catch (error) {
      console.error(`Failed to fetch users with role ${role}:`, error);
      throw error;
    }
  },

  async createUser(userData) {
    try {
      return await userApi.createUser(userData);
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  },

  async updateUser(userId, userData) {
    try {
      return await userApi.updateProfile(userId, userData);
    } catch (error) {
      console.error(`Failed to update user ${userId}:`, error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      return await userApi.deleteUser(userId);
    } catch (error) {
      console.error(`Failed to delete user ${userId}:`, error);
      throw error;
    }
  },

  // Role-specific data fetching
  async getStudents() {
    return this.getUsersByRole('student');
  },

  async getTeachers() {
    return this.getUsersByRole('teacher');
  },

  async getAccountants() {
    return this.getUsersByRole('accountant');
  },

  async getDisciplineStaff() {
    return this.getUsersByRole('discipline');
  },

  async getAdmins() {
    return this.getUsersByRole('admin');
  },

  // Utility functions
  formatUserName(user) {
    if (!user) return 'Unknown User';
    return user.fullName || [user.firstName, user.lastName].filter(Boolean).join(' ') || user.email || 'Unknown User';
  },

  getUserInitials(user) {
    if (!user) return 'U';
    const name = this.formatUserName(user);
    return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().slice(0, 2);
  },

  isProfileComplete(user) {
    if (!user) return false;
    const requiredFields = ['email', 'firstName', 'lastName'];
    return requiredFields.every(field => user[field] && user[field].trim() !== '');
  },

  // Profile validation
  validateProfileData(profileData) {
    const errors = {};

    if (!profileData.email || !profileData.email.includes('@')) {
      errors.email = 'Valid email address is required';
    }

    if (!profileData.firstName || profileData.firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }

    if (!profileData.lastName || profileData.lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }

    if (profileData.phoneNumber && !/^\+?[\d\s\-\(\)]+$/.test(profileData.phoneNumber)) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    if (profileData.dateOfBirth) {
      const birthDate = new Date(profileData.dateOfBirth);
      const today = new Date();
      if (birthDate >= today) {
        errors.dateOfBirth = 'Birth date must be in the past';
      }
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

export default userService;
