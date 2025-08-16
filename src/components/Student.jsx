import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

const Student = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Academic Year 2H - 2P Term II');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true); // Always open on desktop
      } else {
        setSidebarOpen(false); // Closed by default on mobile
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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
    student: "Burigo Aldo Jabes",
    faculty: "Faustine Rugema",
    class: "Year One - Term II",
    school: "Beacon Coding Academy, NY, United States",
    grade: "8th Grade",
    teacher: "Anne",
    term: "Academic Year 2H - 2P ( Y-1 )",
    attendance: [
      { type: "Present", qtr1: 1, qtr2: 2, qtr3: 3, qtr4: 4, total: 10 },
      { type: "Tardy", qtr1: 40, qtr2: 41, qtr3: 42, qtr4: 43, total: 166 },
      { type: "Absent", qtr1: 43, qtr2: 44, qtr3: 45, qtr4: 46, total: 178 }
    ],
    subjects: [
      { name: "English (Language)", grades: ["A", "A", "A+", "A", "A", "A"] },
      { name: "Literary (History)", grades: ["A", "B", "A", "A", "A+", "A"] },
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

  const [publishForm, setPublishForm] = useState({
    projectName: '',
    websiteLink: '',
    githubLink: '',
    tags: [],
    description: ''
  });

  const [selectedProject, setSelectedProject] = useState(null);

  // Common styles
  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflow: 'hidden'
  };

  const mainContentStyle = {
    marginLeft: isMobile ? '0' : '240px',
    flex: '1',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    overflow: 'hidden',
    transition: 'margin-left 0.3s ease'
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
      { x: 50, y: 80 },
      { x: 100, y: 70 },
      { x: 150, y: 90 },
      { x: 200, y: 85 },
      { x: 250, y: 95 },
      { x: 300, y: 88 },
      { x: 350, y: 92 }
    ];

    const pathData = chartData.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${120 - point.y}`
    ).join(' ');

    const areaPath = `${pathData} L 350 120 L 0 120 Z`;

    return (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="100%" height="100%" viewBox="0 0 350 200" preserveAspectRatio="xMidYMid meet" style={{ maxHeight: '200px' }}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          
          <g stroke="#e2e8f0" strokeWidth="1">
            <line x1="0" y1="30" x2="350" y2="30" />
            <line x1="0" y1="60" x2="350" y2="60" />
            <line x1="0" y1="90" x2="350" y2="90" />
            <line x1="0" y1="120" x2="350" y2="120" />
          </g>
          
          <path d={areaPath} fill="url(#gradient)" />
          <path d={pathData} stroke="#4ade80" strokeWidth="2" fill="none" />
          
          {chartData.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={120 - point.y}
              r="3"
              fill="#4ade80"
            />
          ))}
          
          <text x="20" y="140" fontSize="10" fill="#718096">January</text>
          <text x="100" y="140" fontSize="10" fill="#718096">February</text>
          <text x="200" y="140" fontSize="10" fill="#718096">March</text>
          <text x="300" y="140" fontSize="10" fill="#718096">April</text>
        </svg>
      </div>
    );
  };

  // Dashboard Page
  const DashboardPage = () => (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '24px', flexShrink: 0 }}>
        <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
          Welcome Back Burigo Aldo Jabes
        </h1>
        <p style={{ fontSize: '14px', color: '#718096' }}>
          Statistics of your performance and innovations published
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(0, 1fr)', 
        gap: '24px', 
        flex: '1',
        minHeight: 0,
        overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '16px', flexShrink: 0 }}>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: '#22c55e' }}>89 %</div>
              <div style={{ fontSize: '14px', color: '#718096' }}>Average Performance</div>
            </div>
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' }}>
              <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: '#3b82f6' }}>34</div>
              <div style={{ fontSize: '14px', color: '#718096' }}>Number of Innovations</div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            padding: '24px', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
            flex: '1',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', marginBottom: '20px', flexShrink: 0 }}>Performance Graph</div>
            <div style={{ flex: '1', minHeight: 0, position: 'relative' }}>
              <PerformanceChart />
              <div style={{ position: 'absolute', top: '20px', right: '20px', backgroundColor: '#22c55e', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                Mid Term II 88.4%
              </div>
            </div>
          </div>

          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
            overflow: 'hidden',
            flex: '1',
            minHeight: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
              <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c' }}>Information about your Innovations</div>
            </div>
            <div style={{ flex: '1', overflow: 'auto', minHeight: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                  <tr>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f7fafc' }}>#</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f7fafc' }}>Project Name</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f7fafc' }}>Number of Comments</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f7fafc' }}>View</th>
                    <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#718096', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f7fafc' }}>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {innovations.map((innovation, index) => (
                    <tr key={innovation.id}>
                      <td style={{ padding: '12px 24px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>{index + 1}</td>
                      <td style={{ padding: '12px 24px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>{innovation.name}</td>
                      <td style={{ padding: '12px 24px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>{innovation.comments}</td>
                      <td style={{ padding: '12px 24px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                        <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '8px', backgroundColor: '#e6f3ff', color: '#0066cc' }}>
                          👁️
                        </button>
                      </td>
                      <td style={{ padding: '12px 24px', borderBottom: '1px solid #e2e8f0', fontSize: '14px' }}>
                        <button style={{ width: '24px', height: '24px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginRight: '8px', backgroundColor: '#ffeef0', color: '#e53e3e' }}>
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1a202c', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
            <span>Announcements</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '12px', backgroundColor: '#3b82f6', color: 'white', padding: '2px 6px', borderRadius: '10px' }}>82</span>
              <span style={{ fontSize: '14px', color: '#7c3aed' }}>View all</span>
            </div>
          </div>
          
          <div style={{ flex: '1', overflow: 'auto', minHeight: 0 }}>
            {announcements.map((announcement) => (
              <div key={announcement.id} style={{ padding: '16px 0', borderBottom: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ fontSize: '12px', color: '#718096' }}>Tuesday 20th, 22</div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>{announcement.date}</div>
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a202c', marginBottom: '4px' }}>{announcement.title}</div>
                <div style={{ fontSize: '12px', color: '#718096', lineHeight: '1.4' }}>{announcement.description}</div>
              </div>
            ))}
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
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          style={{ padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '14px' }}
        >
          <option>Academic Year 2H - 2P Term II</option>
          <option>Academic Year 2H - 2P (Y-1)</option>
          <option>Academic Year 2H - 2S (Y-2)</option>
          <option>Academic Year 2H - 3K (Y-3)</option>
        </select>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', padding: '24px' }}>
        <div style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600', color: '#1a202c' }}>
          Report Card for Academic Year 2H - 2P Term II
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '14px' }}>
          <div>
            <div><strong>Student:</strong> {reportData.student}</div>
            <div><strong>Faculty Advisor:</strong> {reportData.faculty}</div>
            <div><strong>Class:</strong> {reportData.class}</div>
            <div><strong>School:</strong> {reportData.school}</div>
          </div>
          <div>
            <div><strong>Grade:</strong> {reportData.grade}</div>
            <div><strong>Teacher:</strong> {reportData.teacher}</div>
            <div><strong>Term:</strong> {reportData.term}</div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', backgroundColor: '#e0f2fe', padding: '8px' }}>Attendance</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'left' }}></th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 1</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 2</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Sem 1</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 3</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 4</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Sem 2</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {reportData.attendance.map((row, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0' }}>{row.type}</td>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{row.qtr1}</td>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{row.qtr2}</td>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{Math.floor((row.qtr1 + row.qtr2) / 2)}</td>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{row.qtr3}</td>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{row.qtr4}</td>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{Math.floor((row.qtr3 + row.qtr4) / 2)}</td>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px', backgroundColor: '#e0f2fe', padding: '8px' }}>Subject</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f7fafc' }}>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'left' }}>Subject</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 1</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 2</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Sem 1</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 3</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Qtr 4</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Sem 2</th>
                <th style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>Final</th>
              </tr>
            </thead>
            <tbody>
              {reportData.subjects.map((subject, index) => (
                <tr key={index}>
                  <td style={{ padding: '8px', border: '1px solid #e2e8f0' }}>{subject.name}</td>
                  {subject.grades.map((grade, gradeIndex) => (
                    <td key={gradeIndex} style={{ padding: '8px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: '600' }}>
                      {grade}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ backgroundColor: '#f7fafc', padding: '16px', borderRadius: '8px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px', textAlign: 'left' }}>Grade</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>GPA</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>3.67</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>3.50</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>4.00</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>4.00</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>3.97</th>
              </tr>
            </thead>
          </table>
        </div>

        <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Comments:</h4>
          <p style={{ fontSize: '12px', marginBottom: '12px' }}>
            Thanks for a fantastic year at school this year! It's been awesome to see everyone grow and develop so much and see community has 
            really been great too. We are so happy with out of our amazing new subjects and cohort... Hope you all have a fantastic summer - and looking 
            forward to seeing everyone back in the fall!
          </p>
          
          <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Promoted / Retained:</h4>
          <div style={{ fontSize: '12px', backgroundColor: '#e8f5e8', padding: '8px', borderRadius: '4px' }}>
            <strong>Promoted</strong>
          </div>
          
          <p style={{ fontSize: '12px', marginTop: '12px' }}>
            Faculty did a wonderful job all year. She's a very conscientious student who is full of energy. She is respectful to her classmates, creative 
            and analytical in her classroom, and a great citizen of the school. Faculty has been a pleasure to have in class this year! Have a lovely 
            summer!
          </p>
        </div>
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
  const OpportunitiesPage = () => (
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
              backgroundColor: '#f7fafc',
              borderRadius: '8px',
              marginBottom: '16px'
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
      case 'report-cards':
        return <ReportCardsPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'opportunities':
        return <OpportunitiesPage />;
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
        setCurrentPage={setCurrentPage} 
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      {/* Main Content */}
      <div style={mainContentStyle}>
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
          <div style={profileStyle}>B</div>
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