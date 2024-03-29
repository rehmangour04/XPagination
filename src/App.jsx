/** @format */

import { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  const handleNext = () => {
    if (page < Math.ceil(data.length / itemsPerPage)) {
      setPage(page + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderTableData = () => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end).map((employee, index) => (
      <tr key={index}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.email}</td>
        <td>{employee.role}</td>
      </tr>
    ));
  };

  return (
    <div className="pagination-container">
      {" "}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div className="pagination-controls">
        {" "}
        <button onClick={handlePrevious} disabled={page === 1}>
          Previous
        </button>
        <span>{page}</span>
        <button
          onClick={handleNext}
          disabled={page === Math.ceil(data.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
