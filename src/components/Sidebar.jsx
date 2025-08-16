import React, { useState } from 'react';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, toggleSidebar }) => {
  // Check if we're on mobile
  const isMobile = window.innerWidth <= 768;
  
  const sidebarStyle = {
    width: '240px',
    backgroundColor: '#f8fafc',
    borderRight: '1px solid #e2e8f0',
    padding: '0',
    position: 'fixed',
    height: '100vh',
    left: isMobile ? (isOpen ? '0' : '-240px') : (isOpen ? '0' : '-240px'),
    top: '0',
    zIndex: 50,
    transition: 'left 0.3s ease',
    boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)'
  };

  const logoStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 20px',
    borderBottom: '1px solid #e2e8f0',
    backgroundColor: 'white'
  };

  const logoContentStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const toggleButtonStyle = {
    width: '32px',
    height: '32px',
    borderRadius: '6px',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    color: '#4a5568',
    transition: 'all 0.2s'
  };

  const logoIconStyle = {
    width: '24px',
    height: '24px',
    backgroundColor: '#7c3aed',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    color: 'white',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  const logoTextStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1a202c',
    lineHeight: '1.2'
  };

  const menuStyle = {
    padding: '20px 0'
  };

  const menuHeaderStyle = {
    padding: '0 20px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#a0aec0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '10px'
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '14px 20px',
    color: '#4a5568',
    textDecoration: 'none',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    margin: '4px 8px',
    borderRadius: '8px'
  };

  const menuItemActiveStyle = {
    ...menuItemStyle,
    backgroundColor: '#7c3aed',
    color: 'white',
    fontWeight: '600'
  };

  const menuIconStyle = {
    width: '20px',
    height: '20px',
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'students', label: 'Students', icon: '👥' },
    { id: 'marks', label: 'Marks', icon: '📝' },
    { id: 'report-cards', label: 'Report Cards', icon: '📋' },
    { id: 'projects', label: 'Projects', icon: '💡' },
    { id: 'opportunities', label: 'Opportunities', icon: '🎯' },
    { id: 'attendance', label: 'Attendance', icon: '✅' },
    { id: 'assignments', label: 'Assignments', icon: '📚' },
    { id: 'exams', label: 'Exams', icon: '📝' },
    { id: 'timetable', label: 'Timetable', icon: '⏰' },
    { id: 'communications', label: 'Communications', icon: '💬' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            display: 'block'
          }}
          onClick={toggleSidebar}
        />
      )}
      
      <div style={sidebarStyle}>
        <div style={logoStyle}>
          <div style={logoContentStyle}>
            <div style={logoIconStyle}>{'</>'}</div>
            <span style={logoTextStyle}>
              Rwanda<br />
              Coding<br />
              Academy
            </span>
          </div>
          <button 
            style={toggleButtonStyle}
            onClick={toggleSidebar}
            title="Toggle Sidebar"
          >
            {isOpen ? '◀' : '▶'}
          </button>
        </div>
        
        <div style={menuStyle}>
          <div style={menuHeaderStyle}>Menu</div>
          
          {menuItems.map((item) => (
            <div
              key={item.id}
              style={currentPage === item.id ? menuItemActiveStyle : menuItemStyle}
              onClick={() => {
                setCurrentPage(item.id);
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 768) {
                  toggleSidebar();
                }
              }}
            >
              <div style={menuIconStyle}>{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
