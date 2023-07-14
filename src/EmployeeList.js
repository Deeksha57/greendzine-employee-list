import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="employee-list-container">
      <h1>Employee List</h1>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <div className="cards-container">
        {filteredEmployees.map((employee) => (
          <div key={employee.id} className="employee-card">
            <div className="id-number">{employee.id}</div>
            <div className="avatar-container">
              <img src={employee.avatar} alt="Avatar" className="avatar" />
            </div>
            <p className="employee-name">{employee.first_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
