import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { currentUser, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Academic Year 2H - 2P Term II');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Admin-specific state
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [viewMode, setViewMode] = useState('overview'); // overview, students, teachers, parents, classes, rankings

  // Authentication guard
  useEffect(() => {
    if (currentUser === null) {
      return;
    }

    if (!currentUser || currentUser.role !== 'admin') {
      console.error('🚫 Unauthorized access attempt to /admin route:', {
        user: currentUser,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        path: window.location.pathname
      });
      
      navigate('/', { replace: true });
      return;
    }

    setIsAuthorized(true);
    console.log('✅ Admin access authorized:', {
      userId: currentUser.id,
      userName: currentUser.name,
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

  if (!isAuthorized) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Mock data for the whole school
  const schoolData = {
    totalStudents: 1250,
    totalTeachers: 85,
    totalClasses: 42,
    totalSubjects: 15,
    currentTerm: "Term II",
    academicYear: "2024-2025"
  };

  const classRankings = [
    { rank: 1, className: "Senior 6 A", averageScore: 92.5, totalStudents: 35, improvement: "+5.2%" },
    { rank: 2, className: "Senior 5 B", averageScore: 89.8, totalStudents: 38, improvement: "+3.1%" },
    { rank: 3, className: "Senior 4 C", averageScore: 87.3, totalStudents: 40, improvement: "+4.7%" },
    { rank: 4, className: "Senior 6 B", averageScore: 85.9, totalStudents: 36, improvement: "+2.8%" },
    { rank: 5, className: "Senior 5 A", averageScore: 84.2, totalStudents: 37, improvement: "+1.9%" }
  ];

  const recentActivities = [
    { type: "Student Added", description: "New student registered in Senior 4 A", timestamp: "2 hours ago", user: "Admin User" },
    { type: "Grade Updated", description: "Term II grades updated for Senior 5", timestamp: "4 hours ago", user: "Teacher Smith" },
    { type: "Attendance Marked", description: "Daily attendance completed", timestamp: "6 hours ago", user: "System" },
    { type: "Parent Contact", description: "Parent meeting scheduled", timestamp: "1 day ago", user: "Admin User" }
  ];

  const DashboardPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '30px' 
      }}>
        <div 
          onClick={(e) => {
            // Add click feedback
            e.target.style.transform = 'scale(0.98)';
            setTimeout(() => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
              e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
            }, 100);
            setCurrentPage('students');
          }}
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            padding: '20px', 
            borderRadius: '10px', 
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.3';
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Total Students</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{schoolData.totalStudents}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Active Students</div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
            Click to view all students <span style={{ fontSize: '14px' }}>→</span>
          </div>
          <div 
            data-hover-icon
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              fontSize: '16px', 
              opacity: 0.3,
              transition: 'opacity 0.3s ease'
            }}
          >
            👆
          </div>
        </div>
        
        <div 
          onClick={(e) => {
            // Add click feedback
            e.target.style.transform = 'scale(0.98)';
            setTimeout(() => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.3)';
              e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
            }, 100);
            setCurrentPage('teachers');
          }}
          style={{ 
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', 
            padding: '20px', 
            borderRadius: '10px', 
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
            e.target.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.3)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.3';
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Total Teachers</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{schoolData.totalTeachers}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Teaching Staff</div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
            Click to view all teachers <span style={{ fontSize: '14px' }}>→</span>
          </div>
          <div 
            data-hover-icon
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              fontSize: '16px', 
              opacity: 0.3,
              transition: 'opacity 0.3s ease'
            }}
          >
            👆
          </div>
        </div>
        
        <div 
          onClick={(e) => {
            // Add click feedback
            e.target.style.transform = 'scale(0.98)';
            setTimeout(() => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.3)';
              e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
            }, 100);
            setCurrentPage('classes');
          }}
          style={{ 
            background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', 
            padding: '20px', 
            borderRadius: '10px', 
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
            e.target.style.boxShadow = '0 8px 25px rgba(79, 172, 254, 0.3)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.3';
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Total Classes</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{schoolData.totalClasses}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Active Classes</div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
            Click to view all classes <span style={{ fontSize: '14px' }}>→</span>
          </div>
          <div 
            data-hover-icon
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              fontSize: '16px', 
              opacity: 0.3,
              transition: 'opacity 0.3s ease'
            }}
          >
            👆
          </div>
        </div>
        
        <div 
          onClick={(e) => {
            // Add click feedback
            e.target.style.transform = 'scale(0.98)';
            setTimeout(() => {
              e.target.style.transform = 'translateY(-3px) scale(1.02)';
              e.target.style.boxShadow = '0 8px 25px rgba(67, 233, 123, 0.3)';
              e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
            }, 100);
            setCurrentPage('subjects');
          }}
          style={{ 
            background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', 
            padding: '20px', 
            borderRadius: '10px', 
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px) scale(1.02)';
            e.target.style.boxShadow = '0 8px 25px rgba(67, 233, 123, 0.3)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.6';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            e.target.querySelector('[data-hover-icon]').style.opacity = '0.3';
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Subjects</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{schoolData.totalSubjects}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Taught Subjects</div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
            Click to view all subjects <span style={{ fontSize: '14px' }}>→</span>
          </div>
          <div 
            data-hover-icon
            style={{ 
              position: 'absolute', 
              top: '10px', 
              right: '10px', 
              fontSize: '16px', 
              opacity: 0.3,
              transition: 'opacity 0.3s ease'
            }}
          >
            👆
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: '20px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Top Performing Classes</h3>
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Rank</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Avg Score</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Students</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Improvement</th>
                </tr>
              </thead>
              <tbody>
                {classRankings.map((classRank, index) => (
                  <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      <span style={{ 
                        background: index < 3 ? '#ffd700' : '#e9ecef', 
                        color: index < 3 ? '#000' : '#6c757d',
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: 'bold' 
                      }}>
                        #{classRank.rank}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                      {classRank.className}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#28a745' }}>
                      {classRank.averageScore}%
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      {classRank.totalStudents}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', color: '#28a745', fontWeight: '500' }}>
                      {classRank.improvement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Recent Activities</h3>
          <div style={{ maxHeight: '300px', overflow: 'auto' }}>
            {recentActivities.map((activity, index) => (
              <div key={index} style={{ 
                padding: '15px', 
                borderBottom: index < recentActivities.length - 1 ? '1px solid #e9ecef' : 'none',
                background: index % 2 === 0 ? '#f8f9fa' : '#ffffff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ 
                    background: '#007bff', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '11px', 
                    fontWeight: '500' 
                  }}>
                    {activity.type}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6c757d' }}>{activity.timestamp}</span>
                </div>
                <div style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                  {activity.description}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  by {activity.user}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const StudentsPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Student Management</h2>
        <button style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          + Add New Student
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Filters</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Class
            </label>
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Classes</option>
              <option value="senior6a">Senior 6 A</option>
              <option value="senior6b">Senior 6 B</option>
              <option value="senior5a">Senior 5 A</option>
              <option value="senior5b">Senior 5 B</option>
              <option value="senior4a">Senior 4 A</option>
              <option value="senior4b">Senior 4 B</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Subject
            </label>
            <select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              <option value="all">All Subjects</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="english">English</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Date
            </label>
            <input 
              type="date" 
              value={filterDate} 
              onChange={(e) => setFilterDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    STU{String(index + 1).padStart(4, '0')}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    Student {index + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    Senior {Math.floor(index / 2) + 4} {String.fromCharCode(65 + (index % 2))}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    student{index + 1}@school.com
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ 
                      background: '#28a745', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '11px' 
                    }}>
                      Active
                    </span>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Delete
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

  const TeachersPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Teacher Management</h2>
        <button style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          + Add New Teacher
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Filters</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Subject
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Subjects</option>
              <option value="math">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="biology">Biology</option>
              <option value="english">English</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Status
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Teacher ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Classes</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (_, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    TCH{String(index + 1).padStart(4, '0')}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    Teacher {index + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'][index % 8]}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    teacher{index + 1}@school.com
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {Math.floor(Math.random() * 5) + 2}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ 
                      background: '#28a745', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '11px' 
                    }}>
                      Active
                    </span>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Delete
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

  const ParentsPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Parent Management</h2>
        <button style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          + Add New Parent
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Filters</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Student Class
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Classes</option>
              <option value="senior6a">Senior 6 A</option>
              <option value="senior6b">Senior 6 B</option>
              <option value="senior5a">Senior 5 A</option>
              <option value="senior5b">Senior 5 B</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Status
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Parent ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Phone</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Students</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    PAR{String(index + 1).padStart(4, '0')}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    Parent {index + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    +250 78{String(Math.floor(Math.random() * 900) + 100)} {String(Math.floor(Math.random() * 900) + 100)}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    parent{index + 1}@email.com
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {Math.floor(Math.random() * 3) + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ 
                      background: '#28a745', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '11px' 
                    }}>
                      Active
                    </span>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Delete
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

  const ClassesPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Class Management</h2>
        <button style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          + Add New Class
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Filters</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Level
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Levels</option>
              <option value="senior6">Senior 6</option>
              <option value="senior5">Senior 5</option>
              <option value="senior4">Senior 4</option>
              <option value="senior3">Senior 3</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Status
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Level</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Students</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class Teacher</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Average Score</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 12 }, (_, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    CLS{String(index + 1).padStart(4, '0')}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    Senior {Math.floor(index / 2) + 4} {String.fromCharCode(65 + (index % 2))}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    Senior {Math.floor(index / 2) + 4}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {Math.floor(Math.random() * 20) + 30}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    Teacher {index + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#28a745' }}>
                    {Math.floor(Math.random() * 20) + 75}%
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Delete
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

  const SubjectsPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Subject Management</h2>
        <button style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          + Add New Subject
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Filters</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '15px' 
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Category
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Categories</option>
              <option value="sciences">Sciences</option>
              <option value="languages">Languages</option>
              <option value="humanities">Humanities</option>
              <option value="mathematics">Mathematics</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Level
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="all">All Levels</option>
              <option value="senior6">Senior 6</option>
              <option value="senior5">Senior 5</option>
              <option value="senior4">Senior 4</option>
              <option value="senior3">Senior 3</option>
            </select>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'end' }}>
            <button style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject ID</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Category</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Levels</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Teachers</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Students</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'French', 'Kinyarwanda', 'History', 'Geography', 'Computer Science', 'Entrepreneurship', 'Political Science', 'Swahili', 'Spiritual Activities'].map((subject, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    SUB{String(index + 1).padStart(4, '0')}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    {subject}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {subject === 'Mathematics' ? 'Mathematics' : 
                     ['Physics', 'Chemistry', 'Biology'].includes(subject) ? 'Sciences' :
                     ['English', 'French', 'Kinyarwanda', 'Swahili'].includes(subject) ? 'Languages' :
                     ['History', 'Geography', 'Political Science'].includes(subject) ? 'Humanities' :
                     'Other'}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    Senior 4-6
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {Math.floor(Math.random() * 3) + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {Math.floor(Math.random() * 100) + 200}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Delete
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

  const RankingsPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Performance Rankings</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <option value="term1">Term I</option>
            <option value="term2">Term II</option>
            <option value="term3">Term III</option>
          </select>
          <select style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <option value="2024">2024-2025</option>
            <option value="2023">2023-2024</option>
          </select>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Top 5 Classes</h3>
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Rank</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Avg Score</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Improvement</th>
                </tr>
              </thead>
              <tbody>
                {classRankings.slice(0, 5).map((classRank, index) => (
                  <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      <span style={{ 
                        background: index < 3 ? '#ffd700' : '#e9ecef', 
                        color: index < 3 ? '#000' : '#6c757d',
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: 'bold' 
                      }}>
                        #{classRank.rank}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                      {classRank.className}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#28a745' }}>
                      {classRank.averageScore}%
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', color: '#28a745', fontWeight: '500' }}>
                      {classRank.improvement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Top 5 Students</h3>
          <div style={{ overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Rank</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                  <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Score</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }, (_, index) => (
                  <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      <span style={{ 
                        background: index < 3 ? '#ffd700' : '#e9ecef', 
                        color: index < 3 ? '#000' : '#6c757d',
                        padding: '4px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: 'bold' 
                      }}>
                        #{index + 1}
                      </span>
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                      Student {index + 1}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                      Senior {Math.floor(index / 2) + 4} {String.fromCharCode(65 + (index % 2))}
                    </td>
                    <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#28a745' }}>
                      {Math.floor(Math.random() * 15) + 85}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Subject Performance</h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Average Score</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Top Class</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Lowest Class</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Improvement</th>
              </tr>
            </thead>
            <tbody>
              {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'].map((subject, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    {subject}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold', color: '#28a745' }}>
                    {Math.floor(Math.random() * 20) + 75}%
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    Senior {Math.floor(index / 2) + 4} {String.fromCharCode(65 + (index % 2))}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    Senior {Math.floor(index / 2) + 4} {String.fromCharCode(65 + (index % 2))}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', color: '#28a745', fontWeight: '500' }}>
                    +{Math.floor(Math.random() * 8) + 2}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const AttendancePage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Attendance Management</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            📊 Generate Report
          </button>
          <button style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            + Mark Attendance
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Quick Stats</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#28a745' }}>95.2%</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Today's Attendance</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff' }}>1,189</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Present Today</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#dc3545' }}>61</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Absent Today</div>
          </div>
          <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffc107' }}>23</div>
            <div style={{ fontSize: '14px', color: '#666' }}>Late Today</div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Recent Attendance Records</h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Present</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Absent</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Late</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Percentage</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 10 }, (_, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {new Date(Date.now() - index * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    Senior {Math.floor(index / 2) + 4} {String.fromCharCode(65 + (index % 2))}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', color: '#28a745', fontWeight: '500' }}>
                    {Math.floor(Math.random() * 10) + 35}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', color: '#dc3545' }}>
                    {Math.floor(Math.random() * 5) + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', color: '#ffc107' }}>
                    {Math.floor(Math.random() * 3) + 1}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: 'bold' }}>
                    {Math.floor(Math.random() * 10) + 90}%
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <button style={{
                      background: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '4px 8px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      fontSize: '11px'
                    }}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const ExamsPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Exam Management</h2>
        <button style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          + Schedule Exam
        </button>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#333' }}>Upcoming Exams</h3>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Exam Name</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Subject</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Class</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Duration</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (_, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', fontWeight: '500' }}>
                    {['Mid-Term Exam', 'Final Exam', 'CAT 1', 'CAT 2', 'End of Term', 'Mock Exam', 'Practice Test', 'Assessment'][index % 8]}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'History', 'Geography', 'Computer Science'][index % 8]}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    Senior {Math.floor(index / 2) + 4} {String.fromCharCode(65 + (index % 2))}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {new Date(Date.now() + (index + 1) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    {Math.floor(Math.random() * 2) + 2}h
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <span style={{ 
                      background: index < 3 ? '#28a745' : '#ffc107', 
                      color: 'white', 
                      padding: '4px 8px', 
                      borderRadius: '12px', 
                      fontSize: '11px' 
                    }}>
                      {index < 3 ? 'Scheduled' : 'Pending'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>
                    <div style={{ display: 'flex', gap: '5px' }}>
                      <button style={{
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Edit
                      </button>
                      <button style={{
                        background: '#dc3545',
                        color: 'white',
                        border: 'none',
                        padding: '4px 8px',
                        borderRadius: '3px',
                        cursor: 'pointer',
                        fontSize: '11px'
                      }}>
                        Delete
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

  const TimetablePage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>School Timetable</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <option value="senior6">Senior 6</option>
            <option value="senior5">Senior 5</option>
            <option value="senior4">Senior 4</option>
            <option value="senior3">Senior 3</option>
          </select>
          <button style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            📄 Export PDF
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #dee2e6' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6', fontWeight: 'bold' }}>Time</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6', fontWeight: 'bold' }}>Monday</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6', fontWeight: 'bold' }}>Tuesday</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6', fontWeight: 'bold' }}>Wednesday</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6', fontWeight: 'bold' }}>Thursday</th>
                <th style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6', fontWeight: 'bold' }}>Friday</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 8 }, (_, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', textAlign: 'center', border: '1px solid #dee2e6', fontWeight: '500', background: '#f8f9fa' }}>
                    {index === 0 ? '8:00-8:50' : 
                     index === 1 ? '8:50-9:40' : 
                     index === 2 ? '9:40-10:30' : 
                     index === 3 ? '10:30-10:45' : 
                     index === 4 ? '10:45-11:35' : 
                     index === 5 ? '11:35-12:25' : 
                     index === 6 ? '12:25-2:00' : '2:00-2:50'}
                  </td>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, dayIndex) => (
                    <td key={dayIndex} style={{ 
                      padding: '12px', 
                      textAlign: 'center', 
                      border: '1px solid #dee2e6',
                      background: index === 3 ? '#90EE90' : 
                                 index === 5 ? '#FFD700' : 
                                 index % 2 === 0 ? '#ffffff' : '#f8f9fa'
                    }}>
                      {index === 3 ? 'Break' : 
                       index === 5 ? 'Lunch' : 
                       ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'][dayIndex % 5]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const CommunicationsPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Communications</h2>
        <button style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          + Send Message
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', 
        gap: '20px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Recent Messages</h3>
          <div style={{ maxHeight: '400px', overflow: 'auto' }}>
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} style={{ 
                padding: '15px', 
                borderBottom: index < 5 ? '1px solid #e9ecef' : 'none',
                background: index % 2 === 0 ? '#f8f9fa' : '#ffffff'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <span style={{ 
                    background: '#007bff', 
                    color: 'white', 
                    padding: '4px 8px', 
                    borderRadius: '12px', 
                    fontSize: '11px', 
                    fontWeight: '500' 
                  }}>
                    {['Announcement', 'Reminder', 'Update', 'Notice', 'Alert', 'Info'][index % 6]}
                  </span>
                  <span style={{ fontSize: '12px', color: '#6c757d' }}>
                    {index === 0 ? '2 hours ago' : 
                     index === 1 ? '1 day ago' : 
                     index === 2 ? '2 days ago' : 
                     index === 3 ? '3 days ago' : 
                     index === 4 ? '1 week ago' : '2 weeks ago'}
                  </span>
                </div>
                <div style={{ fontSize: '14px', color: '#333', marginBottom: '5px', fontWeight: '500' }}>
                  {['Parent Meeting Scheduled', 'Exam Results Available', 'School Holiday Notice', 'Sports Day Event', 'Library Week', 'Career Guidance Session'][index % 6]}
                </div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  Sent to: {['All Parents', 'Senior 6 Students', 'All Students', 'All Students', 'All Students', 'Senior 5 Students'][index % 6]}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Quick Stats</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px' 
          }}>
            <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#007bff' }}>156</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Messages Sent</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#28a745' }}>89%</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Read Rate</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffc107' }}>23</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Pending</div>
            </div>
            <div style={{ textAlign: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>12</div>
              <div style={{ fontSize: '12px', color: '#666' }}>Failed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AnalyticsPage = () => (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0, color: '#333' }}>Analytics Dashboard</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            <option value="2024">2024-2025</option>
            <option value="2023">2023-2024</option>
          </select>
          <button style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            📊 Export Report
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Academic Performance Trends</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>📈</div>
              <div>Performance Chart</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Term I → Term II → Term III</div>
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Attendance Trends</h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ textAlign: 'center', color: '#666' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>📊</div>
              <div>Attendance Chart</div>
              <div style={{ fontSize: '12px', marginTop: '5px' }}>Monthly Overview</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Key Metrics</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '20px' 
        }}>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>87.5%</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Overall Pass Rate</div>
            <div style={{ fontSize: '12px', color: '#28a745' }}>↑ +2.3% from last term</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#007bff' }}>94.2%</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Average Attendance</div>
            <div style={{ fontSize: '12px', color: '#007bff' }}>↑ +1.1% from last term</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffc107' }}>78.9%</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Parent Engagement</div>
            <div style={{ fontSize: '12px', color: '#ffc107' }}>↑ +5.7% from last term</div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#dc3545' }}>92.1%</div>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '10px' }}>Teacher Satisfaction</div>
            <div style={{ fontSize: '12px', color: '#dc3545' }}>↑ +3.2% from last term</div>
          </div>
        </div>
      </div>
    </div>
  );

  const SettingsPage = () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>System Settings</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>General Settings</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              School Name
            </label>
            <input 
              type="text" 
              defaultValue="Rwanda Coding Academy"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Academic Year
            </label>
            <input 
              type="text" 
              defaultValue="2024-2025"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Time Zone
            </label>
            <select style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              <option value="east-africa">East Africa Time (GMT+3)</option>
              <option value="utc">UTC</option>
            </select>
          </div>
          <button style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%'
          }}>
            Save Changes
          </button>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Notification Settings</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" defaultChecked style={{ marginRight: '10px' }} />
              <span style={{ fontSize: '14px', color: '#555' }}>Email Notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" defaultChecked style={{ marginRight: '10px' }} />
              <span style={{ fontSize: '14px', color: '#555' }}>SMS Notifications</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <input type="checkbox" style={{ marginRight: '10px' }} />
              <span style={{ fontSize: '14px', color: '#555' }}>Push Notifications</span>
            </label>
          </div>
          <button style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%'
          }}>
            Update Notifications
          </button>
        </div>
      </div>
    </div>
  );

  const ProfilePage = () => (
    <div style={{ padding: '20px' }}>
      <h2 style={{ margin: '0 0 20px 0', color: '#333' }}>Admin Profile</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '20px' 
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Personal Information</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Full Name
            </label>
            <input 
              type="text" 
              defaultValue={currentUser?.name || 'Admin User'}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Email
            </label>
            <input 
              type="email" 
              defaultValue={currentUser?.email || 'admin@school.com'}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Role
            </label>
            <input 
              type="text" 
              defaultValue="Administrator"
              disabled
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                background: '#f8f9fa',
                color: '#666'
              }}
            />
          </div>
          <button style={{
            background: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%'
          }}>
            Update Profile
          </button>
        </div>

        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Change Password</h3>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Current Password
            </label>
            <input 
              type="password" 
              placeholder="Enter current password"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              New Password
            </label>
            <input 
              type="password" 
              placeholder="Enter new password"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#555' }}>
              Confirm New Password
            </label>
            <input 
              type="password" 
              placeholder="Confirm new password"
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <button style={{
            background: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px',
            width: '100%'
          }}>
            Change Password
          </button>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginTop: '20px'
      }}>
        <h3 style={{ margin: '0 0 20px 0', color: '#333' }}>Account Actions</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <button style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            🚪 Logout
          </button>
          <button style={{
            background: '#ffc107',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            🔒 Lock Account
          </button>
          <button style={{
            background: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            📧 Contact Support
          </button>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'students':
        return <StudentsPage />;
      case 'teachers':
        return <TeachersPage />;
      case 'parents':
        return <ParentsPage />;
      case 'classes':
        return <ClassesPage />;
      case 'subjects':
        return <SubjectsPage />;
      case 'rankings':
        return <RankingsPage />;
      case 'attendance':
        return <AttendancePage />;
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
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f5f5' }}>
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        userRole="admin"
        isMobile={isMobile}
      />
      
      <div style={{ 
        flex: 1, 
        marginLeft: isMobile ? 0 : (sidebarOpen ? '250px' : '60px'),
        transition: 'margin-left 0.3s ease'
      }}>
        <div style={{ 
          background: 'white', 
          padding: '20px', 
          borderBottom: '1px solid #e9ecef',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          <div>
            <h1 style={{ margin: '0 0 5px 0', color: '#333', fontSize: '24px' }}>
              Admin Dashboard
            </h1>
            <p style={{ margin: 0, color: '#6c757d', fontSize: '14px' }}>
              {selectedYear} • {schoolData.academicYear}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  padding: '8px 12px',
                  border: '1px solid #ddd',
                  borderRadius: '20px',
                  fontSize: '14px',
                  width: '200px'
                }}
              />
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '8px 16px',
              background: '#f8f9fa',
              borderRadius: '20px'
            }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%', 
                background: '#007bff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <span style={{ fontSize: '14px', color: '#333' }}>
                {currentUser?.name || 'Admin'}
              </span>
            </div>
          </div>
        </div>

        {renderPage()}
      </div>
    </div>
  );
};

export default Admin;
