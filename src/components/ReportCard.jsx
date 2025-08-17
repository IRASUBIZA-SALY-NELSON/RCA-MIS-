import React from 'react';
//testing the system
const ReportCard = () => {
  const reportData = {
    student: "IRASUBIZA Saly Nelson",
    academicYear: "2024-2025",
    class: "Year 2C",
    courses: [
      { name: "Fundamentals OOP with JAVA", discipline: "Programming", firstTerm: { cat: 35, exam: 38, tot: 73 }, secondTerm: { cat: 36, exam: 37, tot: 73 }, thirdTerm: { cat: 37, exam: 36, tot: 73 }, year: { tot: 219, percent: 91.25 }, grade: "A" },
      { name: "Data Structures & Algorithms", discipline: "Programming", firstTerm: { cat: 34, exam: 36, tot: 70 }, secondTerm: { cat: 35, exam: 35, tot: 70 }, thirdTerm: { cat: 36, exam: 34, tot: 70 }, year: { tot: 210, percent: 87.5 }, grade: "A" },
      { name: "Applied Mathematics II", discipline: "Mathematics", firstTerm: { cat: 32, exam: 35, tot: 67 }, secondTerm: { cat: 33, exam: 34, tot: 67 }, thirdTerm: { cat: 34, exam: 33, tot: 67 }, year: { tot: 201, percent: 83.75 }, grade: "A" },
      { name: "English II", discipline: "Language", firstTerm: { cat: 30, exam: 32, tot: 62 }, secondTerm: { cat: 31, exam: 31, tot: 62 }, thirdTerm: { cat: 32, exam: 30, tot: 62 }, year: { tot: 186, percent: 77.5 }, grade: "B" },
      { name: "Applied Physics II", discipline: "Science", firstTerm: { cat: 28, exam: 30, tot: 58 }, secondTerm: { cat: 29, exam: 29, tot: 58 }, thirdTerm: { cat: 30, exam: 28, tot: 58 }, year: { tot: 174, percent: 72.5 }, grade: "B" },
      { name: "Embedded Systems Software Integration", discipline: "Hardware", firstTerm: { cat: 26, exam: 28, tot: 54 }, secondTerm: { cat: 27, exam: 27, tot: 54 }, thirdTerm: { cat: 28, exam: 26, tot: 54 }, year: { tot: 162, percent: 67.5 }, grade: "C" },
      { name: "3D Models", discipline: "Design", firstTerm: { cat: 24, exam: 26, tot: 50 }, secondTerm: { cat: 25, exam: 25, tot: 50 }, thirdTerm: { cat: 26, exam: 24, tot: 50 }, year: { tot: 150, percent: 62.5 }, grade: "C" },
      { name: "Web3 Applications Development", discipline: "Web Development", firstTerm: { cat: 22, exam: 24, tot: 46 }, secondTerm: { cat: 23, exam: 23, tot: 46 }, thirdTerm: { cat: 24, exam: 22, tot: 46 }, year: { tot: 138, percent: 57.5 }, grade: "D" },
      { name: "Software Engineering", discipline: "Engineering", firstTerm: { cat: 20, exam: 22, tot: 42 }, secondTerm: { cat: 21, exam: 21, tot: 42 }, thirdTerm: { cat: 22, exam: 20, tot: 42 }, year: { tot: 126, percent: 52.5 }, grade: "E" },
      { name: "Advanced Networking", discipline: "Networking", firstTerm: { cat: 18, exam: 20, tot: 38 }, secondTerm: { cat: 19, exam: 19, tot: 38 }, thirdTerm: { cat: 20, exam: 18, tot: 38 }, year: { tot: 114, percent: 47.5 }, grade: "F" },
      { name: "Advanced Database", discipline: "Database", firstTerm: { cat: 16, exam: 18, tot: 34 }, secondTerm: { cat: 17, exam: 17, tot: 34 }, thirdTerm: { cat: 18, exam: 16, tot: 34 }, year: { tot: 102, percent: 42.5 }, grade: "F" },
      { name: "Ikinyarwanda II", discipline: "Language", firstTerm: { cat: 14, exam: 16, tot: 30 }, secondTerm: { cat: 15, exam: 15, tot: 30 }, thirdTerm: { cat: 16, exam: 14, tot: 30 }, year: { tot: 90, percent: 37.5 }, grade: "F" },
      { name: "Advanced JAVA", discipline: "Programming", firstTerm: { cat: 12, exam: 14, tot: 26 }, secondTerm: { cat: 13, exam: 13, tot: 26 }, thirdTerm: { cat: 14, exam: 12, tot: 26 }, year: { tot: 78, percent: 32.5 }, grade: "F" },
      { name: "Entrepreneurship II", discipline: "Business", firstTerm: { cat: 10, exam: 12, tot: 22 }, secondTerm: { cat: 11, exam: 11, tot: 22 }, thirdTerm: { cat: 12, exam: 10, tot: 22 }, year: { tot: 66, percent: 27.5 }, grade: "F" },
      { name: "Citizenship II", discipline: "Social Studies", firstTerm: { cat: 8, exam: 10, tot: 18 }, secondTerm: { cat: 9, exam: 9, tot: 18 }, thirdTerm: { cat: 10, exam: 8, tot: 18 }, year: { tot: 54, percent: 22.5 }, grade: "F" }
    ]
  };

  const calculateTotals = () => {
    const totals = {
      firstTerm: { cat: 0, exam: 0, tot: 0 },
      secondTerm: { cat: 0, exam: 0, tot: 0 },
      thirdTerm: { cat: 0, exam: 0, tot: 0 },
      year: { tot: 0, percent: 0 }
    };

    reportData.courses.forEach(course => {
      totals.firstTerm.cat += course.firstTerm.cat;
      totals.firstTerm.exam += course.firstTerm.exam;
      totals.firstTerm.tot += course.firstTerm.tot;
      totals.secondTerm.cat += course.secondTerm.cat;
      totals.secondTerm.exam += course.secondTerm.exam;
      totals.secondTerm.tot += course.secondTerm.tot;
      totals.thirdTerm.cat += course.thirdTerm.cat;
      totals.thirdTerm.exam += course.thirdTerm.exam;
      totals.thirdTerm.tot += course.thirdTerm.tot;
      totals.year.tot += course.year.tot;
    });

    totals.year.percent = (totals.year.tot / (reportData.courses.length * 120)) * 100;
    return totals;
  };

  const totals = calculateTotals();

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'white',
    fontFamily: 'Arial, sans-serif',
    fontSize: '12px',
    lineHeight: '1.4',
    color: 'black'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '20px',
    borderBottom: '2px solid black',
    paddingBottom: '10px'
  };

  const leftHeaderStyle = {
    flex: '1'
  };

  const rightHeaderStyle = {
    flex: '1',
    textAlign: 'right'
  };

  const logoStyle = {
    width: '60px',
    height: '60px',
    backgroundColor: '#0066cc',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px 0'
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0',
    textTransform: 'uppercase'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  };

  const thStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    fontWeight: 'bold',
    fontSize: '10px'
  };

  const tdStyle = {
    border: '1px solid black',
    padding: '6px',
    textAlign: 'center',
    fontSize: '10px'
  };

  const tdLeftStyle = {
    ...tdStyle,
    textAlign: 'left'
  };

  const gradeScaleStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  };

  const decisionStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px'
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: '30px'
  };

  const checkboxStyle = {
    width: '12px',
    height: '12px',
    border: '1px solid black',
    display: 'inline-block',
    marginRight: '5px'
  };

  const checkedBoxStyle = {
    ...checkboxStyle,
    backgroundColor: 'black'
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={leftHeaderStyle}>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>REPUBLIC OF RWANDA</div>
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>MINISTRY OF EDUCATION</div>
          <div style={{ fontWeight: 'bold', fontSize: '16px', marginTop: '5px' }}>RWANDA CODING ACADEMY</div>
          <div style={logoStyle}>RCA</div>
          <div>Telephone: (+250) 788548000</div>
          <div>Email: papiasni@gmail.com</div>
        </div>
        <div style={rightHeaderStyle}>
          <div><strong>Academic Year:</strong> {reportData.academicYear}</div>
          <div><strong>Class:</strong> {reportData.class}</div>
          <div><strong>Name:</strong> {reportData.student}</div>
        </div>
      </div>

      {/* Title */}
      <div style={titleStyle}>TRANSCRIPT</div>

      {/* Main Table */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} rowSpan="2">COURSES</th>
            <th style={thStyle} rowSpan="2">DISCIPLINE</th>
            <th style={thStyle} colSpan="3">FIRST TERM</th>
            <th style={thStyle} colSpan="3">SECOND TERM</th>
            <th style={thStyle} colSpan="3">THIRD TERM</th>
            <th style={thStyle} colSpan="2">YEAR</th>
            <th style={thStyle} rowSpan="2">GRADE</th>
          </tr>
          <tr>
            <th style={thStyle}>CAT</th>
            <th style={thStyle}>EXAM</th>
            <th style={thStyle}>TOT</th>
            <th style={thStyle}>CAT</th>
            <th style={thStyle}>EXAM</th>
            <th style={thStyle}>TOT</th>
            <th style={thStyle}>CAT</th>
            <th style={thStyle}>EXAM</th>
            <th style={thStyle}>TOT</th>
            <th style={thStyle}>TOT</th>
            <th style={thStyle}>%</th>
          </tr>
          <tr>
            <th style={thStyle} colSpan="2">MARKS</th>
            <th style={thStyle}>40</th>
            <th style={thStyle}>40</th>
            <th style={thStyle}>80</th>
            <th style={thStyle}>40</th>
            <th style={thStyle}>40</th>
            <th style={thStyle}>80</th>
            <th style={thStyle}>40</th>
            <th style={thStyle}>40</th>
            <th style={thStyle}>80</th>
            <th style={thStyle}>120</th>
            <th style={thStyle}>120</th>
            <th style={thStyle}></th>
          </tr>
        </thead>
        <tbody>
          {reportData.courses.map((course, index) => (
            <tr key={index}>
              <td style={tdLeftStyle}>{course.name}</td>
              <td style={tdStyle}>{course.discipline}</td>
              <td style={tdStyle}>{course.firstTerm.cat}</td>
              <td style={tdStyle}>{course.firstTerm.exam}</td>
              <td style={tdStyle}>{course.firstTerm.tot}</td>
              <td style={tdStyle}>{course.secondTerm.cat}</td>
              <td style={tdStyle}>{course.secondTerm.exam}</td>
              <td style={tdStyle}>{course.secondTerm.tot}</td>
              <td style={tdStyle}>{course.thirdTerm.cat}</td>
              <td style={tdStyle}>{course.thirdTerm.exam}</td>
              <td style={tdStyle}>{course.thirdTerm.tot}</td>
              <td style={tdStyle}>{course.year.tot}</td>
              <td style={tdStyle}>{course.year.percent.toFixed(2)}</td>
              <td style={tdStyle}><strong>{course.grade}</strong></td>
            </tr>
          ))}
          <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <td style={tdLeftStyle} colSpan="2">Total</td>
            <td style={tdStyle}>{totals.firstTerm.cat}</td>
            <td style={tdStyle}>{totals.firstTerm.exam}</td>
            <td style={tdStyle}>{totals.firstTerm.tot}</td>
            <td style={tdStyle}>{totals.secondTerm.cat}</td>
            <td style={tdStyle}>{totals.secondTerm.exam}</td>
            <td style={tdStyle}>{totals.secondTerm.tot}</td>
            <td style={tdStyle}>{totals.thirdTerm.cat}</td>
            <td style={tdStyle}>{totals.thirdTerm.exam}</td>
            <td style={tdStyle}>{totals.thirdTerm.tot}</td>
            <td style={tdStyle}>{totals.year.tot}</td>
            <td style={tdStyle}>{totals.year.percent.toFixed(2)}</td>
            <td style={tdStyle}></td>
          </tr>
          <tr style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
            <td style={tdLeftStyle} colSpan="2">Percentage</td>
            <td style={tdStyle} colSpan="3">{((totals.firstTerm.tot / (reportData.courses.length * 80)) * 100).toFixed(2)}%</td>
            <td style={tdStyle} colSpan="3">{((totals.secondTerm.tot / (reportData.courses.length * 80)) * 100).toFixed(2)}%</td>
            <td style={tdStyle} colSpan="3">{((totals.thirdTerm.tot / (reportData.courses.length * 80)) * 100).toFixed(2)}%</td>
            <td style={tdStyle} colSpan="2">{totals.year.percent.toFixed(2)}%</td>
            <td style={tdStyle}></td>
          </tr>
        </tbody>
      </table>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <strong>Signature of Class Advisor</strong>
      </div>

      {/* Grade Scale */}
      <table style={gradeScaleStyle}>
        <thead>
          <tr>
            <th style={thStyle} colSpan="4">GRADE SCALE</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>GRADE SCALE</strong></td>
            <td style={tdStyle}><strong>SCORE RANGE</strong></td>
            <td style={tdStyle}><strong>CAT</strong></td>
            <td style={tdStyle}><strong>EXAM</strong></td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>A</strong></td>
            <td style={tdStyle}>100-70</td>
            <td style={tdStyle}>40</td>
            <td style={tdStyle}>40</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>B</strong></td>
            <td style={tdStyle}>69.9-65</td>
            <td style={tdStyle}>40</td>
            <td style={tdStyle}>40</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>C</strong></td>
            <td style={tdStyle}>64.9-60</td>
            <td style={tdStyle}>40</td>
            <td style={tdStyle}>40</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>D</strong></td>
            <td style={tdStyle}>59.9-55</td>
            <td style={tdStyle}>40</td>
            <td style={tdStyle}>40</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>E</strong></td>
            <td style={tdStyle}>54.9-50</td>
            <td style={tdStyle}>40</td>
            <td style={tdStyle}>40</td>
          </tr>
          <tr>
            <td style={tdStyle}><strong>F</strong></td>
            <td style={tdStyle}>49.9-0</td>
            <td style={tdStyle}>40</td>
            <td style={tdStyle}>40</td>
          </tr>
        </tbody>
      </table>

      {/* Decision */}
      <table style={decisionStyle}>
        <thead>
          <tr>
            <th style={thStyle} colSpan="2">Decision of the deliberation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}><strong>1. FIRST SITTING</strong></td>
            <td style={tdStyle}><strong>2. SECOND SITTING</strong></td>
          </tr>
          <tr>
            <td style={tdStyle}>
              <span style={checkboxStyle}></span> Promoted<br/>
              <span style={checkedBoxStyle}></span> Proposed to Second Sitting<br/>
              <span style={checkedBoxStyle}></span> Proposed to Repeat
            </td>
            <td style={tdStyle}>
              <span style={checkboxStyle}></span> Promoted<br/>
              <span style={checkboxStyle}></span> Proposed to Repeat
            </td>
          </tr>
        </tbody>
      </table>

      {/* Footer */}
      <div style={footerStyle}>
        <div>
          <div>Done at Nyabihu</div>
          <div style={{ marginTop: '20px' }}>The Principal</div>
          <div style={{ marginTop: '30px' }}>Signature and Stamp</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '80px', 
            height: '80px', 
            backgroundColor: '#f0f0f0', 
            border: '1px solid #ccc',
            margin: '0 auto 10px'
          }}>
            QR Code
          </div>
          <div style={{ fontSize: '10px' }}>Scan QR Code for verification & more details</div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
