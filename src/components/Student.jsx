import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import ReportCard from './ReportCard';

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
      if (mobile) {
        setSidebarOpen(false); // Closed by default on mobile
      }
      // On desktop, keep the current state (don't force it to always be open)
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
    student: "Saly Nelson",
    faculty: "Shema Samuel",
    class: "Year One - Term II",
    school: "Beacon Coding Academy, NY, United States",
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
            Welcome Back, Burigo Aldo Jabes! 👋
          </h1>
          <p style={{ 
            fontSize: '16px', 
            opacity: 0.9,
            marginBottom: '0',
            fontWeight: '400'
          }}>
            Here's your academic performance overview and latest updates
          </p>
        </div>
      </div>

             <div style={{ 
         display: 'grid', 
         gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 2fr) minmax(0, 1fr)', 
         gap: '24px', 
         flex: '1',
         minHeight: 0
       }}>
         <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minHeight: 0 }}>
           {/* Enhanced Stats Cards */}
           <div style={{ 
             display: 'grid', 
             gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
             gap: '20px', 
             flexShrink: 0 
           }}>
             <div style={{ 
               backgroundColor: 'white', 
               padding: '28px', 
               borderRadius: '16px', 
               boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
               border: '1px solid rgba(34, 197, 94, 0.1)',
               position: 'relative',
               overflow: 'hidden'
             }}>
               <div style={{ 
                 position: 'absolute', 
                 top: '0', 
                 right: '0', 
                 width: '60px', 
                 height: '60px', 
                 background: 'linear-gradient(135deg, #22c55e, #16a34a)', 
                 borderRadius: '0 16px 0 60px',
                 opacity: 0.1
               }}></div>
               <div style={{ position: 'relative', zIndex: 2 }}>
                 <div style={{ 
                   fontSize: '36px', 
                   fontWeight: '800', 
                   marginBottom: '8px', 
                   color: '#22c55e',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}>
                   89% 📈
                 </div>
                 <div style={{ fontSize: '16px', color: '#374151', fontWeight: '600' }}>Average Performance</div>
                 <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>+5.2% from last term</div>
               </div>
             </div>
             
             <div style={{ 
               backgroundColor: 'white', 
               padding: '28px', 
               borderRadius: '16px', 
               boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
               border: '1px solid rgba(59, 130, 246, 0.1)',
               position: 'relative',
               overflow: 'hidden'
             }}>
               <div style={{ 
                 position: 'absolute', 
                 top: '0', 
                 right: '0', 
                 width: '60px', 
                 height: '60px', 
                 background: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
                 borderRadius: '0 16px 0 60px',
                 opacity: 0.1
               }}></div>
               <div style={{ position: 'relative', zIndex: 2 }}>
                 <div style={{ 
                   fontSize: '36px', 
                   fontWeight: '800', 
                   marginBottom: '8px', 
                   color: '#3b82f6',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}>
                   Year 2C 🎓
                 </div>
                 <div style={{ fontSize: '16px', color: '#374151', fontWeight: '600' }}>Current Class</div>
                 <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Software Engineering</div>
               </div>
             </div>
             
             <div style={{ 
               backgroundColor: 'white', 
               padding: '28px', 
               borderRadius: '16px', 
               boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
               border: '1px solid rgba(168, 85, 247, 0.1)',
               position: 'relative',
               overflow: 'hidden'
             }}>
               <div style={{ 
                 position: 'absolute', 
                 top: '0', 
                 right: '0', 
                 width: '60px', 
                 height: '60px', 
                 background: 'linear-gradient(135deg, #a855f7, #9333ea)', 
                 borderRadius: '0 16px 0 60px',
                 opacity: 0.1
               }}></div>
               <div style={{ position: 'relative', zIndex: 2 }}>
                 <div style={{ 
                   fontSize: '36px', 
                   fontWeight: '800', 
                   marginBottom: '8px', 
                   color: '#a855f7',
                   display: 'flex',
                   alignItems: 'center',
                   gap: '8px'
                 }}>
                   34 💡
                 </div>
                 <div style={{ fontSize: '16px', color: '#374151', fontWeight: '600' }}>Innovations</div>
                 <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>+12 this semester</div>
               </div>
             </div>
           </div>

           <div style={{ 
             backgroundColor: 'white', 
             padding: '32px', 
             borderRadius: '16px', 
             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
             flex: '1',
             minHeight: '500px',
             display: 'flex',
             flexDirection: 'column',
             border: '1px solid rgba(0, 0, 0, 0.05)'
           }}>
             <div style={{ 
               display: 'flex', 
               justifyContent: 'space-between', 
               alignItems: 'center', 
               marginBottom: '24px', 
               flexShrink: 0 
             }}>
               <div>
                 <div style={{ fontSize: '24px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
                   📊 Performance Analytics
                 </div>
                 <div style={{ fontSize: '14px', color: '#6b7280' }}>
                   Your academic progress over the last 8 months
                 </div>
               </div>
               <div style={{ 
                 backgroundColor: 'linear-gradient(135deg, #22c55e, #16a34a)', 
                 background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                 color: 'white', 
                 padding: '12px 20px', 
                 borderRadius: '12px', 
                 fontSize: '16px', 
                 fontWeight: '700',
                 boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
               }}>
                 Mid Term II: 88.4%
               </div>
             </div>
             <div style={{ flex: '1', minHeight: '400px', position: 'relative' }}>
               <PerformanceChart />
             </div>
           </div>

           <div style={{ 
             backgroundColor: 'white', 
             borderRadius: '16px', 
             boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
             overflow: 'hidden',
             flex: '1',
             minHeight: 0,
             display: 'flex',
             flexDirection: 'column',
             border: '1px solid rgba(0, 0, 0, 0.05)'
           }}>
             <div style={{ 
               padding: '24px 28px', 
               borderBottom: '1px solid #e5e7eb', 
               flexShrink: 0,
               background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
             }}>
               <div style={{ 
                 display: 'flex', 
                 justifyContent: 'space-between', 
                 alignItems: 'center' 
               }}>
                 <div>
                   <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
                     💡 Your Innovations Portfolio
                   </div>
                   <div style={{ fontSize: '14px', color: '#6b7280' }}>
                     Track your latest projects and their engagement
                   </div>
                 </div>
                 <div style={{ 
                   backgroundColor: '#3b82f6', 
                   color: 'white', 
                   padding: '8px 16px', 
                   borderRadius: '20px', 
                   fontSize: '14px', 
                   fontWeight: '600',
                   boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                 }}>
                   {innovations.length} Projects
                 </div>
               </div>
             </div>
             <div style={{ flex: '1', overflow: 'auto', minHeight: 0 }}>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                 <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f8fafc', zIndex: 1 }}>
                   <tr>
                     <th style={{ padding: '16px 28px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>#</th>
                     <th style={{ padding: '16px 28px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>Project Name</th>
                     <th style={{ padding: '16px 28px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>Comments</th>
                     <th style={{ padding: '16px 28px', textAlign: 'left', fontSize: '13px', fontWeight: '700', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em', backgroundColor: '#f8fafc', borderBottom: '2px solid #e5e7eb' }}>Actions</th>
                   </tr>
                 </thead>
                 <tbody>
                   {innovations.map((innovation, index) => (
                     <tr key={innovation.id} style={{ 
                       transition: 'all 0.2s ease',
                       ':hover': { backgroundColor: '#f8fafc' }
                     }}>
                       <td style={{ 
                         padding: '16px 28px', 
                         borderBottom: '1px solid #f1f5f9', 
                         fontSize: '15px',
                         fontWeight: '600',
                         color: '#374151'
                       }}>
                         <div style={{ 
                           width: '32px', 
                           height: '32px', 
                           borderRadius: '8px', 
                           backgroundColor: '#3b82f6', 
                           color: 'white', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center',
                           fontSize: '14px',
                           fontWeight: '700'
                         }}>
                           {index + 1}
                         </div>
                       </td>
                       <td style={{ 
                         padding: '16px 28px', 
                         borderBottom: '1px solid #f1f5f9', 
                         fontSize: '15px',
                         fontWeight: '500',
                         color: '#1f2937'
                       }}>
                         {innovation.name}
                       </td>
                       <td style={{ 
                         padding: '16px 28px', 
                         borderBottom: '1px solid #f1f5f9', 
                         fontSize: '15px'
                       }}>
                         <span style={{ 
                           backgroundColor: '#dbeafe', 
                           color: '#1d4ed8', 
                           padding: '6px 12px', 
                           borderRadius: '20px', 
                           fontSize: '13px', 
                           fontWeight: '600' 
                         }}>
                           {innovation.comments} comments
                         </span>
                       </td>
                       <td style={{ 
                         padding: '16px 28px', 
                         borderBottom: '1px solid #f1f5f9', 
                         fontSize: '15px' 
                       }}>
                         <div style={{ display: 'flex', gap: '8px' }}>
                           <button style={{ 
                             width: '36px', 
                             height: '36px', 
                             borderRadius: '8px', 
                             border: 'none', 
                             cursor: 'pointer', 
                             backgroundColor: '#dbeafe', 
                             color: '#1d4ed8',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             fontSize: '16px',
                             transition: 'all 0.2s ease',
                             ':hover': { backgroundColor: '#bfdbfe' }
                           }}>
                             👁️
                           </button>
                           <button style={{ 
                             width: '36px', 
                             height: '36px', 
                             borderRadius: '8px', 
                             border: 'none', 
                             cursor: 'pointer', 
                             backgroundColor: '#fee2e2', 
                             color: '#dc2626',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             fontSize: '16px',
                             transition: 'all 0.2s ease',
                             ':hover': { backgroundColor: '#fecaca' }
                           }}>
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

         {/* Fixed Announcements Section */}
         <div style={{ 
           backgroundColor: 'white', 
           borderRadius: '16px', 
           boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', 
           padding: '28px',
           display: 'flex',
           flexDirection: 'column',
           height: 'fit-content',
           maxHeight: '600px',
           border: '1px solid rgba(0, 0, 0, 0.05)',
           position: 'sticky',
           top: '24px'
         }}>
           <div style={{ 
             marginBottom: '24px', 
             display: 'flex', 
             justifyContent: 'space-between', 
             alignItems: 'center', 
             flexShrink: 0 
           }}>
             <div>
               <div style={{ fontSize: '20px', fontWeight: '700', color: '#1a202c', marginBottom: '4px' }}>
                 📢 Latest Announcements
               </div>
               <div style={{ fontSize: '14px', color: '#6b7280' }}>
                 Stay updated with school news and events
               </div>
             </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
               <span style={{ 
                 fontSize: '14px', 
                 backgroundColor: 'linear-gradient(135deg, #3b82f6, #2563eb)', 
                 background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                 color: 'white', 
                 padding: '6px 12px', 
                 borderRadius: '20px',
                 fontWeight: '600',
                 boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
               }}>
                 82 New
               </span>
               <button style={{ 
                 fontSize: '14px', 
                 color: '#7c3aed', 
                 background: 'none',
                 border: 'none',
                 cursor: 'pointer',
                 fontWeight: '600',
                 padding: '8px 12px',
                 borderRadius: '8px',
                 transition: 'all 0.2s ease',
                 ':hover': { backgroundColor: '#f3f4f6' }
               }}>
                 View all →
               </button>
             </div>
           </div>
           
           <div style={{ 
             overflow: 'auto', 
             maxHeight: '400px',
             paddingRight: '8px'
           }}>
             {announcements.map((announcement) => (
               <div key={announcement.id} style={{ 
                 padding: '20px 0', 
                 borderBottom: '1px solid #f1f5f9',
                 transition: 'all 0.2s ease',
                 cursor: 'pointer',
                 ':hover': { backgroundColor: '#f8fafc', paddingLeft: '12px', paddingRight: '12px', marginLeft: '-12px', marginRight: '-12px', borderRadius: '8px' }
               }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                   <div style={{ 
                     fontSize: '13px', 
                     color: '#6b7280',
                     backgroundColor: '#f3f4f6',
                     padding: '4px 8px',
                     borderRadius: '6px',
                     fontWeight: '500'
                   }}>
                     📅 Tuesday 20th, 22
                   </div>
                   <div style={{ 
                     fontSize: '12px', 
                     color: '#9ca3af',
                     backgroundColor: '#fef3c7',
                     color: '#92400e',
                     padding: '4px 8px',
                     borderRadius: '6px',
                     fontWeight: '500'
                   }}>
                     {announcement.date}
                   </div>
                 </div>
                 <div style={{ 
                   fontSize: '16px', 
                   fontWeight: '700', 
                   color: '#1f2937', 
                   marginBottom: '8px',
                   lineHeight: '1.3'
                 }}>
                   {announcement.title}
                 </div>
                 <div style={{ 
                   fontSize: '14px', 
                   color: '#6b7280', 
                   lineHeight: '1.5',
                   fontWeight: '400'
                 }}>
                   {announcement.description}
                 </div>
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