import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ReportCard from './ReportCard';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Student = () => {
  const { currentUser, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Academic Year 2H - 2P Term II');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [publishForm, setPublishForm] = useState({
    projectName: '',
    websiteLink: '',
    githubLink: '',
    tags: [],
    description: ''
  });
  const [selectedProject, setSelectedProject] = useState(null);

  // Authentication guard
  useEffect(() => {
    if (currentUser === null) {
      // Still loading, wait
      return;
    }

    if (!currentUser || currentUser.role !== 'student') {
      console.error('🚫 Unauthorized access attempt to /student route:', {
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
    console.log('✅ parent access authorized:', {
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
        setSidebarOpen(false); // Closed by default on mobile
      }
      // On desktop, keep the current state (don't force it to always be open)
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // If not authenticated or not a student, show nothing
  if (!isAuthorized) {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Student-specific data based on currentUser
  const studentData = {
    id: currentUser.id,
    name: currentUser.name,
    email: currentUser.email,
    class: currentUser.class,
    studentCode: currentUser.studentCode,
    // Mock data specific to this student
    marks: [
      { lesson: "Mathematics", marks: 8.5, weight: 10, status: "PASS", comment: "EXAM", term: "Term II" },
      { lesson: "Mathematics", marks: 9.0, weight: 10, status: "PASS", comment: "CAT", term: "Term II" },
      { lesson: "Physics", marks: 7.5, weight: 10, status: "PASS", comment: "EXAM", term: "Term II" },
      { lesson: "Physics", marks: 8.0, weight: 10, status: "PASS", comment: "CAT", term: "Term II" },
      { lesson: "Computer Science", marks: 9.5, weight: 10, status: "PASS", comment: "EXAM", term: "Term II" }
    ],
    attendance: [
      { date: "2024-01-15", status: "Present", subject: "Mathematics", time: "08:00" },
      { date: "2024-01-14", status: "Present", subject: "Physics", time: "10:00" },
      { date: "2024-01-13", status: "Present", subject: "Computer Science", time: "14:00" },
      { date: "2024-01-12", status: "Late", subject: "Mathematics", time: "08:15" },
      { date: "2024-01-11", status: "Present", subject: "Physics", time: "10:00" },
      { date: "2024-01-10", status: "Absent", subject: "Computer Science", time: "14:00" },
      { date: "2024-01-09", status: "Present", subject: "Mathematics", time: "08:00" },
      { date: "2024-01-08", status: "Present", subject: "Physics", time: "10:00" }
    ],
    assignments: [
      { id: 1, title: "Calculus Problem Set", subject: "Mathematics", dueDate: "2024-01-20", status: "Submitted", grade: "A-" },
      { id: 2, title: "Physics Lab Report", subject: "Physics", dueDate: "2024-01-18", status: "Submitted", grade: "B+" },
      { id: 3, title: "Programming Project", subject: "Computer Science", dueDate: "2024-01-25", status: "Pending" }
    ],
    exams: [
      { id: 1, title: "Mid-Term Mathematics", subject: "Mathematics", date: "2024-01-30", duration: "2 hours", status: "Scheduled" },
      { id: 2, title: "Physics Final", subject: "Physics", date: "2024-02-05", duration: "3 hours", status: "Scheduled" },
      { id: 3, title: "Computer Science Practical", subject: "Computer Science", date: "2024-02-10", duration: "4 hours", status: "Scheduled" }
    ],
    timetable: [
      { day: "Monday", subjects: [
        { time: "08:00-09:00", subject: "Mathematics", room: "Room 101" },
        { time: "09:00-10:00", subject: "Physics", room: "Room 102" },
        { time: "10:30-11:30", subject: "Computer Science", room: "Lab 1" }
      ]},
      { day: "Tuesday", subjects: [
        { time: "08:00-09:00", subject: "Mathematics", room: "Room 101" },
        { time: "09:00-10:00", subject: "Physics", room: "Room 102" },
        { time: "10:30-11:30", subject: "Computer Science", room: "Lab 1" }
      ]},
      { day: "Wednesday", subjects: [
        { time: "08:00-09:00", subject: "Mathematics", room: "Room 101" },
        { time: "09:00-10:00", subject: "Physics", room: "Room 102" },
        { time: "10:30-11:30", subject: "Computer Science", room: "Lab 1" }
      ]}
    ]
  };

  // Sample data for the innovations table
  const innovations = [
    { id: 1, name: "Bookinga by Zexos Group", comments: 45 },
    { id: 2, name: "Automated Bell", comments: 12 },
    { id: 3, name: "Codeama Platform", comments: 93 },
    { id: 4, name: "Ispite Examinations", comments: 92 }
  ];

  // Sample data for announcements
  const announcements = [
    {
      id: 1,
      title: "Yourth Connekt Africa 2022",
      date: "2 days ago",
      description: "This is just to inform people about and event in the school..."
    },
    {
      id: 2,
      title: "Yourth Connekt Africa 2022",
      date: "3 days ago",
      description: "This is just to inform people about and event in the school..."
    },
    {
      id: 3,
      title: "Yourth Connekt Africa 2022",
      date: "4 days ago",
      description: "This is just to inform people about and event in the school..."
    },
    {
      id: 4,
      title: "Yourth Connekt Africa 2022",
      date: "5 days ago",
      description: "This is just to inform people about and event in the school..."
    }
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      name: "Bookings Bus Scheduling by Zexos Group",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      views: "3k 300",
      messages: "600",
      publisher: "Nishimumano David",
      date: "31 days ago",
      tags: ["Cyber Security", "Networking", "Social Engineering"]
    },
    {
      id: 2,
      name: "Yombi Labs, Great Low firms",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      views: "2k 500",
      messages: "300",
      publisher: "Nishimumano David",
      date: "3 days ago"
    },
    {
      id: 3,
      name: "Future Homes, Best houses for Rent & Sale",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
      views: "3k 500",
      messages: "500",
      publisher: "Nishimumano David",
      date: "2 days ago"
    }
  ];

  // Opportunities data
  const opportunities = [
    {
      id: 1,
      name: "Hanga Pitch Festival",
      date: "Sunday • 4th December, 2022",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going..."
    },
    {
      id: 2,
      name: "Global Economical Forum",
      date: "Sunday • 4th December, 2022",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going..."
    },
    {
      id: 3,
      name: "Youth Connect Africa 22",
      date: "Sunday • 4th December, 2022",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going..."
    },
    {
      id: 4,
      name: "Start-Up Fund Festival",
      date: "Sunday • 4th December, 2022",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going..."
    },
    {
      id: 5,
      name: "Hanga Pitch Festival",
      date: "Sunday • 4th December, 2022",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going..."
    },
    {
      id: 6,
      name: "Yoga Pitch Festival",
      date: "Sunday • 4th December, 2022",
      description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going..."
    }
  ];

  // Report card data
  const reportData = {
    student: "Saly Nelson",
    faculty: "Shema Samuel",
    class: "Year One - Term II",
    school: "Eagle Secondary School, NY, United States",
    grade: "8th Grade",
    teacher: "Eddy",
    term: "Academic Year 2H - 2P ( Y-1 )",
    attendance: [
      { type: "Present", qtr1: 1, qtr2: 2, qtr3: 3, qtr4: 4, total: 10 },
      { type: "Tardy", qtr1: 40, qtr2: 41, qtr3: 42, qtr4: 43, total: 166 },
      { type: "Absent", qtr1: 43, qtr2: 44, qtr3: 45, qtr4: 46, total: 178 }
    ],
    subjects: [
      { name: "English (Language)", grades: ["A", "A", "A+", "A", "A", "A"] },
      { name: "Literature (History)", grades: ["A", "B", "A", "A", "A+", "A"] },
      { name: "Computer Art (Language Art)", grades: ["B+", "B", "A", "A", "B+", "A"] },
      { name: "Mathematics (Calculus)", grades: ["A", "A", "A", "A", "A", "A"] },
      { name: "Science (General)", grades: ["A", "B", "A+", "A", "A", "A"] },
      { name: "Physical Studies", grades: ["A", "B", "A+", "A", "A", "A"] },
      { name: "Technology (Lab)", grades: ["B", "A", "A", "A", "A+", "A"] }
    ],
    gpa: {
      qtr1: "3.67",
      qtr2: "3.50",
      qtr3: "4.00",
      qtr4: "4.00",
      semester: "3.97"
    }
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

  // SVG Chart Component
  const PerformanceChart = () => {
    const chartData = [
      { x: 0, y: 60 },
      { x: 100, y: 80 },
      { x: 200, y: 70 },
      { x: 300, y: 90 },
      { x: 400, y: 85 },
      { x: 500, y: 95 },
      { x: 600, y: 88 },
      { x: 700, y: 92 }
    ];

    const pathData = chartData.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${200 - point.y}`
    ).join(' ');

    const areaPath = `${pathData} L 700 200 L 0 200 Z`;

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="100%" height="100%" viewBox="0 0 700 300" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '400px' }}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <g stroke="#e2e8f0" strokeWidth="2">
            <line x1="0" y1="50" x2="700" y2="50" />
            <line x1="0" y1="100" x2="700" y2="100" />
            <line x1="0" y1="150" x2="700" y2="150" />
            <line x1="0" y1="200" x2="700" y2="200" />
          </g>
          
          {/* Y-axis labels */}
          <text x="720" y="55" fontSize="16" fill="#374151" textAnchor="start" fontWeight="600">90%</text>
          <text x="720" y="105" fontSize="16" fill="#374151" textAnchor="start" fontWeight="600">75%</text>
          <text x="720" y="155" fontSize="16" fill="#374151" textAnchor="start" fontWeight="600">60%</text>
          <text x="720" y="205" fontSize="16" fill="#374151" textAnchor="start" fontWeight="600">45%</text>
          
          {/* Area fill */}
          <path d={areaPath} fill="url(#gradient)" />
          
          {/* Line */}
          <path d={pathData} stroke="#4ade80" strokeWidth="4" fill="none" />
          
          {/* Data points */}
          {chartData.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={200 - point.y}
              r="8"
              fill="#4ade80"
              stroke="white"
              strokeWidth="3"
            />
          ))}
          
          {/* X-axis labels */}
          <text x="0" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">Jan</text>
          <text x="100" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">Feb</text>
          <text x="200" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">Mar</text>
          <text x="300" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">Apr</text>
          <text x="400" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">May</text>
          <text x="500" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">Jun</text>
          <text x="600" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">Jul</text>
          <text x="700" y="230" fontSize="16" fill="#374151" textAnchor="middle" fontWeight="600">Aug</text>
        </svg>
      </div>
    );
  };

  // Dashboard Page
  const DashboardPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const checkScreenSize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

         // Use student-specific marks data
     const latestMarks = studentData.marks.slice(0, 5); // Show first 5 marks

    return (
      <div style={{ 
        backgroundColor: '#f8fafc', 
        minHeight: '100vh',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        padding: '24px'
      }}>
                 {/* Header */}
         <div style={{ 
           display: 'flex', 
           justifyContent: 'space-between', 
           alignItems: 'center',
           marginBottom: '32px'
         }}>
           <div style={{ 
             fontSize: '18px',
             fontWeight: '400',
             color: '#6b7280',
             display: 'flex',
             alignItems: 'center',
             gap: '8px'
           }}>
             Good Evening 👋 <span style={{ color: '#374151', fontWeight: '500' }}>{studentData.name}</span>
           </div>
         </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)', 
          gap: '16px', 
          marginBottom: '32px' 
        }}>
                     {/* Current Class Card */}
           <div style={{ 
             backgroundColor: 'white', 
             padding: '24px', 
             borderRadius: '16px', 
             textAlign: 'center',
             boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
             border: '1px solid #e5e7eb'
           }}>
             <div style={{ 
               fontSize: '32px', 
               fontWeight: '600', 
               color: '#8b5cf6',
               marginBottom: '8px',
               letterSpacing: '-0.025em'
             }}>
               {studentData.class}
             </div>
             <div style={{ 
               fontSize: '14px', 
               color: '#9ca3af',
               fontWeight: '400'
             }}>
               Current Class
             </div>
           </div>

          {/* 15 Courses Card */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#8b5cf6',
              marginBottom: '8px',
              letterSpacing: '-0.025em'
            }}>
              15
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#9ca3af',
              fontWeight: '400'
            }}>
              Courses
            </div>
          </div>

          {/* 0 Discipline Cases Card */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#8b5cf6',
              marginBottom: '8px',
              letterSpacing: '-0.025em'
            }}>
              0
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#9ca3af',
              fontWeight: '400'
            }}>
              Discipline Cases
            </div>
          </div>

          {/* 3 Appeals Card */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#8b5cf6',
              marginBottom: '8px',
              letterSpacing: '-0.025em'
            }}>
              3
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#9ca3af',
              fontWeight: '400'
            }}>
              Appeals
            </div>
          </div>

          {/* 84.99% CGPA Card */}
          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '16px', 
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#8b5cf6',
              marginBottom: '8px',
              letterSpacing: '-0.025em'
            }}>
              84.99%
            </div>
            <div style={{ 
              fontSize: '14px', 
              color: '#9ca3af',
              fontWeight: '400'
            }}>
              CAT Overall (Previous Term)
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
          gap: '24px' 
        }}>
          {/* Left Column - Latest Marks */}
          <div>
            {/* Latest Marks Section */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb',
              marginBottom: '24px'
            }}>
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '500', 
                  color: '#374151',
                  margin: '0'
                }}>
                  Latest Marks
                </h3>
                <button style={{
                  color: '#6366f1',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}>
                  View more
                </button>
              </div>

              {/* Table */}
              <div style={{ overflow: 'auto' }}>
                <table style={{ 
                  width: '100%', 
                  borderCollapse: 'collapse'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb' }}>
                      <th style={{ 
                        padding: '12px 24px', 
                        textAlign: 'left', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Lesson
                      </th>
                      <th style={{ 
                        padding: '12px 24px', 
                        textAlign: 'left', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Marks
                      </th>
                      <th style={{ 
                        padding: '12px 24px', 
                        textAlign: 'left', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Weight
                      </th>
                      <th style={{ 
                        padding: '12px 24px', 
                        textAlign: 'left', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Status
                      </th>
                      <th style={{ 
                        padding: '12px 24px', 
                        textAlign: 'left', 
                        fontSize: '12px', 
                        fontWeight: '500', 
                        color: '#6b7280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        Comment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {latestMarks.map((mark, index) => (
                      <tr key={index} style={{ 
                        borderBottom: index < latestMarks.length - 1 ? '1px solid #f3f4f6' : 'none' 
                      }}>
                        <td style={{ 
                          padding: '16px 24px', 
                          fontSize: '14px',
                          color: '#374151',
                          fontWeight: '400'
                        }}>
                          {mark.lesson}
                        </td>
                        <td style={{ 
                          padding: '16px 24px', 
                          fontSize: '14px',
                          color: '#374151',
                          fontWeight: '500'
                        }}>
                          {mark.marks}
                        </td>
                        <td style={{ 
                          padding: '16px 24px', 
                          fontSize: '14px',
                          color: '#6b7280'
                        }}>
                          {mark.weight}
                        </td>
                        <td style={{ 
                          padding: '16px 24px', 
                          fontSize: '14px',
                          color: '#059669',
                          fontWeight: '500'
                        }}>
                          {mark.status}
                        </td>
                        <td style={{ 
                          padding: '16px 24px', 
                          fontSize: '14px',
                          color: '#6b7280'
                        }}>
                          {mark.comment}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Discipline Cases Section */}
            <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '16px', 
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e5e7eb'
            }}>
              {/* Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '20px 24px',
                borderBottom: '1px solid #e5e7eb'
              }}>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: '500', 
                  color: '#374151',
                  margin: '0'
                }}>
                  Discipline Cases
                </h3>
                <button style={{
                  color: '#6366f1',
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}>
                  View more
                </button>
              </div>

              {/* Empty State */}
              <div style={{ 
                padding: '80px 24px',
                textAlign: 'center',
                color: '#6b7280'
              }}>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: '500' 
                }}>
                  No Discipline Cases So Far
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Announcements */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '16px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            height: 'fit-content'
          }}>
            {/* Header */}
            <div style={{ 
              padding: '20px 24px',
              borderBottom: '1px solid #e5e7eb',
              textAlign: 'center'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '500', 
                color: '#374151',
                margin: '0 0 16px 0'
              }}>
                Announcements
              </h3>
              
              {/* Illustration */}
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '48px'
                }}>
                  👩‍💼
                </div>
              </div>

              <div style={{ 
                fontSize: '14px', 
                color: '#6b7280',
                lineHeight: '1.5',
                textAlign: 'center'
              }}>
                The Announcements feature is under development. Thank you for your patience!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Report Cards Page
  const ReportCardsPage = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Report Cards</h1>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
        >
          <option>Academic Year 2025-2025</option>
          <option>Academic Year 2024-2025</option>
          <option>Academic Year 2023-2024</option>
          <option>Academic Year 2022-2023</option>
        </select>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
        <ReportCard />
      </div>
    </div>
  );

  // Projects Page
  const ProjectsPage = () => {
    if (selectedProject) {
      return <ProjectDetailPage project={selectedProject} />;
    }

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Published Projects</h1>
          <button
            onClick={() => setCurrentPage('publish')}
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
            Add Project
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {projects.map((project) => (
            <div key={project.id} style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
                    {project.name}
                  </h3>
                  <p style={{ color: '#718096', fontSize: '14px', marginBottom: '12px' }}>
                    {project.description}
                  </p>
                  
                  {project.tags && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      {project.tags.map((tag, index) => (
                        <span
                          key={index}
                          style={{
                            backgroundColor: '#e0e7ff',
                            color: '#5b21b6',
                            padding: '4px 12px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#718096' }}>
                    <span>{project.views} appointments</span>
                    <span>{project.messages} feedback messages</span>
                    <span>Published by {project.publisher}</span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#718096' }}>{project.date}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => setSelectedProject(project)}
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
                    }}>
                      📋
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
                    }}>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Project Detail Page
  const ProjectDetailPage = ({ project }) => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setSelectedProject(null)}
            style={{
              padding: '8px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            ←
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c' }}>Published Project Single View</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {project.tags && project.tags.map((tag, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#e0e7ff',
                  color: '#5b21b6',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#1a202c', marginBottom: '16px' }}>
            {project.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', fontSize: '14px', color: '#718096' }}>
            <span>{project.views} appointments</span>
            <span>{project.messages} feedback messages</span>
            <span>Published by {project.publisher}</span>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>More about this Innovation</h3>
            <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '16px' }}>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, 
              totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p style={{ color: '#4a5568', lineHeight: '1.6', marginBottom: '16px' }}>
              Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
              in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p style={{ color: '#4a5568', lineHeight: '1.6' }}>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
              sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>

          <button
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Send Feedback (70/3)
          </button>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          height: 'fit-content'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              🌐 Visit Website
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              border: '1px solid #e2e8f0',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              ✏️ Edit Project
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px',
              border: '1px solid #fee2e2',
              backgroundColor: '#fee2e2',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#dc2626'
            }}>
              🗑️ Delete Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Opportunities Page
  const OpportunitiesPage = () => {
    // Opportunity images mapping
    const opportunityImages = {
      1: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=120&fit=crop&crop=center",
      2: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=120&fit=crop&crop=center",
      3: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=120&fit=crop&crop=center",
      4: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=120&fit=crop&crop=center",
      5: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=120&fit=crop&crop=center",
      6: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=120&fit=crop&crop=center"
    };

    return (
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
          Up-Coming Opportunities
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '24px' }}>
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{
                width: '100%',
                height: '120px',
                borderRadius: '8px',
                marginBottom: '16px',
                backgroundImage: `url(${opportunityImages[opportunity.id]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}></div>
              
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1a202c', marginBottom: '8px' }}>
                {opportunity.name}
              </h3>
              
              <p style={{ fontSize: '12px', color: '#718096', marginBottom: '12px' }}>
                {opportunity.date}
              </p>
              
              <p style={{ fontSize: '14px', color: '#4a5568', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
                {opportunity.description}
              </p>
              
              <button style={{
                backgroundColor: '#7c3aed',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                width: '100%'
              }}>
                Read and Use Opportunity
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Publish Project Page
  const PublishProjectPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '8px' }}>
        Publish Project
      </h1>
      <p style={{ fontSize: '14px', color: '#718096', marginBottom: '32px' }}>
        Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci velit
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '300px',
          border: '2px dashed #e2e8f0'
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '300', color: '#a0aec0', marginBottom: '8px' }}>
              Drag & Drop
            </h3>
            <p style={{ fontSize: '14px', color: '#a0aec0' }}>
              Cover photo of the project
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Project Name
            </label>
            <input
              type="text"
              value={publishForm.projectName}
              onChange={(e) => setPublishForm({...publishForm, projectName: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Project Website Link
            </label>
            <input
              type="url"
              value={publishForm.websiteLink}
              onChange={(e) => setPublishForm({...publishForm, websiteLink: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Project Github Link
            </label>
            <input
              type="url"
              value={publishForm.githubLink}
              onChange={(e) => setPublishForm({...publishForm, githubLink: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
              Project Categories/Tags
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span style={{
                backgroundColor: '#ddd6fe',
                color: '#5b21b6',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Cyber Security
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', marginLeft: '4px' }}>×</button>
              </span>
              <span style={{
                backgroundColor: '#ddd6fe',
                color: '#5b21b6',
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                Networking
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', marginLeft: '4px' }}>×</button>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '32px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>
          Type your all about the project...
        </label>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          minHeight: '200px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', gap: '12px', paddingBottom: '12px', borderBottom: '1px solid #e5e7eb', marginBottom: '16px' }}>
            <button style={{ padding: '4px 8px', fontSize: '12px', border: 'none', background: 'none', cursor: 'pointer' }}>✏️ Write</button>
            <button style={{ padding: '4px 8px', fontSize: '12px', border: 'none', background: 'none', cursor: 'pointer' }}>👁️ Preview</button>
            <button style={{ padding: '4px 8px', fontSize: '12px', border: 'none', background: 'none', cursor: 'pointer' }}>📝 Editor Guide</button>
          </div>
          
          <textarea
            value={publishForm.description}
            onChange={(e) => setPublishForm({...publishForm, description: e.target.value})}
            placeholder="Type your project description here..."
            style={{
              width: '100%',
              minHeight: '150px',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              fontSize: '14px',
              lineHeight: '1.5'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setCurrentPage('projects')}
          style={{
            padding: '12px 24px',
            border: '1px solid #d1d5db',
            backgroundColor: 'white',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          Cancel changes
        </button>
        <button
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Publish Project
        </button>
      </div>
    </div>
  );

  // Attendance Page
  const AttendancePage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
        Attendance Record
      </h1>
      
      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>
            {studentData.attendance.filter(a => a.status === 'Present').length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Present</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#f59e0b', marginBottom: '8px' }}>
            {studentData.attendance.filter(a => a.status === 'Late').length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Late</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#ef4444', marginBottom: '8px' }}>
            {studentData.attendance.filter(a => a.status === 'Absent').length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Absent</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#8b5cf6', marginBottom: '8px' }}>
            {studentData.attendance.length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Total Days</div>
        </div>
      </div>

      {/* Attendance Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0' }}>
            Recent Attendance
          </h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Subject</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Time</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentData.attendance.map((record, index) => (
                <tr key={index} style={{ borderBottom: index < studentData.attendance.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#374151' }}>
                    {new Date(record.date).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                    {record.subject}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                    {record.time}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: record.status === 'Present' ? '#d1fae5' : 
                                   record.status === 'Late' ? '#fef3c7' : '#fee2e2',
                      color: record.status === 'Present' ? '#065f46' : 
                            record.status === 'Late' ? '#92400e' : '#dc2626'
                    }}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Marks Page
  const MarksPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
        Academic Marks
      </h1>
      
      {/* Performance Summary */}
      <div style={{ 
        backgroundColor: 'white', 
        padding: '24px', 
        borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', marginBottom: '16px' }}>
          Performance Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
              {studentData.marks.filter(m => m.comment === 'EXAM').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Exams Taken</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6' }}>
              {studentData.marks.filter(m => m.comment === 'CAT').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>CATs Taken</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6' }}>
              {studentData.marks.filter(m => m.status === 'PASS').length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Passed</div>
          </div>
        </div>
      </div>

      {/* Marks Table */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0' }}>
            All Marks
          </h3>
        </div>
        
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f9fafb' }}>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Subject</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Marks</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Weight</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Type</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Term</th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {studentData.marks.map((mark, index) => (
                <tr key={index} style={{ borderBottom: index < studentData.marks.length - 1 ? '1px solid #f3f4f6' : 'none' }}>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#374151', fontWeight: '500' }}>
                    {mark.lesson}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#374151', fontWeight: '600' }}>
                    {mark.marks}/10
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                    {mark.weight}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                    {mark.comment}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                    {mark.term}
                  </td>
                  <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: mark.status === 'PASS' ? '#d1fae5' : '#fee2e2',
                      color: mark.status === 'PASS' ? '#065f46' : '#dc2626'
                    }}>
                      {mark.status}
                    </span>
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
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
        Assignments
      </h1>
      
      {/* Assignment Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>
            {studentData.assignments.filter(a => a.status === 'Submitted').length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Submitted</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#f59e0b', marginBottom: '8px' }}>
            {studentData.assignments.filter(a => a.status === 'Pending').length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Pending</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#8b5cf6', marginBottom: '8px' }}>
            {studentData.assignments.length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Total</div>
        </div>
      </div>

      {/* Assignments List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0' }}>
            Assignment Details
          </h3>
        </div>
        
        <div style={{ padding: '24px' }}>
          {studentData.assignments.map((assignment, index) => (
            <div key={assignment.id} style={{ 
              padding: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              marginBottom: index < studentData.assignments.length - 1 ? '16px' : '0',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', margin: '0' }}>
                  {assignment.title}
                </h4>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: assignment.status === 'Submitted' ? '#d1fae5' : '#fef3c7',
                  color: assignment.status === 'Submitted' ? '#065f46' : '#92400e'
                }}>
                  {assignment.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px', marginBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Subject:</span>
                  <div style={{ fontSize: '14px', color: '#374151' }}>{assignment.subject}</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Due Date:</span>
                  <div style={{ fontSize: '14px', color: '#374151' }}>{assignment.dueDate}</div>
                </div>
                {assignment.grade && (
                  <div>
                    <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Grade:</span>
                    <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>{assignment.grade}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Exams Page
  const ExamsPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
        Exams Schedule
      </h1>
      
      {/* Exam Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#3b82f6', marginBottom: '8px' }}>
            {studentData.exams.filter(e => e.status === 'Scheduled').length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Upcoming</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#8b5cf6', marginBottom: '8px' }}>
            {studentData.exams.length}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Total Exams</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>
            {studentData.exams.reduce((total, exam) => {
              const duration = parseInt(exam.duration.split(' ')[0]);
              return total + duration;
            }, 0)}
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Total Hours</div>
        </div>
      </div>

      {/* Exams List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0' }}>
            Exam Details
          </h3>
        </div>
        
        <div style={{ padding: '24px' }}>
          {studentData.exams.map((exam, index) => (
            <div key={exam.id} style={{ 
              padding: '20px',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              marginBottom: index < studentData.exams.length - 1 ? '16px' : '0',
              backgroundColor: '#f9fafb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', margin: '0' }}>
                  {exam.title}
                </h4>
                <span style={{
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: '#dbeafe',
                  color: '#1d4ed8'
                }}>
                  {exam.status}
                </span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '16px' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Subject:</span>
                  <div style={{ fontSize: '14px', color: '#374151' }}>{exam.subject}</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Date:</span>
                  <div style={{ fontSize: '14px', color: '#374151' }}>{exam.date}</div>
                </div>
                <div>
                  <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>Duration:</span>
                  <div style={{ fontSize: '14px', color: '#374151' }}>{exam.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Timetable Page
  const TimetablePage = () => {
    // Timetable data matching the image
    const timetableData = [
      { time: "8:00-8:50", hour: 1, monday: "Chemistry", tuesday: "Swahili", wednesday: "Physics", thursday: "Chemistry", friday: "English" },
      { time: "8:50-9:40", hour: 2, monday: "Kinyarwanda", tuesday: "Spiritual Activities", wednesday: "History", thursday: "Chemistry", friday: "Computer Science" },
      { time: "9:40-10:30", hour: 3, monday: "Physics", tuesday: "French", wednesday: "Math", thursday: "History", friday: "Geography" },
      { time: "10:30-10:45", hour: "Break", monday: "Break", tuesday: "Break", wednesday: "Break", thursday: "Break", friday: "Break" },
      { time: "10:45-11:35", hour: 4, monday: "Physics", tuesday: "Kinyarwanda", wednesday: "English", thursday: "Entrepreneurship", friday: "Entrepreneurship" },
      { time: "11:35-12:25", hour: 5, monday: "Biology", tuesday: "Math", wednesday: "English", thursday: "English", friday: "Computer Science" },
      { time: "12:25-2:00", hour: "Lunch", monday: "Lunch", tuesday: "Lunch", wednesday: "Lunch", thursday: "Lunch", friday: "Lunch" },
      { time: "2:00-2:50", hour: 6, monday: "Math", tuesday: "Biology", wednesday: "", thursday: "Biology", friday: "Kinyarwanda" },
      { time: "2:50-3:40", hour: 7, monday: "Math", tuesday: "Math", wednesday: "", thursday: "Biology", friday: "Geography" },
      { time: "3:40-4:30", hour: 8, monday: "Math", tuesday: "French", wednesday: "", thursday: "Political Science", friday: "English" }
    ];

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    return (
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
          Class Timetable
        </h1>
        
        {/* Timetable */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '16px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div style={{ 
            padding: '20px 24px',
            borderBottom: '1px solid #e5e7eb',
            backgroundColor: '#f9fafb'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0' }}>
              Weekly Schedule
            </h3>
          </div>
          
          <div style={{ overflow: 'auto' }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '14px'
            }}>
              <thead>
                <tr style={{ backgroundColor: '#f3f4f6' }}>
                  <th style={{ 
                    padding: '16px 12px', 
                    textAlign: 'left', 
                    borderBottom: '2px solid #e5e7eb',
                    fontWeight: '600',
                    color: '#374151',
                    minWidth: '120px'
                  }}>
                    Time
                  </th>
                  <th style={{ 
                    padding: '16px 12px', 
                    textAlign: 'center', 
                    borderBottom: '2px solid #e5e7eb',
                    fontWeight: '600',
                    color: '#374151',
                    minWidth: '80px'
                  }}>
                    Hour
                  </th>
                  {days.map(day => (
                    <th key={day} style={{ 
                      padding: '16px 12px', 
                      textAlign: 'center', 
                      borderBottom: '2px solid #e5e7eb',
                      fontWeight: '600',
                      color: '#374151',
                      minWidth: '140px'
                    }}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableData.map((row, index) => (
                  <tr key={index} style={{ 
                    backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <td style={{ 
                      padding: '16px 12px', 
                      borderRight: '1px solid #e5e7eb',
                      fontWeight: '500',
                      color: '#374151'
                    }}>
                      {row.time}
                    </td>
                    <td style={{ 
                      padding: '16px 12px', 
                      textAlign: 'center',
                      borderRight: '1px solid #e5e7eb',
                      fontWeight: '600',
                      color: row.hour === 'Break' || row.hour === 'Lunch' ? '#059669' : '#374151',
                      backgroundColor: row.hour === 'Break' ? '#d1fae5' : row.hour === 'Lunch' ? '#fef3c7' : 'transparent'
                    }}>
                      {row.hour}
                    </td>
                    {days.map(day => {
                      const dayKey = day.toLowerCase();
                      const subject = row[dayKey];
                      const isBreak = row.hour === 'Break';
                      const isLunch = row.hour === 'Lunch';
                      const isEmpty = subject === '';
                      
                      return (
                        <td key={day} style={{ 
                          padding: '16px 12px', 
                          textAlign: 'center',
                          borderRight: '1px solid #e5e7eb',
                          fontWeight: '500',
                          color: isBreak || isLunch ? '#059669' : '#374151',
                          backgroundColor: isBreak ? '#d1fae5' : isLunch ? '#fef3c7' : isEmpty ? '#f3f4f6' : 'transparent',
                          position: 'relative'
                        }}>
                          {isEmpty ? (
                            <div style={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: '100%',
                              height: '100%',
                              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, #e5e7eb 2px, #e5e7eb 4px)',
                              opacity: 0.3
                            }} />
                          ) : (
                            <span style={{ 
                              fontSize: isBreak || isLunch ? '14px' : '13px',
                              fontWeight: isBreak || isLunch ? '600' : '500'
                            }}>
                              {subject}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Communications Page
  const CommunicationsPage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
        Communications
      </h1>
      
      {/* Communication Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
        gap: '16px', 
        marginBottom: '32px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#3b82f6', marginBottom: '8px' }}>
            12
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Messages</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#10b981', marginBottom: '8px' }}>
            8
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Read</div>
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          padding: '24px', 
          borderRadius: '16px', 
          textAlign: 'center',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ fontSize: '32px', fontWeight: '600', color: '#f59e0b', marginBottom: '8px' }}>
            4
          </div>
          <div style={{ fontSize: '14px', color: '#9ca3af' }}>Unread</div>
        </div>
      </div>

      {/* Messages List */}
      <div style={{ 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <div style={{ 
          padding: '20px 24px',
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f9fafb'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#374151', margin: '0' }}>
            Recent Messages
          </h3>
        </div>
        
        <div style={{ padding: '24px' }}>
          <div style={{ 
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            marginBottom: '16px',
            backgroundColor: '#f9fafb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', margin: '0' }}>
                Assignment Reminder
              </h4>
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: '#fee2e2',
                color: '#dc2626'
              }}>
                Unread
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
              Reminder: Your Mathematics assignment is due tomorrow. Please ensure it's submitted on time.
            </p>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              From: Dr. Sarah Mukamana • 2 hours ago
            </div>
          </div>
          
          <div style={{ 
            padding: '20px',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            marginBottom: '16px',
            backgroundColor: '#f9fafb'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#374151', margin: '0' }}>
                Exam Schedule Update
              </h4>
              <span style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: '#d1fae5',
                color: '#065f46'
              }}>
                Read
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 12px 0' }}>
              The Physics exam has been rescheduled to next Friday. Please update your calendar accordingly.
            </p>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              From: Admin • 1 day ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile Page
  const ProfilePage = () => (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '24px' }}>
        Profile
      </h1>
      <div style={{
        backgroundColor: 'white',
        padding: '32px',
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
        return <div style={{ padding: '24px' }}><h1>Students</h1><p>This page is not available for students.</p></div>;
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
        return <div style={{ padding: '24px' }}><h1>Analytics</h1><p>This page is not available for students.</p></div>;
      case 'settings':
        return <div style={{ padding: '24px' }}><h1>Settings</h1><p>This page is not available for students.</p></div>;
      case 'publish':
        return <PublishProjectPage />;
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
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        userRole="student"
        isMobile={isMobile}
      />

             {/* Main Content */}
       <div style={mainContentStyle}>
         {/* Sidebar Toggle Button (when sidebar is hidden on desktop) */}
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
            {isMobile && (
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
            )}
            <div style={searchContainerStyle}>
              <div style={searchIconStyle}>🔍</div>
              <input
                type="text"
                placeholder="Search of pages here..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={searchInputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{studentData.name}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{studentData.studentCode}</div>
            </div>
            <div style={profileStyle}>{studentData.name.charAt(0)}</div>
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
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

export default Student;