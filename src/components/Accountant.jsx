import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Accountant = () => {
  const { currentUser, hasPermission, logout } = useAuth();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('Academic Year 2H - 2P Term II');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    studentId: '',
    amount: '',
    paymentMethod: 'cash',
    description: '',
    term: 'Term II 2024-2025'
  });

  // Authentication guard
  useEffect(() => {
    if (currentUser === null) {
      return;
    }

    if (!currentUser || currentUser.role !== 'accountant') {
      console.error('🚫 Unauthorized access attempt to /accountant route:', {
        user: currentUser,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        path: window.location.pathname
      });
      
      navigate('/', { replace: true });
      return;
    }

    setIsAuthorized(true);
    console.log('✅ Accountant access authorized:', {
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

  // Sample data for students financial records
  const studentsData = [
    {
      id: 'STD001',
      name: 'Alice Uwimana',
      class: 'S6 MCB',
      parentName: 'Jean Uwimana',
      parentPhone: '+250788123456',
      totalFees: 450000,
      paidAmount: 450000,
      remainingAmount: 0,
      status: 'Fully Paid',
      term: 'Term II 2024-2025',
      payments: [
        { date: '2024-01-15', amount: 225000, method: 'Bank Transfer', description: 'School Fees - First Installment' },
        { date: '2024-02-20', amount: 225000, method: 'Mobile Money', description: 'School Fees - Second Installment' }
      ]
    },
    {
      id: 'STD002',
      name: 'David Mukamana',
      class: 'S5 PCM',
      parentName: 'Marie Mukamana',
      parentPhone: '+250788234567',
      totalFees: 420000,
      paidAmount: 300000,
      remainingAmount: 120000,
      status: 'Partial Payment',
      term: 'Term II 2024-2025',
      payments: [
        { date: '2024-01-10', amount: 200000, method: 'Cash', description: 'School Fees - Partial Payment' },
        { date: '2024-02-15', amount: 100000, method: 'Mobile Money', description: 'School Fees - Partial Payment' }
      ]
    },
    {
      id: 'STD003',
      name: 'Sarah Ingabire',
      class: 'S4 MCE',
      parentName: 'Paul Ingabire',
      parentPhone: '+250788345678',
      totalFees: 380000,
      paidAmount: 0,
      remainingAmount: 380000,
      status: 'Not Paid',
      term: 'Term II 2024-2025',
      payments: []
    },
    {
      id: 'STD004',
      name: 'John Nkurunziza',
      class: 'S6 HEG',
      parentName: 'Grace Nkurunziza',
      parentPhone: '+250788456789',
      totalFees: 450000,
      paidAmount: 350000,
      remainingAmount: 100000,
      status: 'Partial Payment',
      term: 'Term II 2024-2025',
      payments: [
        { date: '2024-01-20', amount: 200000, method: 'Bank Transfer', description: 'School Fees - First Payment' },
        { date: '2024-02-10', amount: 150000, method: 'Cash', description: 'School Fees - Second Payment' }
      ]
    },
    {
      id: 'STD005',
      name: 'Emma Karenzi',
      class: 'S5 MPC',
      parentName: 'Robert Karenzi',
      parentPhone: '+250788567890',
      totalFees: 420000,
      paidAmount: 420000,
      remainingAmount: 0,
      status: 'Fully Paid',
      term: 'Term II 2024-2025',
      payments: [
        { date: '2024-01-05', amount: 420000, method: 'Bank Transfer', description: 'School Fees - Full Payment' }
      ]
    }
  ];

  // Financial summary data
  const financialSummary = {
    totalExpected: studentsData.reduce((sum, student) => sum + student.totalFees, 0),
    totalCollected: studentsData.reduce((sum, student) => sum + student.paidAmount, 0),
    totalOutstanding: studentsData.reduce((sum, student) => sum + student.remainingAmount, 0),
    fullyPaidCount: studentsData.filter(s => s.status === 'Fully Paid').length,
    partialPaidCount: studentsData.filter(s => s.status === 'Partial Payment').length,
    notPaidCount: studentsData.filter(s => s.status === 'Not Paid').length
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
          Financial Dashboard
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280' }}>
          Overview of student payments and financial status
        </p>
      </div>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Total Expected</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', margin: '0' }}>
                {financialSummary.totalExpected.toLocaleString()} RWF
              </p>
            </div>
            <div style={{ fontSize: '40px' }}>💰</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Total Collected</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#10b981', margin: '0' }}>
                {financialSummary.totalCollected.toLocaleString()} RWF
              </p>
            </div>
            <div style={{ fontSize: '40px' }}>✅</div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Outstanding</p>
              <p style={{ fontSize: '28px', fontWeight: '700', color: '#ef4444', margin: '0' }}>
                {financialSummary.totalOutstanding.toLocaleString()} RWF
              </p>
            </div>
            <div style={{ fontSize: '40px' }}>⚠️</div>
          </div>
        </div>
      </div>

      {/* Student Status Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr', 
        gap: '24px' 
      }}>
        {/* Recent Payments */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
              Recent Payments
            </h3>
          </div>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {studentsData.filter(s => s.payments.length > 0).slice(0, 5).map(student => (
              <div key={student.id} style={{ padding: '20px', borderBottom: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
                      {student.name}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '4px 0' }}>
                      {student.class} • {student.parentName}
                    </p>
                  </div>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    backgroundColor: student.status === 'Fully Paid' ? '#d1fae5' : '#fef3c7',
                    color: student.status === 'Fully Paid' ? '#065f46' : '#92400e'
                  }}>
                    {student.paidAmount.toLocaleString()} RWF
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Status Distribution */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 24px 0' }}>
            Payment Status
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Fully Paid</span>
              </div>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                {financialSummary.fullyPaidCount}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Partial Payment</span>
              </div>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                {financialSummary.partialPaidCount}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '14px', color: '#374151' }}>Not Paid</span>
              </div>
              <span style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>
                {financialSummary.notPaidCount}
              </span>
            </div>
          </div>

          {/* Collection Rate */}
          <div style={{ marginTop: '32px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
              Collection Rate
            </h4>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981' }}>
              {((financialSummary.totalCollected / financialSummary.totalExpected) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Records Page
  const PaymentRecordsPage = () => {
    const [filterStatus, setFilterStatus] = useState('all');
    
    const filteredStudents = studentsData.filter(student => {
      if (filterStatus === 'all') return true;
      return student.status.toLowerCase().replace(' ', '_') === filterStatus;
    });

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
              Payment Records
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Track all student payments and financial transactions
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
            >
              <option value="all">All Students</option>
              <option value="fully_paid">Fully Paid</option>
              <option value="partial_payment">Partial Payment</option>
              <option value="not_paid">Not Paid</option>
            </select>
            
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px'
              }}
            >
              <option value="Term II 2024-2025">Term II 2024-2025</option>
              <option value="Term I 2024-2025">Term I 2024-2025</option>
              <option value="Term III 2023-2024">Term III 2023-2024</option>
            </select>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Student</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Class</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Parent Contact</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Total Fees</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Paid</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Outstanding</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                          {student.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          ID: {student.id}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>
                      {student.class}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div>
                        <div style={{ fontSize: '14px', color: '#1f2937' }}>
                          {student.parentName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {student.parentPhone}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                      {student.totalFees.toLocaleString()} RWF
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#10b981' }}>
                      {student.paidAmount.toLocaleString()} RWF
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: student.remainingAmount > 0 ? '#ef4444' : '#6b7280' }}>
                      {student.remainingAmount.toLocaleString()} RWF
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: 
                          student.status === 'Fully Paid' ? '#d1fae5' :
                          student.status === 'Partial Payment' ? '#fef3c7' : '#fee2e2',
                        color:
                          student.status === 'Fully Paid' ? '#065f46' :
                          student.status === 'Partial Payment' ? '#92400e' : '#dc2626'
                      }}>
                        {student.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      <button
                        onClick={() => setSelectedStudent(student)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Outstanding Debts Page
  const OutstandingDebtsPage = () => {
    const studentsWithDebts = studentsData.filter(student => student.remainingAmount > 0);
    const averageDebt = studentsWithDebts.length > 0 ? Math.round(financialSummary.totalOutstanding / studentsWithDebts.length) : 0;

    return (
      <div>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
            Outstanding Debts
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280' }}>
            Students with pending fee payments
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>
              {studentsWithDebts.length}
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Students with Debts</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#ef4444', marginBottom: '8px' }}>
              {financialSummary.totalOutstanding.toLocaleString()} RWF
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Outstanding</div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '8px' }}>
              {averageDebt.toLocaleString()} RWF
            </div>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Average Debt per Student</div>
          </div>
        </div>

        {/* Outstanding Students List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0' }}>
              Students with Outstanding Payments
            </h3>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
              <thead>
                <tr style={{ backgroundColor: '#fef2f2' }}>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#991b1b', textTransform: 'uppercase' }}>Student</th>
                  <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#991b1b', textTransform: 'uppercase' }}>Class</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#991b1b', textTransform: 'uppercase' }}>Outstanding Amount</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#991b1b', textTransform: 'uppercase' }}>Payment Progress</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#991b1b', textTransform: 'uppercase' }}>Parent Contact</th>
                  <th style={{ padding: '16px', textAlign: 'center', fontSize: '12px', fontWeight: '600', color: '#991b1b', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentsWithDebts.map((student) => {
                  const paymentProgress = (student.paidAmount / student.totalFees) * 100;
                  return (
                    <tr key={student.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '16px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                            {student.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            ID: {student.id}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontSize: '14px', color: '#374151' }}>
                        {student.class}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: '#ef4444' }}>
                          {student.remainingAmount.toLocaleString()} RWF
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          of {student.totalFees.toLocaleString()} RWF
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <div style={{
                            width: '100px',
                            height: '8px',
                            backgroundColor: '#f3f4f6',
                            borderRadius: '4px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${paymentProgress}%`,
                              height: '100%',
                              backgroundColor: paymentProgress > 66 ? '#10b981' : paymentProgress > 33 ? '#f59e0b' : '#ef4444',
                              transition: 'width 0.3s ease'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '12px', color: '#6b7280' }}>
                            {paymentProgress.toFixed(0)}% paid
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontSize: '14px', color: '#1f2937' }}>
                            {student.parentName}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            {student.parentPhone}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button
                            onClick={() => setSelectedStudent(student)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#3b82f6',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            View
                          </button>
                          <button
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#ef4444',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            Send Reminder
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
  };

  // Reports Page
  const ReportsPage = () => (
    <div>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
          Financial Reports
        </h1>
        <p style={{ fontSize: '16px', color: '#6b7280' }}>
          Generate and view comprehensive financial reports
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '24px' }}>
        {/* Collection Summary Report */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
            Collection Summary - {selectedTerm}
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
              <span style={{ color: '#6b7280' }}>Total Expected Revenue:</span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>{financialSummary.totalExpected.toLocaleString()} RWF</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
              <span style={{ color: '#6b7280' }}>Total Collected:</span>
              <span style={{ fontWeight: '600', color: '#10b981' }}>{financialSummary.totalCollected.toLocaleString()} RWF</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
              <span style={{ color: '#6b7280' }}>Outstanding Amount:</span>
              <span style={{ fontWeight: '600', color: '#ef4444' }}>{financialSummary.totalOutstanding.toLocaleString()} RWF</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', backgroundColor: '#eff6ff', borderRadius: '8px' }}>
              <span style={{ color: '#6b7280' }}>Collection Rate:</span>
              <span style={{ fontWeight: '600', color: '#3b82f6' }}>
                {((financialSummary.totalCollected / financialSummary.totalExpected) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          <button style={{
            width: '100%',
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            📄 Generate Detailed Report
          </button>
        </div>

        {/* Payment Method Analysis */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          padding: '24px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
            Payment Methods Distribution
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['Bank Transfer', 'Mobile Money', 'Cash'].map((method, index) => {
              const methodPayments = studentsData.flatMap(s => s.payments).filter(p => p.method === method);
              const totalAmount = methodPayments.reduce((sum, p) => sum + p.amount, 0);
              const percentage = financialSummary.totalCollected > 0 ? (totalAmount / financialSummary.totalCollected * 100) : 0;
              
              return (
                <div key={method} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'][index],
                      borderRadius: '50%'
                    }}></div>
                    <span style={{ color: '#374151', fontSize: '14px' }}>{method}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>
                      {totalAmount.toLocaleString()} RWF
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button style={{
            width: '100%',
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            📊 View Payment Analytics
          </button>
        </div>
      </div>

      {/* Export Options */}
      <div style={{
        marginTop: '32px',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        padding: '24px'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
          Export Reports
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {['Excel Export', 'PDF Report', 'CSV Data', 'Summary Email'].map((exportType, index) => (
            <button key={exportType} style={{
              padding: '16px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151'
            }}>
              <span style={{ fontSize: '24px' }}>
                {['📊', '📄', '📋', '📧'][index]}
              </span>
              {exportType}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Students Page
  const StudentsPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredStudents = studentsData.filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.class.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1f2937', marginBottom: '8px' }}>
              Student Records
            </h1>
            <p style={{ fontSize: '16px', color: '#6b7280' }}>
              Manage student information and financial records
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                fontSize: '14px',
                minWidth: '200px'
              }}
            />
            <button style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer'
            }}>
              Add Student
            </button>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {filteredStudents.map(student => (
            <div key={student.id} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                    {student.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '0' }}>
                    {student.class} • ID: {student.id}
                  </p>
                </div>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: 
                    student.status === 'Fully Paid' ? '#d1fae5' :
                    student.status === 'Partial Payment' ? '#fef3c7' : '#fee2e2',
                  color:
                    student.status === 'Fully Paid' ? '#065f46' :
                    student.status === 'Partial Payment' ? '#92400e' : '#dc2626'
                }}>
                  {student.status}
                </span>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Parent/Guardian:</span>
                  <span style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{student.parentName}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Contact:</span>
                  <span style={{ fontSize: '14px', color: '#1f2937' }}>{student.parentPhone}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Total Fees:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{student.totalFees.toLocaleString()} RWF</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Paid Amount:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>{student.paidAmount.toLocaleString()} RWF</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Outstanding:</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: student.remainingAmount > 0 ? '#ef4444' : '#6b7280' }}>
                    {student.remainingAmount.toLocaleString()} RWF
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => setSelectedStudent(student)}
                  style={{
                    flex: '1',
                    padding: '10px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  View Details
                </button>
                <button style={{
                  flex: '1',
                  padding: '10px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Edit Info
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Student Detail Modal
  const StudentDetailModal = () => {
    if (!selectedStudent) return null;

    return (
      <div style={{
        position: 'fixed',
        inset: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          {/* Header */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', margin: '0 0 4px 0' }}>
                {selectedStudent.name}
              </h2>
              <p style={{ fontSize: '16px', color: '#6b7280', margin: '0' }}>
                {selectedStudent.class} • ID: {selectedStudent.id}
              </p>
            </div>
            <button
              onClick={() => setSelectedStudent(null)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                color: '#6b7280',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div style={{ padding: '24px' }}>
            {/* Student Info */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                Student Information
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Full Name
                  </label>
                  <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {selectedStudent.name}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Class
                  </label>
                  <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {selectedStudent.class}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Parent/Guardian
                  </label>
                  <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {selectedStudent.parentName}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '14px', color: '#6b7280', display: 'block', marginBottom: '4px' }}>
                    Contact Number
                  </label>
                  <div style={{ fontSize: '16px', color: '#1f2937', fontWeight: '500' }}>
                    {selectedStudent.parentPhone}
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                Financial Summary
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#1f2937' }}>
                    {selectedStudent.totalFees.toLocaleString()} RWF
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Total Fees</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '12px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#10b981' }}>
                    {selectedStudent.paidAmount.toLocaleString()} RWF
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Paid Amount</div>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', backgroundColor: '#fef2f2', borderRadius: '12px' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#ef4444' }}>
                    {selectedStudent.remainingAmount.toLocaleString()} RWF
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>Outstanding</div>
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '16px' }}>
                Payment History
              </h3>
              {selectedStudent.payments.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {selectedStudent.payments.map((payment, index) => (
                    <div key={index} style={{
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                            {payment.amount.toLocaleString()} RWF
                          </div>
                          <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>
                            {payment.description}
                          </div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>
                            Payment Method: {payment.method}
                          </div>
                        </div>
                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                          {payment.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: '40px',
                  textAlign: 'center',
                  backgroundColor: '#f9fafb',
                  borderRadius: '12px',
                  border: '2px dashed #d1d5db'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>💳</div>
                  <div style={{ fontSize: '16px', color: '#6b7280' }}>
                    No payments recorded yet
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
              <button style={{
                padding: '12px 24px',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer'
              }}>
                Record Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      <Sidebar 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        userRole="accountant"
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
              Financial Management
            </h1>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={searchContainerStyle}>
              <div style={searchIconStyle}>🔍</div>
              <input
                type="text"
                placeholder="Search students, payments..."
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
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={contentStyle}>
          {currentPage === 'dashboard' && <DashboardPage />}
          {currentPage === 'payments' && <PaymentRecordsPage />}
          {currentPage === 'outstanding' && <OutstandingDebtsPage />}
          {currentPage === 'reports' && <ReportsPage />}
          {currentPage === 'students' && <StudentsPage />}
        </div>
      </div>
    </div>
  );
};

export default Accountant;