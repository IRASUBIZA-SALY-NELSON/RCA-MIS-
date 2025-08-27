import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Discipline = () => {
  const { currentUser, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Academic Year 2H - 2P Term II');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [newIncident, setNewIncident] = useState({
    studentId: '',
    type: '',
    severity: 'Minor',
    description: '',
    actionTaken: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('all');

  // Authentication guard
  useEffect(() => {
    if (currentUser === null) {
      return;
    }

    if (!currentUser || currentUser.role !== 'discipline') {
      console.error('🚫 Unauthorized access attempt to /discipline route:', {
        user: currentUser,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        path: window.location.pathname
      });
      
      navigate('/', { replace: true });
      return;
    }

    setIsAuthorized(true);
    console.log('✅ Discipline access authorized:', {
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

  const studentsData = [
    {
      id: 'STD001',
      name: 'Alice Uwimana',
      class: 'S6 MCB',
      parentName: 'Jean Uwimana',
      parentPhone: '+250788123456',
      conductGrade: 'A',
      totalIncidents: 1,
      lastIncidentDate: '2024-02-10',
      status: 'Good Standing',
      incidents: [
        {
          id: 'INC001',
          date: '2024-02-10',
          type: 'Late Arrival',
          severity: 'Minor',
          description: 'Arrived 15 minutes late to morning assembly',
          actionTaken: 'Verbal Warning',
          reportedBy: 'Ms. Mukandayisenga',
          resolved: true,
          followUp: 'None required'
        }
      ]
    },
    {
      id: 'STD002',
      name: 'David Mukamana',
      class: 'S5 PCM',
      parentName: 'Marie Mukamana',
      parentPhone: '+250788234567',
      conductGrade: 'B',
      totalIncidents: 2,
      lastIncidentDate: '2024-02-15',
      status: 'Under Observation',
      incidents: [
        {
          id: 'INC002',
          date: '2024-02-15',
          type: 'Uniform Violation',
          severity: 'Minor',
          description: 'Improper uniform - missing tie',
          actionTaken: 'Written Warning',
          reportedBy: 'Mr. Nkurunziza',
          resolved: true,
          followUp: 'Monitor uniform compliance'
        },
        {
          id: 'INC003',
          date: '2024-02-08',
          type: 'Disrespect',
          severity: 'Moderate',
          description: 'Argued with teacher during class',
          actionTaken: 'Detention',
          reportedBy: 'Ms. Ingabire',
          resolved: true,
          followUp: 'Parent meeting scheduled'
        }
      ]
    },
    {
      id: 'STD003',
      name: 'Sarah Ingabire',
      class: 'S4 MCE',
      parentName: 'Paul Ingabire',
      parentPhone: '+250788345678',
      conductGrade: 'A',
      totalIncidents: 0,
      lastIncidentDate: null,
      status: 'Excellent',
      incidents: []
    },
    {
      id: 'STD004',
      name: 'John Nkurunziza',
      class: 'S6 HEG',
      parentName: 'Grace Nkurunziza',
      parentPhone: '+250788456789',
      conductGrade: 'C',
      totalIncidents: 3,
      lastIncidentDate: '2024-02-20',
      status: 'Probation',
      incidents: [
        {
          id: 'INC004',
          date: '2024-02-20',
          type: 'Fighting',
          severity: 'Major',
          description: 'Physical altercation with another student',
          actionTaken: 'Suspension - 3 days',
          reportedBy: 'Security Team',
          resolved: false,
          followUp: 'Counseling required'
        }
      ]
    },
    {
      id: 'STD005',
      name: 'Emma Karenzi',
      class: 'S5 MPC',
      parentName: 'Robert Karenzi',
      parentPhone: '+250788567890',
      conductGrade: 'B',
      totalIncidents: 1,
      lastIncidentDate: '2024-02-12',
      status: 'Good Standing',
      incidents: [
        {
          id: 'INC005',
          date: '2024-02-12',
          type: 'Academic Dishonesty',
          severity: 'Moderate',
          description: 'Caught cheating during mathematics exam',
          actionTaken: 'Exam retake + Counseling',
          reportedBy: 'Math Teacher',
          resolved: true,
          followUp: 'Academic integrity workshop'
        }
      ]
    }
  ];

  // Discipline stats
  const disciplineStats = {
    totalStudents: studentsData.length,
    totalIncidents: studentsData.reduce((sum, s) => sum + s.totalIncidents, 0),
    pendingIncidents: studentsData.reduce((sum, s) => sum + s.incidents.filter(i => !i.resolved).length, 0),
    criticalCases: studentsData.filter(s => s.status === 'Probation' || s.status === 'Disciplinary Action').length,
    conductGrades: {
      A: studentsData.filter(s => s.conductGrade === 'A').length,
      B: studentsData.filter(s => s.conductGrade === 'B').length,
      C: studentsData.filter(s => s.conductGrade === 'C').length,
      D: studentsData.filter(s => s.conductGrade === 'D').length,
      F: studentsData.filter(s => s.conductGrade === 'F').length
    },
    incidentTypes: {
      'Late Arrival': studentsData.reduce((sum, s) => sum + s.incidents.filter(i => i.type === 'Late Arrival').length, 0),
      'Uniform Violation': studentsData.reduce((sum, s) => sum + s.incidents.filter(i => i.type === 'Uniform Violation').length, 0),
      'Disrespect': studentsData.reduce((sum, s) => sum + s.incidents.filter(i => i.type === 'Disrespect').length, 0),
      'Fighting': studentsData.reduce((sum, s) => sum + s.incidents.filter(i => i.type === 'Fighting').length, 0),
      'Academic Dishonesty': studentsData.reduce((sum, s) => sum + s.incidents.filter(i => i.type === 'Academic Dishonesty').length, 0),
      'Property Damage': studentsData.reduce((sum, s) => sum + s.incidents.filter(i => i.type === 'Property Damage').length, 0),
      'Bullying': studentsData.reduce((sum, s) => sum + s.incidents.filter(i => i.type === 'Bullying').length, 0)
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Common styles
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden'
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

  const hamburgerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '24px',
    height: '24px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    zIndex: 10
  };

  const hamburgerLineStyle = {
    width: '24px',
    height: '3px',
    backgroundColor: '#4a5568',
    borderRadius: '2px',
    transition: 'all 0.3s ease'
  };

  const searchContainerStyle = {
    position: 'relative',
    width: isMobile ? '250px' : '400px',
    display: 'flex',
    alignItems: 'center'
  };

  const searchInputStyle = {
    width: '100%',
    padding: '8px 16px 8px 40px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    backgroundColor: '#f8fafc'
  };

  const searchIconStyle = {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#a0aec0',
    fontSize: '16px'
  };

  const profileStyle = {
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
  };

  const contentStyle = {
    padding: '24px',
    flex: '1',
    overflow: 'auto',
    minHeight: 0
  };

  // Dashboard Page
  const DashboardPage = () => (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
          Discipline Dashboard
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280' }}>
          Overview of student behavior and conduct management
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div 
          onClick={() => setCurrentPage('conduct')}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Total Students</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{disciplineStats.totalStudents}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Under Supervision</div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
            Click to view conduct records <span style={{ fontSize: '14px' }}>→</span>
          </div>
        </div>
        
        <div 
          onClick={() => setCurrentPage('incidents')}
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '24px',
            borderRadius: '16px',
            color: 'white',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(240, 147, 251, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Total Incidents</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{disciplineStats.totalIncidents}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Recorded Cases</div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.8, display: 'flex', alignItems: 'center', gap: '5px' }}>
            Click to manage incidents <span style={{ fontSize: '14px' }}>→</span>
          </div>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Pending Cases</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{disciplineStats.pendingIncidents}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>Require Action</div>
        </div>
        
        <div style={{
          background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
          padding: '24px',
          borderRadius: '16px',
          color: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Critical Cases</h3>
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>{disciplineStats.criticalCases}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>High Priority</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: '24px'
      }}>
        {/* Recent Incidents */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
              Recent Incidents
            </h3>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {studentsData.filter(s => s.incidents.length > 0).slice(0, 5).map(student => (
              student.incidents.slice(0, 1).map(incident => (
                <div key={incident.id} style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                        {student.name}
                      </h4>
                      <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                        {student.class} • {incident.type}
                      </p>
                    </div>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: incident.severity === 'Major' ? '#fee2e2' : incident.severity === 'Moderate' ? '#fef3c7' : '#dbeafe',
                      color: incident.severity === 'Major' ? '#dc2626' : incident.severity === 'Moderate' ? '#d97706' : '#2563eb'
                    }}>
                      {incident.severity}
                    </span>
                  </div>
                  <p style={{ fontSize: '14px', color: '#374151', margin: '0' }}>
                    {incident.description}
                  </p>
                </div>
              ))
            ))}
          </div>
        </div>

        {/* Conduct Grade Distribution */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 24px 0' }}>
            Conduct Grades
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(disciplineStats.conductGrades).map(([grade, count]) => (
              <div key={grade} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: grade === 'A' ? '#10b981' : grade === 'B' ? '#3b82f6' : grade === 'C' ? '#f59e0b' : grade === 'D' ? '#ef4444' : '#991b1b', 
                    borderRadius: '50%' 
                  }}></div>
                  <span style={{ fontSize: '14px', color: '#374151' }}>Grade {grade}</span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                  {count}
                </span>
              </div>
            ))}
          </div>

          {/* Incident Types */}
          <div style={{ marginTop: '32px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 16px 0' }}>
              Common Incident Types
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {Object.entries(disciplineStats.incidentTypes)
                .filter(([type, count]) => count > 0)
                .slice(0, 3)
                .map(([type, count]) => (
                  <div key={type} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ color: '#6b7280' }}>{type}</span>
                    <span style={{ fontWeight: '600', color: '#1f2937' }}>{count}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Conduct Records Page
  const ConductRecordsPage = () => {
    const filteredStudents = studentsData.filter(student => {
      const matchesGrade = filterGrade === 'all' || student.conductGrade === filterGrade;
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesGrade && matchesSearch;
    });

    return (
      <div style={{ width: '100%', padding: '24px' }}>
        <h1>Conduct Records</h1>
        <input placeholder="Search students..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '12px', marginBottom: '16px', width: '100%', maxWidth: '400px', borderRadius: '8px', border: '1px solid #cbd5e1' }} />
        <select value={filterGrade} onChange={e => setFilterGrade(e.target.value)}
          style={{ padding: '12px', marginLeft: '16px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
          <option value="all">All Grades</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>

        <div style={{ overflowX: 'auto', marginTop: '24px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#1e293b', color: 'white' }}>
              <tr>
                <th style={{ padding: '12px' }}>ID</th>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Class</th>
                <th style={{ padding: '12px' }}>Parent</th>
                <th style={{ padding: '12px' }}>Grade</th>
                <th style={{ padding: '12px' }}>Incidents</th>
                <th style={{ padding: '12px' }}>Last Incident</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id} style={{ borderBottom: '1px solid #cbd5e1' }}>
                  <td style={{ padding: '12px' }}>{student.id}</td>
                  <td style={{ padding: '12px' }}>{student.name}</td>
                  <td style={{ padding: '12px' }}>{student.class}</td>
                  <td style={{ padding: '12px' }}>{student.parentName}</td>
                  <td style={{ padding: '12px', fontWeight: '700' }}>{student.conductGrade}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{student.totalIncidents}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>{student.lastIncidentDate}</td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor:
                        student.status === 'Excellent' ? '#d1fae5' :
                        student.status === 'Good Standing' ? '#dbeafe' :
                        student.status === 'Under Observation' ? '#fef3c7' :
                        student.status === 'Probation' ? '#fee2e2' :
                        student.status === 'Disciplinary Action' ? '#fecaca' : '#f3f4f6',
                      color:
                        student.status === 'Excellent' ? '#065f46' :
                        student.status === 'Good Standing' ? '#1e40af' :
                        student.status === 'Under Observation' ? '#b45309' :
                        student.status === 'Probation' ? '#b91c1c' :
                        student.status === 'Disciplinary Action' ? '#991b1b' : '#374151'
                    }}>{student.status}</span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <button onClick={() => { setSelectedIncident(student.incidents[0] || null); setShowIncidentModal(true); }}
                      style={{ padding: '6px 12px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '8px', fontSize: '12px', cursor: 'pointer' }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Incident Modal
  const IncidentModal = () => {
    if (!showIncidentModal) return null;
    const incident = selectedIncident;
    return (
      <div style={{
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100
      }}>
        <div style={{ background: 'white', borderRadius: '12px', padding: '24px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
          <h2>Incident Details</h2>
          {incident ? (
            <div>
              <p><strong>Date:</strong> {incident.date}</p>
              <p><strong>Type:</strong> {incident.type}</p>
              <p><strong>Severity:</strong> {incident.severity}</p>
              <p><strong>Description:</strong> {incident.description}</p>
              <p><strong>Action Taken:</strong> {incident.actionTaken}</p>
              <p><strong>Reported By:</strong> {incident.reportedBy}</p>
              <p><strong>Resolved:</strong> {incident.resolved ? 'Yes' : 'No'}</p>
              <p><strong>Follow-up:</strong> {incident.followUp}</p>
            </div>
          ) : <p>No incident selected</p>}
          <button onClick={() => setShowIncidentModal(false)}
            style={{ marginTop: '16px', padding: '10px 16px', borderRadius: '8px', backgroundColor: '#ef4444', color: 'white', border: 'none', cursor: 'pointer' }}>Close</button>
        </div>
      </div>
    );
  };

  // Incidents Management Page
  const IncidentsPage = () => (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
          Incident Management
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280' }}>
          Track and manage all disciplinary incidents
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
            All Incidents
          </h3>
          <button
            onClick={() => setShowIncidentModal(true)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            + Report New Incident
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Student</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Severity</th>
                <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Action Taken</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Status</th>
                <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentsData.flatMap(student => 
                student.incidents.map(incident => (
                  <tr key={incident.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>
                      {incident.date}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                          {student.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {student.class}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>
                      {incident.type}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: incident.severity === 'Major' ? '#fee2e2' : incident.severity === 'Moderate' ? '#fef3c7' : '#dbeafe',
                        color: incident.severity === 'Major' ? '#dc2626' : incident.severity === 'Moderate' ? '#d97706' : '#2563eb'
                      }}>
                        {incident.severity}
                      </span>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>
                      {incident.actionTaken}
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: incident.resolved ? '#d1fae5' : '#fee2e2',
                        color: incident.resolved ? '#065f46' : '#dc2626'
                      }}>
                        {incident.resolved ? 'Resolved' : 'Pending'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => {
                          setSelectedIncident(incident);
                          setShowIncidentModal(true);
                        }}
                        style={{
                          padding: '8px 16px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        userRole="discipline"
        isMobile={isMobile}
      />
      
      <div style={mainContentStyle}>
        {/* Header */}
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isMobile && (
              <button onClick={toggleSidebar} style={hamburgerStyle}>
                <div style={hamburgerLineStyle}></div>
                <div style={hamburgerLineStyle}></div>
                <div style={hamburgerLineStyle}></div>
              </button>
            )}
            <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
              Discipline Management
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={searchContainerStyle}>
              <div style={searchIconStyle}>🔍</div>
              <input
                type="text"
                placeholder="Search students, incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
            </div>
            
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                backgroundColor: 'white'
              }}
            >
              <option value="Academic Year 2H - 2P Term II">Academic Year 2H - 2P Term II</option>
              <option value="Academic Year 2H - 2P Term I">Academic Year 2H - 2P Term I</option>
              <option value="Academic Year 2H - 1P Term III">Academic Year 2H - 1P Term III</option>
            </select>
            
            <div style={profileStyle}>
              {currentUser?.name?.charAt(0) || 'D'}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={contentStyle}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'conduct' && <ConductRecordsPage />}
          {currentPage === 'incidents' && <IncidentsPage />}
        </div>

        <IncidentModal />
      </div>
    </div>
  );
};

export default Discipline;
