/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setData(response.data);
    } catch (error) {
      alert("Failed to fetch data");
      console.error("Error fetching data:", error);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages()) {
      setCurrentPage(currentPage + 1);
      const newStartIndex = currentPage * 10;
      const newEnddIndex = Math.min(newStartIndex + 10, data.length);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const newStartIndex = (currentPage - 2) * 10;
      const newEndIndex = Math.min(newStartIndex + 10, data.length);
      setStartIndex(newStartIndex);
      setEndIndex(newEndIndex);
    }
  };

  const totalPages = () => {
    return Math.ceil(data.length / 10);
  };

  return (
    <div>
      <h1 className="title">Employee Data Table</h1>
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
          {data.slice(startIndex, endIndex).map((employee, index) => (
            <tr key={index}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="page-info"> {currentPage} </span>
        <button onClick={nextPage} disabled={currentPage === totalPages()}>
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
