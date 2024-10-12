import React, { useState, useEffect } from 'react';

const App = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setEmployeeData(data);
      } catch (error) {
        alert('Failed to fetch data');
      }
    };
    
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = employeeData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(employeeData.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Employee Data Table</h1>
      <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: 'green', color: 'white' }}>
            <th style={{ padding: '10px', border: '1px solid white' }}>ID</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Email</th>
            <th style={{ padding: '10px', border: '1px solid white' }}>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map(employee => (
            <tr key={employee.id}>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{employee.id}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{employee.name}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{employee.email}</td>
              <td style={{ padding: '10px', border: '1px solid gray' }}>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handlePreviousPage}
          // disabled={currentPage === 1}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            marginRight: '10px',
            border: 'none',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
        >
          Previous 
        </button>

        <span
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            margin: '0 10px',
            borderRadius: '5px',
            border: 'none',
          }}
        >
          {currentPage}
        </span>

        <button
          onClick={handleNextPage}
          // disabled={currentPage === totalPages}
          style={{
            backgroundColor: 'green',
            color: 'white',
            padding: '10px 20px',
            marginLeft: '10px',
            border: 'none',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;