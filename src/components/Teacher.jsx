import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Teacher = () => {
  const { currentUser, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedTerm, setSelectedTerm] = useState('Term 2');
  const [selectedClass, setSelectedClass] = useState('Year 2A');
  const [selectedAssessment, setSelectedAssessment] = useState('All Assessments');
  const [showAddMarksModal, setShowAddMarksModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  // Authentication guard
  useEffect(() => {
    if (currentUser === null) {
      // Still loading, wait
      return;
    }

    if (!currentUser || currentUser.role !== 'teacher') {
      console.error('🚫 Unauthorized access attempt to /teacher route:', {
        user: currentUser,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        path: window.location.pathname
      });
      
      // Redirect to login
      navigate('/', { replace: true });
      return;
    }

    // User is authorized
    setIsAuthorized(true);
    console.log('✅ Teacher access authorized:', {
      userId: currentUser.id,
      userName: currentUser.name,
      subject: currentUser.subject,
      timestamp: new Date().toISOString()
    });
  }, [currentUser, navigate]);

  // Screen size and sidebar management
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // If not authenticated or not a teacher, show nothing
  if (!isAuthorized) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Teacher Profile - Single Subject Teacher (from current user)
  const teacherProfile = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    subject: currentUser.subject,
    subjectCode: currentUser.subjectCode,
    qualification: 'PhD in Mathematics',
    experience: '8 years',
    phone: '+250 788 123 456'
  };

  // Classes the teacher teaches
  const teacherClasses = [
    { id: 1, name: 'Year 1A', students: 32, schedule: 'Mon, Wed, Fri 8:00-9:30' },
    { id: 2, name: 'Year 1B', students: 28, schedule: 'Mon, Wed, Fri 10:00-11:30' },
    { id: 3, name: 'Year 2A', students: 35, schedule: 'Tue, Thu 8:00-9:30' },
    { id: 4, name: 'Year 2B', students: 30, schedule: 'Tue, Thu 10:00-11:30' },
    { id: 5, name: 'Year 3A', students: 38, schedule: 'Mon, Wed 14:00-15:30' }
  ];

  // Academic Terms and Years
  const academicTerms = [
    { id: 1, name: 'Term 1', year: '2024-2025', startDate: '2024-09-01', endDate: '2024-12-15' },
    { id: 2, name: 'Term 2', year: '2024-2025', startDate: '2025-01-15', endDate: '2025-04-30' },
    { id: 3, name: 'Term 3', year: '2024-2025', startDate: '2025-05-15', endDate: '2025-07-30' }
  ];

  // Assessment Types
  const assessmentTypes = [
    { id: 'CAT1', name: 'CAT 1', weight: 15, maxScore: 20 },
    { id: 'CAT2', name: 'CAT 2', weight: 15, maxScore: 20 },
    { id: 'EXAM', name: 'End Term Exam', weight: 70, maxScore: 60 }
  ];

  // Sample students with marks for Mathematics only
  const students = [
    { 
      id: 1, 
      name: 'Burigo Jabes', 
      email: 'burigo.jabes@rca.rw', 
      gender: 'M', 
      code: 'RCA0302RYZ',
      class: 'Year 2A',
      marks: {
        '2024-2025': {
          'Term 1': { CAT1: 18, CAT2: 17, EXAM: 52 },
          'Term 2': { CAT1: 19, CAT2: 18, EXAM: 54 },
          'Term 3': { CAT1: 17, CAT2: 19, EXAM: 51 }
        }
      }
    },
    { 
      id: 2, 
      name: 'Abijuru Seth', 
      email: 'abijuru.seth@rca.rw', 
      gender: 'M', 
      code: 'RCA0303RYZ',
      class: 'Year 2A',
      marks: {
        '2024-2025': {
          'Term 1': { CAT1: 20, CAT2: 19, EXAM: 58 },
          'Term 2': { CAT1: 18, CAT2: 20, EXAM: 56 },
          'Term 3': { CAT1: 19, CAT2: 18, EXAM: 57 }
        }
      }
    },
    { 
      id: 3, 
      name: 'Ntagungira All Rashid', 
      email: 'ntagungira.rashid@rca.rw', 
      gender: 'M', 
      code: 'RCA0304RYZ',
      class: 'Year 2B',
      marks: {
        '2024-2025': {
          'Term 1': { CAT1: 15, CAT2: 16, EXAM: 48 },
          'Term 2': { CAT1: 16, CAT2: 17, EXAM: 50 },
          'Term 3': { CAT1: 17, CAT2: 18, EXAM: 52 }
        }
      }
    },
    { 
      id: 4, 
      name: 'Mutegetsi Prince', 
      email: 'mutegetsi.prince@rca.rw', 
      gender: 'M', 
      code: 'RCA0305RYZ',
      class: 'Year 2B',
      marks: {
        '2024-2025': {
          'Term 1': { CAT1: 19, CAT2: 18, EXAM: 55 },
          'Term 2': { CAT1: 17, CAT2: 19, EXAM: 53 },
          'Term 3': { CAT1: 18, CAT2: 17, EXAM: 54 }
        }
      }
    },
    { 
      id: 5, 
      name: 'Uwimana Grace', 
      email: 'uwimana.grace@rca.rw', 
      gender: 'F', 
      code: 'RCA0306RYZ',
      class: 'Year 1A',
      marks: {
        '2024-2025': {
          'Term 1': { CAT1: 16, CAT2: 17, EXAM: 49 },
          'Term 2': { CAT1: 18, CAT2: 19, EXAM: 52 },
          'Term 3': { CAT1: 17, CAT2: 18, EXAM: 50 }
        }
      }
    },
    { 
      id: 6, 
      name: 'Niyonsaba Alice', 
      email: 'niyonsaba.alice@rca.rw', 
      gender: 'F', 
      code: 'RCA0307RYZ',
      class: 'Year 1A',
      marks: {
        '2024-2025': {
          'Term 1': { CAT1: 20, CAT2: 19, EXAM: 57 },
          'Term 2': { CAT1: 19, CAT2: 20, EXAM: 58 },
          'Term 3': { CAT1: 18, CAT2: 19, EXAM: 56 }
        }
      }
    }
  ];

  // Styles
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  };

  const mainContentStyle = {
    marginLeft: isMobile ? '0' : (sidebarOpen ? '240px' : '0'),
    flex: '1',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    transition: 'margin-left 0.3s ease',
    position: 'relative'
  };

  const headerStyle = {
    backgroundColor: 'white',
    padding: '16px 24px',
    borderBottom: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexShrink: 0
  };

  const contentStyle = {
    padding: '24px',
    flex: '1',
    overflow: 'auto',
    minHeight: 0
  };

  // Dashboard Page
  const DashboardPage = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
      {/* Teacher Profile Header */}
      <div style={{ 
        marginBottom: '32px', 
        flexShrink: 0,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '32px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          position: 'absolute', 
          top: '-50%', 
          right: '-20%', 
          width: '200px', 
          height: '200px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: '50%',
          zIndex: 1
        }}></div>
        <div style={{ 
          position: 'absolute', 
          bottom: '-30%', 
          left: '-10%', 
          width: '150px', 
          height: '150px', 
          background: 'rgba(255,255,255,0.05)', 
          borderRadius: '50%',
          zIndex: 1
        }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: '800', 
            marginBottom: '8px',
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            Welcome Back, {teacherProfile.name}! 👨‍🏫
          </h1>
          <p style={{ 
            fontSize: '18px', 
            opacity: 0.9,
            marginBottom: '8px',
            fontWeight: '500'
          }}>
            {teacherProfile.subject} Teacher • {teacherProfile.qualification}
          </p>
          <p style={{ 
            fontSize: '16px', 
            opacity: 0.8,
            marginBottom: '0',
            fontWeight: '400'
          }}>
            Managing {teacherClasses.length} classes • {teacherClasses.reduce((sum, cls) => sum + cls.students, 0)} students
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '32px',
        flexShrink: 0
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📚</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e', marginBottom: '4px' }}>{teacherClasses.length}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Active Classes</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>👥</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>{teacherClasses.reduce((sum, cls) => sum + cls.students, 0)}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Students</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(168, 85, 247, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#a855f7', marginBottom: '4px' }}>{assessmentTypes.length}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Assessment Types</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>{academicTerms.length}</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Academic Terms</div>
        </div>
      </div>

      {/* Classes Section */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px',
        flexShrink: 0
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '20px' 
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c' }}>Your {teacherProfile.subject} Classes</h2>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Subject Code: {teacherProfile.subjectCode}</div>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '20px' 
        }}>
          {teacherClasses.map((cls) => (
            <div key={cls.id} style={{
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'left',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
              ':hover': { 
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)'
              }
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ 
                  fontSize: '24px', 
                  marginRight: '12px',
                  color: '#7c3aed'
                }}>🎓</div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>{cls.name}</div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>{cls.students} Students</div>
                </div>
              </div>
              <div style={{ 
                fontSize: '13px', 
                color: '#6b7280',
                backgroundColor: '#f8fafc',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0'
              }}>
                📅 {cls.schedule}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px',
        flexShrink: 0
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginBottom: '20px' }}>Quick Actions</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px' 
        }}>
          <button style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}>
            📝 Enter Marks
          </button>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}>
            📊 Generate Reports
          </button>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '16px 20px',
            borderRadius: '12px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}>
            📋 View Attendance
          </button>
        </div>
      </div>
    </div>
  );

  // Students Management Page
  const StudentsPage = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
            {teacherProfile.subject} Students
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Manage students enrolled in your {teacherProfile.subject} classes
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📥 Export List
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '300px' }}>
            <input
              type="text"
              placeholder="Search students by name, email, or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              minWidth: '150px'
            }}
          >
            <option>All Classes</option>
            {teacherClasses.map(cls => (
              <option key={cls.id}>{cls.name}</option>
            ))}
          </select>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            🔍 Search
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c' }}>
            {teacherProfile.subject} Students List ({students.length} students)
          </h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>#</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Student Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Class</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Email</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Gender</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Student Code</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student.id} style={{ 
                  borderBottom: '1px solid #e2e8f0',
                  ':hover': { backgroundColor: '#f8fafc' }
                }}>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{index + 1}</td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500' }}>{student.name}</td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>
                    <span style={{
                      backgroundColor: '#e0e7ff',
                      color: '#3730a3',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {student.class}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{student.email}</td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>
                    <span style={{
                      backgroundColor: student.gender === 'M' ? '#dbeafe' : '#fce7f3',
                      color: student.gender === 'M' ? '#1d4ed8' : '#be185d',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      {student.gender === 'M' ? 'Male' : 'Female'}
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px', fontFamily: 'monospace' }}>{student.code}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setSelectedStudent(student)}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          border: '1px solid #e2e8f0',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        title="View Performance"
                      >
                        📊
                      </button>
                      <button style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                        title="Enter Marks"
                      >
                        ✏️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Marks Management Page
  const MarksPage = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
            {teacherProfile.subject} Marks Management
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Manage CATs and Exam marks for your {teacherProfile.subject} students
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowAddMarksModal(true)}
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#6d28d9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#7c3aed'}
          >
            ✏️ Enter Marks
          </button>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📥 Download Report
          </button>
          <button style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📊 Analytics
          </button>
        </div>
      </div>

      {/* Academic Period and Class Selection */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search students by name or code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              backgroundColor: '#f8fafc'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Academic Year
            </label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '200px'
              }}
            >
              <option>2024-2025</option>
              <option>2023-2024</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Term
            </label>
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '200px'
              }}
            >
              {academicTerms.map(term => (
                <option key={term.id}>{term.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '200px'
              }}
            >
              <option>All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Assessment Type
            </label>
            <select 
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '200px'
              }}
            >
              <option>All Assessments</option>
              {assessmentTypes.map(assessment => (
                <option key={assessment.id}>{assessment.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Marks Summary Statistics */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '16px' }}>
          Marks Summary - {selectedTerm}, {selectedYear}
        </h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          {(() => {
            const filteredStudents = students.filter(student => {
              const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
              const matchesSearch = searchQuery === '' || 
                student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.code.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesClass && matchesSearch;
            });
            const studentsWithMarks = filteredStudents.filter(student => 
              student.marks[selectedYear] && student.marks[selectedYear][selectedTerm]
            );
            const totalStudents = filteredStudents.length;
            const studentsWithMarksCount = studentsWithMarks.length;
            const averageScore = studentsWithMarks.length > 0 
              ? Math.round(studentsWithMarks.reduce((sum, student) => {
                  const marks = student.marks[selectedYear][selectedTerm];
                  return sum + (marks.CAT1 + marks.CAT2 + marks.EXAM);
                }, 0) / studentsWithMarks.length)
              : 0;
            
            return (
              <>
                <div style={{ 
                  backgroundColor: '#f0f9ff', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  minWidth: '150px',
                  border: '1px solid #bae6fd'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#0369a1' }}>{totalStudents}</div>
                  <div style={{ fontSize: '14px', color: '#0369a1' }}>Total Students</div>
                </div>
                <div style={{ 
                  backgroundColor: '#f0fdf4', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  minWidth: '150px',
                  border: '1px solid #bbf7d0'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#16a34a' }}>{studentsWithMarksCount}</div>
                  <div style={{ fontSize: '14px', color: '#16a34a' }}>With Marks</div>
                </div>
                <div style={{ 
                  backgroundColor: '#fef3c7', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  minWidth: '150px',
                  border: '1px solid #fde68a'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#d97706' }}>{averageScore}/100</div>
                  <div style={{ fontSize: '14px', color: '#d97706' }}>Average Score</div>
                </div>
                <div style={{ 
                  backgroundColor: '#fef2f2', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  minWidth: '150px',
                  border: '1px solid #fecaca'
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#dc2626' }}>{totalStudents - studentsWithMarksCount}</div>
                  <div style={{ fontSize: '14px', color: '#dc2626' }}>Pending Marks</div>
                </div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Marks Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c' }}>
            {teacherProfile.subject} Students Marks - {selectedTerm}, {selectedYear}
          </h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>#</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Student Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Class</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>CAT 1 (20)</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>CAT 2 (20)</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Exam (60)</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Average</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Grade</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(() => {
                const filteredStudents = students.filter(student => {
                  const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
                  const matchesSearch = searchQuery === '' || 
                    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    student.code.toLowerCase().includes(searchQuery.toLowerCase());
                  return matchesClass && matchesSearch;
                });

                if (filteredStudents.length === 0) {
                  return (
                    <tr>
                      <td colSpan="9" style={{ 
                        padding: '40px 16px', 
                        textAlign: 'center', 
                        color: '#6b7280',
                        fontSize: '16px'
                      }}>
                        {searchQuery ? `No students found matching "${searchQuery}"` : 'No students found for the selected criteria'}
                      </td>
                    </tr>
                  );
                }

                return filteredStudents.map((student, index) => {
                  // Check if marks exist for the selected year and term
                  if (!student.marks[selectedYear] || !student.marks[selectedYear][selectedTerm]) {
                    return (
                      <tr key={student.id} style={{ 
                        borderBottom: '1px solid #e2e8f0',
                        backgroundColor: '#fef2f2'
                      }}>
                        <td style={{ padding: '16px', fontSize: '14px' }}>{index + 1}</td>
                        <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500' }}>{student.name}</td>
                        <td style={{ padding: '16px', fontSize: '14px' }}>
                          <span style={{
                            backgroundColor: '#e0e7ff',
                            color: '#3730a3',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {student.class}
                          </span>
                        </td>
                        <td style={{ padding: '16px', fontSize: '14px', color: '#6b7280' }} colSpan="5">No marks available for {selectedTerm}, {selectedYear}</td>
                        <td style={{ padding: '16px' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '6px',
                              border: '1px solid #e2e8f0',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                              title="Add Marks"
                            >
                              ➕
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }

                  const termMarks = student.marks[selectedYear][selectedTerm];
                  const cat1 = termMarks.CAT1 || 0;
                  const cat2 = termMarks.CAT2 || 0;
                  const exam = termMarks.EXAM || 0;
                  const total = cat1 + cat2 + exam;
                  const percentage = Math.round((total / 100) * 100);
                  const grade = percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F';
                  
                  return (
                    <tr key={student.id} style={{ 
                      borderBottom: '1px solid #e2e8f0'
                    }}>
                      <td style={{ padding: '16px', fontSize: '14px' }}>{index + 1}</td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500' }}>{student.name}</td>
                      <td style={{ padding: '16px', fontSize: '14px' }}>
                        <span style={{
                          backgroundColor: '#e0e7ff',
                          color: '#3730a3',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}>
                          {student.class}
                        </span>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600' }}>{cat1}/20</td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600' }}>{cat2}/20</td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600' }}>{exam}/60</td>
                      <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600' }}>{total}/100</td>
                      <td style={{ padding: '16px', fontSize: '14px' }}>
                        <span style={{
                          backgroundColor: grade === 'A' ? '#dcfce7' : grade === 'B' ? '#dbeafe' : grade === 'C' ? '#fef3c7' : grade === 'D' ? '#fee2e2' : '#fef2f2',
                          color: grade === 'A' ? '#166534' : grade === 'B' ? '#1d4ed8' : grade === 'C' ? '#92400e' : grade === 'D' ? '#dc2626' : '#991b1b',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {grade}
                        </span>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                            title="Edit Marks"
                          >
                            ✏️
                          </button>
                          <button style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                            title="Performance History"
                          >
                            📈
                          </button>
                        </div>
                                           </td>
                   </tr>
                 );
               });
             })()}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Marks Modal */}
      {showAddMarksModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#1a202c' }}>
                Enter Student Marks
              </h3>
              <button
                onClick={() => setShowAddMarksModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                Enter marks for {selectedTerm}, {selectedYear} - {selectedClass}
              </p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Student
              </label>
              <select style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}>
                <option>Select a student</option>
                {students
                  .filter(student => selectedClass === 'All Classes' || student.class === selectedClass)
                  .map(student => (
                    <option key={student.id} value={student.id}>{student.name} - {student.code}</option>
                  ))
                }
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  CAT 1 (Max: 20)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="0-20"
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                  CAT 2 (Max: 20)
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                  placeholder="0-20"
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
                Exam (Max: 60)
              </label>
              <input
                type="number"
                min="0"
                max="60"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                placeholder="0-60"
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddMarksModal(false)}
                style={{
                  padding: '10px 20px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  color: '#374151',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#7c3aed',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Save Marks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Attendance Page
  const AttendancePage = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
            {teacherProfile.subject} Attendance
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Track student attendance for your {teacherProfile.subject} classes
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📝 Mark Attendance
          </button>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📊 Attendance Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '200px'
              }}
            >
              <option>All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id}>{cls.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Date
            </label>
            <input
              type="date"
              style={{
                padding: '12px 16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                minWidth: '200px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px', 
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c' }}>
            Attendance for {selectedClass} - {new Date().toLocaleDateString()}
          </h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>#</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Student Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Time</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.filter(s => selectedClass === 'All Classes' || s.class === selectedClass).map((student, index) => (
                <tr key={student.id} style={{ 
                  borderBottom: '1px solid #e2e8f0',
                  ':hover': { backgroundColor: '#f8fafc' }
                }}>
                  <td style={{ padding: '16px', fontSize: '14px' }}>{index + 1}</td>
                  <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500' }}>{student.name}</td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#166534',
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      Present
                    </span>
                  </td>
                  <td style={{ padding: '16px', fontSize: '14px' }}>8:00 AM</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                        title="Mark Present"
                      >
                        ✅
                      </button>
                      <button style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '6px',
                        border: '1px solid #e2e8f0',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                        title="Mark Absent"
                      >
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Assignments Page
  const AssignmentsPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Assignments Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ➕ Create Assignment
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📥 Import CSV
          </button>
        </div>
      </div>

      {/* Assignment Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '24px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#7c3aed', marginBottom: '8px' }}>15</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Active Assignments</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>12</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Submitted</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>8</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Graded</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>3</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Overdue</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Class
            </label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Classes">All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Status
            </label>
            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Submitted">Submitted</option>
              <option value="Graded">Graded</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Type
            </label>
            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Types">All Types</option>
              <option value="Homework">Homework</option>
              <option value="Project">Project</option>
              <option value="Quiz">Quiz</option>
              <option value="Practice">Practice</option>
            </select>
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🔍 Filter
          </button>
        </div>
      </div>

      {/* Assignments List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            Current Assignments
          </h3>
        </div>
        
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {/* Assignment 1 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#7c3aed',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📝
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Calculus Problem Set 1
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 2A • Due: Dec 18, 2024 • 25 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#dbeafe', 
                color: '#1e40af', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Active
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Submissions</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>18/25</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Due In</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>3 days</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>

          {/* Assignment 2 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📊
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Statistics Project
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 1B • Due: Dec 15, 2024 • 20 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#dcfce7', 
                color: '#166534', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Submitted
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Submissions</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>20/20</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Ready to Grade</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  📋 Grade
                </button>
              </div>
            </div>
          </div>

          {/* Assignment 3 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                🔢
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Number Theory Quiz
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 3A • Due: Dec 20, 2024 • 15 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#fef3c7', 
                color: '#92400e', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Active
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Submissions</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>8/15</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Due In</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>5 days</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>

          {/* Assignment 4 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📈
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Linear Algebra Homework
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 2B • Due: Dec 10, 2024 • 22 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#fee2e2', 
                color: '#991b1b', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Overdue
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Submissions</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>18/22</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Overdue By</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>2 days</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ⚠️ Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Exams Page
  const ExamsPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Exams Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📝 Create Exam
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📊 Schedule Exam
          </button>
        </div>
      </div>

      {/* Exam Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '24px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#7c3aed', marginBottom: '8px' }}>6</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Scheduled Exams</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>4</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Completed</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>2</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Upcoming</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>0</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Overdue</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Academic Year
            </label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '140px'
              }}
            >
              {academicTerms.map(term => (
                <option key={term.year} value={term.year}>{term.year}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Term
            </label>
            <select 
              value={selectedTerm} 
              onChange={(e) => setSelectedTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              {academicTerms.map(term => (
                <option key={term.id} value={term.name}>{term.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Class
            </label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Classes">All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🔍 Filter
          </button>
        </div>
      </div>

      {/* Exams List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            {selectedTerm} {selectedYear} - {selectedClass}
          </h3>
        </div>
        
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {/* CAT 1 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#7c3aed',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📝
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  CAT 1 - {selectedClass}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Date: Oct 15, 2024 • Duration: 1 hour • Max Score: 20
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#dcfce7', 
                color: '#166534', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Completed
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Students</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>35</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Average</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>16.8</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  📊 Results
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  📥 Export
                </button>
              </div>
            </div>
          </div>

          {/* CAT 2 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📝
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  CAT 2 - {selectedClass}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Date: Nov 20, 2024 • Duration: 1 hour • Max Score: 20
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#dbeafe', 
                color: '#1e40af', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Scheduled
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Students</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>35</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Pending</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ✏️ Edit
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  🗑️ Cancel
                </button>
              </div>
            </div>
          </div>

          {/* End Term Exam */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📝
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  End Term Exam - {selectedClass}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Date: Dec 10, 2024 • Duration: 2 hours • Max Score: 60
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#fef3c7', 
                color: '#92400e', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Upcoming
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Students</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>35</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>Preparing</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ✏️ Edit
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  📋 Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Timetable Page
  const TimetablePage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Class Timetable</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✏️ Edit Timetable
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📥 Export PDF
          </button>
        </div>
      </div>

      {/* Week Overview */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '20px' }}>
          Weekly Schedule - {teacherProfile.subject}
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px' }}>
          {/* Monday */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Monday</div>
            <div style={{ 
              backgroundColor: '#7c3aed', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Year 1A<br />8:00-9:30
            </div>
            <div style={{ 
              backgroundColor: '#10b981', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              marginTop: '8px'
            }}>
              Year 1B<br />10:00-11:30
            </div>
          </div>

          {/* Tuesday */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Tuesday</div>
            <div style={{ 
              backgroundColor: '#f59e0b', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Year 2A<br />8:00-9:30
            </div>
            <div style={{ 
              backgroundColor: '#ef4444', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              marginTop: '8px'
            }}>
              Year 2B<br />10:00-11:30
            </div>
          </div>

          {/* Wednesday */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Wednesday</div>
            <div style={{ 
              backgroundColor: '#7c3aed', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Year 1A<br />8:00-9:30
            </div>
            <div style={{ 
              backgroundColor: '#10b981', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              marginTop: '8px'
            }}>
              Year 1B<br />10:00-11:30
            </div>
            <div style={{ 
              backgroundColor: '#8b5cf6', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              marginTop: '8px'
            }}>
              Year 3A<br />14:00-15:30
            </div>
          </div>

          {/* Thursday */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Thursday</div>
            <div style={{ 
              backgroundColor: '#f59e0b', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Year 2A<br />8:00-9:30
            </div>
            <div style={{ 
              backgroundColor: '#ef4444', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              marginTop: '8px'
            }}>
              Year 2B<br />10:00-11:30
            </div>
          </div>

          {/* Friday */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Friday</div>
            <div style={{ 
              backgroundColor: '#7c3aed', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Year 1A<br />8:00-9:30
            </div>
            <div style={{ 
              backgroundColor: '#10b981', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500',
              marginTop: '8px'
            }}>
              Year 1B<br />10:00-11:30
            </div>
          </div>

          {/* Saturday */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Saturday</div>
            <div style={{ 
              backgroundColor: '#8b5cf6', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              Year 3A<br />9:00-10:30
            </div>
          </div>

          {/* Sunday */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>Sunday</div>
            <div style={{ 
              backgroundColor: '#6b7280', 
              color: 'white', 
              padding: '12px 8px', 
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              No Classes
            </div>
          </div>
        </div>
      </div>

      {/* Class Details */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            Class Schedule Details
          </h3>
        </div>
        
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {teacherClasses.map(cls => (
            <div key={cls.id} style={{ 
              padding: '20px', 
              borderBottom: '1px solid #f3f4f6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#7c3aed',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  📚
                </div>
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                    {cls.name}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    {cls.students} students • {cls.schedule}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View Details
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ✏️ Edit Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Communications Page
  const CommunicationsPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Communications</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ✉️ New Message
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📢 Announcement
          </button>
        </div>
      </div>

      {/* Communication Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '24px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#7c3aed', marginBottom: '8px' }}>24</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Messages Sent</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>18</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Replies Received</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>6</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Announcements</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>3</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Pending</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Class
            </label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Classes">All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Type
            </label>
            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Types">All Types</option>
              <option value="Message">Message</option>
              <option value="Announcement">Announcement</option>
              <option value="Reminder">Reminder</option>
              <option value="Alert">Alert</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Status
            </label>
            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Status">All Status</option>
              <option value="Sent">Sent</option>
              <option value="Delivered">Delivered</option>
              <option value="Read">Read</option>
              <option value="Replied">Replied</option>
            </select>
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🔍 Filter
          </button>
        </div>
      </div>

      {/* Communications List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            Recent Communications
          </h3>
        </div>
        
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {/* Announcement */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#7c3aed',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📢
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    backgroundColor: '#fef3c7', 
                    color: '#92400e', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: '500' 
                  }}>
                    Announcement
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Dec 5, 2024 • 2:30 PM</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  End Term Exam Schedule - {selectedClass}
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
                  Dear students and parents, please note that the end term examination for {selectedClass} will be held on December 10, 2024, from 9:00 AM to 11:00 AM. Please ensure all students arrive 30 minutes before the exam time.
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Sent to: {selectedClass} • Recipients: 35 students, 35 parents
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                👁️ View
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                ✏️ Edit
              </button>
            </div>
          </div>

          {/* Message */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                ✉️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    backgroundColor: '#dbeafe', 
                    color: '#1e40af', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: '500' 
                  }}>
                    Message
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Dec 4, 2024 • 10:15 AM</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Project Submission Reminder
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
                  Reminder: Mathematical Modeling Project submissions are due on December 20, 2024. Please ensure all projects are submitted on time. Late submissions will incur penalties.
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Sent to: Year 2A • Recipients: 35 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                👁️ View
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#f59e0b',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📊 Stats
              </button>
            </div>
          </div>

          {/* Alert */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                ⚠️
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    backgroundColor: '#fee2e2', 
                    color: '#991b1b', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: '500' 
                  }}>
                    Alert
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Dec 3, 2024 • 3:45 PM</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Low Attendance Alert - Year 1B
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
                  Attention: Year 1B has shown a significant drop in attendance this week. Current attendance rate is 65%. Please contact parents of absent students to address this issue.
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Sent to: Year 1B • Recipients: 28 students, 28 parents
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                👁️ View
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📞 Call Parents
              </button>
            </div>
          </div>

          {/* Reminder */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', flex: 1 }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                🔔
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ 
                    padding: '4px 8px', 
                    backgroundColor: '#fef3c7', 
                    color: '#92400e', 
                    borderRadius: '12px', 
                    fontSize: '12px', 
                    fontWeight: '500' 
                  }}>
                    Reminder
                  </span>
                  <span style={{ fontSize: '12px', color: '#6b7280' }}>Dec 2, 2024 • 9:00 AM</span>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
                  Parent-Teacher Meeting Reminder
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px', lineHeight: '1.5' }}>
                  Reminder: Parent-Teacher meeting for {selectedClass} is scheduled for December 15, 2024, at 2:00 PM. Please confirm your attendance and prepare any questions you may have.
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  Sent to: {selectedClass} • Recipients: 35 parents
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                👁️ View
              </button>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📅 Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Analytics Page
  const AnalyticsPage = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
            {teacherProfile.subject} Analytics & Reports
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Performance insights and detailed reports for your {teacherProfile.subject} classes
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📊 Generate Report
          </button>
          <button style={{
            backgroundColor: '#10b981',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📥 Export Data
          </button>
        </div>
      </div>

      {/* Performance Overview Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '32px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(34, 197, 94, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📈</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e', marginBottom: '4px' }}>87.5%</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Class Average</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎯</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>15</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Grade A Students</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(168, 85, 247, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📊</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#a855f7', marginBottom: '4px' }}>92%</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Attendance Rate</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(245, 158, 11, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>📝</div>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>3</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Terms Completed</div>
        </div>
      </div>

      {/* Class Performance Comparison */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginBottom: '20px' }}>Class Performance Comparison</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {teacherClasses.map((cls) => (
            <div key={cls.id} style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>{cls.name}</div>
              <div style={{ fontSize: '32px', fontWeight: '800', color: '#7c3aed', marginBottom: '4px' }}>89.2%</div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Class Average</div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                fontSize: '12px', 
                color: '#6b7280' 
              }}>
                <span>A: 8</span>
                <span>B: 12</span>
                <span>C: 8</span>
                <span>D: 2</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Term-wise Performance */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px'
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginBottom: '20px' }}>Term-wise Performance Trends</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: '20px' 
        }}>
          {academicTerms.map((term) => (
            <div key={term.id} style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '20px',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>{term.name}</div>
              <div style={{ fontSize: '28px', fontWeight: '800', color: '#10b981', marginBottom: '4px' }}>85.7%</div>
              <div style={{ fontSize: '14px', color: '#6b7280' }}>Overall Average</div>
              <div style={{ 
                marginTop: '12px',
                fontSize: '12px', 
                color: '#6b7280',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>CAT1: 17.2</span>
                <span>CAT2: 16.8</span>
                <span>EXAM: 51.7</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Settings Page
  const SettingsPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Settings</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Account and system settings coming soon...</p>
      </div>
    </div>
  );

  // Profile Page
  const ProfilePage = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
            Teacher Profile
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            Manage your personal information and account settings
          </p>
        </div>
        <button style={{
          backgroundColor: '#7c3aed',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          border: 'none',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          ✏️ Edit Profile
        </button>
      </div>

      {/* Profile Overview */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        padding: '32px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '32px',
          gap: '24px'
        }}>
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: '#7c3aed',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px',
            fontWeight: '700'
          }}>
            {teacherProfile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#1a202c', marginBottom: '8px' }}>
              {teacherProfile.name}
            </h2>
            <p style={{ fontSize: '18px', color: '#6b7280', marginBottom: '4px' }}>
              {teacherProfile.subject} Teacher
            </p>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Employee ID: {teacherProfile.id}
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
          gap: '24px' 
        }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>Personal Information</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Email</label>
                <div style={{ fontSize: '16px', color: '#1a202c', fontWeight: '500' }}>{teacherProfile.email}</div>
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Phone</label>
                <div style={{ fontSize: '16px', color: '#1a202c', fontWeight: '500' }}>{teacherProfile.phone}</div>
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Qualification</label>
                <div style={{ fontSize: '16px', color: '#1a202c', fontWeight: '500' }}>{teacherProfile.qualification}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>Professional Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Subject</label>
                <div style={{ fontSize: '16px', color: '#1a202c', fontWeight: '500' }}>{teacherProfile.subject}</div>
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Subject Code</label>
                <div style={{ fontSize: '16px', color: '#1a202c', fontWeight: '500' }}>{teacherProfile.subjectCode}</div>
              </div>
              <div>
                <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>Experience</label>
                <div style={{ fontSize: '16px', color: '#1a202c', fontWeight: '500' }}>{teacherProfile.experience}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Teaching Statistics */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        padding: '24px', 
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#1a202c', marginBottom: '20px' }}>Teaching Statistics</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
          gap: '20px' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#7c3aed', marginBottom: '4px' }}>{teacherClasses.length}</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Classes</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>
              {teacherClasses.reduce((sum, cls) => sum + cls.students, 0)}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Students</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>{academicTerms.length}</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Terms</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '4px' }}>98%</div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Report Cards Page
  const ReportCardsPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Report Cards</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📊 Generate All Reports
          </button>
          <button style={{
            padding: '10px 20px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            📥 Download Excel
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Academic Year
            </label>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '140px'
              }}
            >
              {academicTerms.map(term => (
                <option key={term.year} value={term.year}>{term.year}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Term
            </label>
            <select 
              value={selectedTerm} 
              onChange={(e) => setSelectedTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              {academicTerms.map(term => (
                <option key={term.id} value={term.name}>{term.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Class
            </label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🔍 Filter
          </button>
        </div>
      </div>

      {/* Report Cards List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            {selectedClass} - {selectedTerm} {selectedYear}
          </h3>
        </div>
        
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {students
            .filter(student => student.class === selectedClass)
            .map(student => {
              const studentMarks = student.marks[selectedYear]?.[selectedTerm];
              const total = studentMarks ? (studentMarks.CAT1 + studentMarks.CAT2 + studentMarks.EXAM) : 0;
              const percentage = total;
              const grade = percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F';
              
              return (
                <div key={student.id} style={{ 
                  padding: '20px', 
                  borderBottom: '1px solid #f3f4f6',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#7c3aed',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                        {student.name}
                      </div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>
                        {student.code} • {student.class}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Score</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>{total}/100</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Grade</div>
                      <div style={{ 
                        fontSize: '20px', 
                        fontWeight: '700', 
                        color: grade === 'A' ? '#059669' : grade === 'B' ? '#7c3aed' : grade === 'C' ? '#d97706' : grade === 'D' ? '#dc2626' : '#dc2626'
                      }}>
                        {grade}
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Percentage</div>
                      <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>{percentage}%</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#3b82f6',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                      📋 View Report
                    </button>
                    <button style={{
                      padding: '8px 16px',
                      backgroundColor: '#10b981',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px'
                    }}>
                      📥 Download
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );

  // Projects Page
  const ProjectsPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Mathematics Projects</h1>
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ➕ Create Project
        </button>
      </div>

      {/* Project Statistics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '20px', 
        marginBottom: '24px'
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#7c3aed', marginBottom: '8px' }}>12</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Active Projects</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '8px' }}>8</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Completed</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>4</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>In Progress</div>
        </div>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '20px', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>2</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Overdue</div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Class
            </label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Classes">All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Status
            </label>
            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🔍 Filter
          </button>
        </div>
      </div>

      {/* Projects List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            Current Projects
          </h3>
        </div>
        
        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {/* Project 1 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#7c3aed',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📐
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Mathematical Modeling Project
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 2A • Due: Dec 20, 2024 • 8 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#dbeafe', 
                color: '#1e40af', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Active
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Progress</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>75%</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#10b981',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📊
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Statistics Analysis Project
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 1B • Due: Dec 15, 2024 • 6 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#dcfce7', 
                color: '#166534', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Completed
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Progress</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>100%</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  📋 Grade
                </button>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#f59e0b',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                🔢
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Number Theory Research
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 3A • Due: Jan 10, 2025 • 4 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#fef3c7', 
                color: '#92400e', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                In Progress
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Progress</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>45%</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ✏️ Edit
                </button>
              </div>
            </div>
          </div>

          {/* Project 4 */}
          <div style={{ 
            padding: '20px', 
            borderBottom: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#ef4444',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '16px'
              }}>
                📈
              </div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  Calculus Applications
                </div>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                  Year 2B • Due: Dec 10, 2024 • 10 students
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ 
                padding: '4px 12px', 
                backgroundColor: '#fee2e2', 
                color: '#991b1b', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Overdue
              </span>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '14px', color: '#6b7280' }}>Progress</div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>60%</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  👁️ View
                </button>
                <button style={{
                  padding: '8px 16px',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  ⚠️ Alert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Opportunities Page
  const OpportunitiesPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Student Opportunities</h1>
        <button style={{
          padding: '12px 24px',
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ➕ Add Opportunity
        </button>
      </div>

      {/* Filters */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '20px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Class
            </label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '120px'
              }}
            >
              <option value="All Classes">All Classes</option>
              {teacherClasses.map(cls => (
                <option key={cls.id} value={cls.name}>{cls.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '4px' }}>
              Category
            </label>
            <select 
              style={{
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '14px',
                minWidth: '140px'
              }}
            >
              <option value="All Categories">All Categories</option>
              <option value="Competitions">Competitions</option>
              <option value="Scholarships">Scholarships</option>
              <option value="Internships">Internships</option>
              <option value="Workshops">Workshops</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            🔍 Filter
          </button>
        </div>
      </div>

      {/* Opportunities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px' }}>
        {/* Competition Opportunity */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '200px', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px'
          }}>
            🏆
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#fef3c7', 
                color: '#92400e', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Competition
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Deadline: Dec 15, 2024</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              National Mathematics Olympiad
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
              Compete with students nationwide in advanced mathematics. Winners receive scholarships and recognition.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Open to: Year 2A, Year 2B</span>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📋 View Details
              </button>
            </div>
          </div>
        </div>

        {/* Scholarship Opportunity */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '200px', 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px'
          }}>
            🎓
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#dbeafe', 
                color: '#1e40af', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Scholarship
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Deadline: Jan 30, 2025</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Excellence in Mathematics Scholarship
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
              Full scholarship for outstanding mathematics students. Covers tuition, books, and living expenses.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Open to: All Classes</span>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📋 View Details
              </button>
            </div>
          </div>
        </div>

        {/* Workshop Opportunity */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '200px', 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px'
          }}>
            🛠️
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#dcfce7', 
                color: '#166534', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Workshop
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Date: Feb 10, 2025</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Advanced Problem Solving Workshop
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
              Learn advanced mathematical problem-solving techniques from industry experts and professors.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Open to: Year 3A</span>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📋 View Details
              </button>
            </div>
          </div>
        </div>

        {/* Internship Opportunity */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '200px', 
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px'
          }}>
            💼
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#fef3c7', 
                color: '#92400e', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Internship
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Duration: 3 months</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Data Science Internship
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
              Work with real data analysis projects. Gain practical experience in mathematical modeling.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Open to: Year 2A, Year 3A</span>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📋 View Details
              </button>
            </div>
          </div>
        </div>

        {/* Event Opportunity */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '200px', 
            background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px'
          }}>
            🎉
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#f3e8ff', 
                color: '#7c3aed', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Event
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Date: Mar 15, 2025</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Mathematics Innovation Fair
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
              Showcase mathematical projects and innovations. Network with professionals and peers.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Open to: All Classes</span>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📋 View Details
              </button>
            </div>
          </div>
        </div>

        {/* Research Opportunity */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <div style={{ 
            height: '200px', 
            background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '48px'
          }}>
            🔬
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span style={{ 
                padding: '4px 8px', 
                backgroundColor: '#fef3c7', 
                color: '#92400e', 
                borderRadius: '12px', 
                fontSize: '12px', 
                fontWeight: '500' 
              }}>
                Research
              </span>
              <span style={{ fontSize: '12px', color: '#6b7280' }}>Duration: 6 months</span>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '8px' }}>
              Mathematical Modeling Research
            </h3>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px', lineHeight: '1.5' }}>
              Conduct research on mathematical modeling applications in real-world problems.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '14px', color: '#059669', fontWeight: '500' }}>Open to: Year 3A</span>
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                📋 View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render function
  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'students':
        return <StudentsPage />;
      case 'marks':
        return <MarksPage />;
      case 'report-cards':
        return <ReportCardsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
      case 'attendance':
        return <AttendancePage />;
      case 'assignments':
        return <AssignmentsPage />;
      case 'exams':
        return <ExamsPage />;
      case 'timetable':
        return <TimetablePage />;
      case 'communications':
        return <CommunicationsPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div style={mainContentStyle}>
        {/* Sidebar Toggle Button */}
        {!isMobile && !sidebarOpen && (
          <button
            onClick={toggleSidebar}
            style={{
              position: 'fixed',
              left: '0',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '32px',
              height: '80px',
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              borderRadius: '0 8px 8px 0',
              cursor: 'pointer',
              zIndex: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s'
            }}
            title="Show Sidebar"
          >
            ▶
          </button>
        )}
        
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={toggleSidebar}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                width: '24px',
                height: '24px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0'
              }}
            >
              <div style={{ width: '24px', height: '3px', backgroundColor: '#4a5568', borderRadius: '2px' }}></div>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#4a5568', borderRadius: '2px' }}></div>
              <div style={{ width: '24px', height: '3px', backgroundColor: '#4a5568', borderRadius: '2px' }}></div>
            </button>
                         <div style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c' }}>
               {teacherProfile.name} - {teacherProfile.subject}
             </div>
          </div>
                     <div style={{ 
             width: '40px', 
             height: '40px', 
             backgroundColor: '#7c3aed', 
             borderRadius: '50%', 
             display: 'flex', 
             alignItems: 'center', 
             justifyContent: 'center', 
             color: 'white', 
             fontWeight: '600', 
             cursor: 'pointer' 
           }}>
             {teacherProfile.name.split(' ').map(n => n[0]).join('')}
           </div>
        </div>

        {/* Content */}
        <div style={contentStyle}>
          {renderContent()}
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'right', padding: '20px', fontSize: '12px', color: '#718096', flexShrink: 0 }}>
          Credits to all this Platform <span style={{ color: '#3b82f6' }}>Maintainers</span>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
