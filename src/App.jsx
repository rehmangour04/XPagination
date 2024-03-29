/** @format */

import { useEffect, useState } from "react";
import Pagination from "./components/Pagination";

const API =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const RESULTS_PER_PAGE = 10;

function App() {
  const [empData, setEmpData] = useState([]);
  const [empPerPage, setEmpPerPage] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployeeData = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setEmpData(data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  useEffect(() => {
    const start = (currPage - 1) * RESULTS_PER_PAGE;
    const end = start + RESULTS_PER_PAGE;
    setEmpPerPage(empData.slice(start, end));
  }, [empData, currPage]);

  return (
    <>
      <header>
        <h1>Employee Data Table</h1>
      </header>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
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
              {empPerPage.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            page={currPage}
            maxPage={Math.ceil(empData.length / RESULTS_PER_PAGE)}
            setPage={setCurrPage}
          />
        </>
      )}
    </>
  );
}

export default App;
