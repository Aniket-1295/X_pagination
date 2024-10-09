import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading,setloading]=useState(true);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setEmployees(data);
        setloading(false)
      } catch (error) {
        alert("Failed to fetch data");
        setloading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Calculate the index of the first item of the current page
  const indexOfLastEmployee = currentPage * itemsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(employees.length / itemsPerPage)) {
      // console.log(currentPage)
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      // console.log(currentPage)
      setCurrentPage(currentPage - 1);
      // console.log(currentPage)

    }
  };


  useEffect(() => {
  console.log("Current Page is:", currentPage);
}, [currentPage]);



  if(loading){
    return<div>Loading...</div>
  }

  const totalPages = Math.ceil(employees.length / itemsPerPage);



  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttoncontainer">
        
        
        <button 
        
        disabled={currentPage ===1 }
        onClick={previousPage} 
        >
          Previous
        </button>
        <span> {currentPage} </span>
        <button
          onClick={nextPage}
          // disabled={currentPage === Math.ceil(employees.length / itemsPerPage)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;