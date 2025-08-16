import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Teacher = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClass, setSelectedClass] = useState('Year 2C');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddMarksModal, setShowAddMarksModal] = useState(false);

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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Sample data
  const classes = [
    { id: 1, name: 'Year 1', students: 45, color: '#8b5cf6' },
    { id: 2, name: 'Year 2', students: 38, color: '#a855f7' },
    { id: 3, name: 'Year 3', students: 42, color: '#7c3aed' }
  ];

  const students = [
    { id: 1, name: 'Burigo Jabes', email: 'burigo.jabes@rca.rw', gender: 'M', code: 'RCA0302RYZ', marks: { math: 85, english: 78, science: 92 } },
    { id: 2, name: 'Abijuru Seth', email: 'abijuru.seth@rca.rw', gender: 'M', code: 'RCA0303RYZ', marks: { math: 92, english: 88, science: 85 } },
    { id: 3, name: 'Ntagungira All Rashid', email: 'ntagungira.rashid@rca.rw', gender: 'M', code: 'RCA0304RYZ', marks: { math: 78, english: 85, science: 90 } },
    { id: 4, name: 'Mutegetsi Prince', email: 'mutegetsi.prince@rca.rw', gender: 'M', code: 'RCA0305RYZ', marks: { math: 88, english: 92, science: 87 } }
  ];

  const subjects = ['Mathematics', 'English', 'Science', 'Computer Science', 'Physics', 'Chemistry'];

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
      {/* Enhanced Header Section */}
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
            Welcome Back, Teacher! 👨‍🏫
          </h1>
          <p style={{ 
            fontSize: '16px', 
            opacity: 0.9,
            marginBottom: '0',
            fontWeight: '400'
          }}>
            Manage your classes, students, and academic progress
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
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#22c55e', marginBottom: '4px' }}>3</div>
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
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>125</div>
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
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#a855f7', marginBottom: '4px' }}>6</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Subjects</div>
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
          <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>89%</div>
          <div style={{ fontSize: '14px', color: '#6b7280' }}>Avg. Performance</div>
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
          <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c' }}>Your Classes</h2>
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
            + Add New Class
          </button>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
          gap: '20px' 
        }}>
          {classes.map((cls) => (
            <div key={cls.id} style={{
              backgroundColor: cls.color,
              color: 'white',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              ':hover': { transform: 'translateY(-4px)' }
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎓</div>
              <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>{cls.name}</div>
              <div style={{ fontSize: '16px', opacity: 0.9 }}>{cls.students} Students</div>
            </div>
          ))}
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
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Students Management</h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setShowAddStudentModal(true)}
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            + Add Student
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
            📥 Import CSV
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
            <option>Year 1</option>
            <option>Year 2</option>
            <option>Year 3</option>
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
            Students List ({students.length} students)
          </h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>#</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Student Name</th>
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
                        title="View Details"
                      >
                        👁️
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
                        title="Edit Student"
                      >
                        ✏️
                      </button>
                                             <button style={{
                         width: '32px',
                         height: '32px',
                         borderRadius: '6px',
                         border: '1px solid #fee2e2',
                         backgroundColor: '#fee2e2',
                         cursor: 'pointer',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         color: '#dc2626'
                       }}
                         title="Delete Student"
                       >
                         🗑️
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
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Students Marks Management</h1>
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
              cursor: 'pointer'
            }}
          >
            + Add Marks
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
            📥 Download Excel
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
            📤 Upload Excel
          </button>
        </div>
      </div>

      {/* Class Selection and Filters */}
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
              Select Class
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
              <option>Year 1</option>
              <option>Year 2C</option>
              <option>Year 3</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Select Subject
            </label>
            <select style={{
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              minWidth: '200px'
            }}>
              <option>All Subjects</option>
              {subjects.map(subject => (
                <option key={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Grade Filter
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['A', 'B', 'C', 'D'].map(grade => (
                <button
                  key={grade}
                  style={{
                    padding: '8px 16px',
                    border: grade === 'D' ? 'none' : '1px solid #e2e8f0',
                    backgroundColor: grade === 'D' ? '#7c3aed' : 'white',
                    color: grade === 'D' ? 'white' : '#374151',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  {grade}
                </button>
              ))}
            </div>
          </div>
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
            {selectedClass} Students Marks
          </h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f8fafc' }}>
              <tr>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>#</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Student Name</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Mathematics</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>English</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Science</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Average</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Grade</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => {
                const avg = Math.round((student.marks.math + student.marks.english + student.marks.science) / 3);
                const grade = avg >= 90 ? 'A' : avg >= 80 ? 'B' : avg >= 70 ? 'C' : 'D';
                
                return (
                  <tr key={student.id} style={{ 
                    borderBottom: '1px solid #e2e8f0',
                    ':hover': { backgroundColor: '#f8fafc' }
                  }}>
                    <td style={{ padding: '16px', fontSize: '14px' }}>{index + 1}</td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '500' }}>{student.name}</td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>{student.marks.math}</td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>{student.marks.english}</td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>{student.marks.science}</td>
                    <td style={{ padding: '16px', fontSize: '14px', fontWeight: '600' }}>{avg}%</td>
                    <td style={{ padding: '16px', fontSize: '14px' }}>
                      <span style={{
                        backgroundColor: grade === 'A' ? '#dcfce7' : grade === 'B' ? '#dbeafe' : grade === 'C' ? '#fef3c7' : '#fee2e2',
                        color: grade === 'A' ? '#166534' : grade === 'B' ? '#1d4ed8' : grade === 'C' ? '#92400e' : '#dc2626',
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
                          title="View History"
                        >
                          📊
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Attendance Page
  const AttendancePage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Attendance Management</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Attendance tracking and management coming soon...</p>
      </div>
    </div>
  );

  // Assignments Page
  const AssignmentsPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Assignments Management</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Assignment creation and management coming soon...</p>
      </div>
    </div>
  );

  // Exams Page
  const ExamsPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Exams Management</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Exam scheduling and management coming soon...</p>
      </div>
    </div>
  );

  // Timetable Page
  const TimetablePage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Class Timetable</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Timetable management coming soon...</p>
      </div>
    </div>
  );

  // Communications Page
  const CommunicationsPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Communications</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Student and parent communications coming soon...</p>
      </div>
    </div>
  );

  // Analytics Page
  const AnalyticsPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Analytics & Reports</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Performance analytics and reporting coming soon...</p>
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
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>Teacher Profile</h1>
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '12px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
      }}>
        <p style={{ fontSize: '16px', color: '#4a5568' }}>Profile management coming soon...</p>
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
              Teacher Dashboard
            </div>
          </div>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            backgroundColor: '#3b82f6', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            color: 'white', 
            fontWeight: '600', 
            cursor: 'pointer' 
          }}>
            T
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
