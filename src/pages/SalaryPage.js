import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";

function SalaryPage() {

  const [labours, setLabours] = useState([]);
  const [selectedLabourId, setSelectedLabourId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salaryData, setSalaryData] = useState(null);

  // Fetch labour list
  useEffect(() => {
    api.get("/labours/all")
      .then(res => setLabours(res.data))
      .catch(err => console.log(err));
  }, []);

  const fetchSalary = () => {

    if (!selectedLabourId || !startDate || !endDate) {
      alert("Please select labour and date range");
      return;
    }

    api.get(
      `/salary/weekly/${selectedLabourId}?startDate=${startDate}&endDate=${endDate}`
    )
      .then(res => setSalaryData(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div>

      <h2>Weekly Salary Report</h2>

      {/* Labour Dropdown */}
      <select
        value={selectedLabourId}
        onChange={(e) => setSelectedLabourId(e.target.value)}
      >
        <option value="">Select Labour</option>
        {labours.map(labour => (
          <option key={labour.id} value={labour.id}>
            {labour.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* Date Range */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />

      <br /><br />

      <button onClick={fetchSalary}>Get Salary</button>

      {/* Salary Result */}
      {salaryData && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Total Wages:</strong> ₹{salaryData.totalWages}</p>
          <p><strong>Total Expense:</strong> ₹{salaryData.totalExpense}</p>
          <p style={{ fontSize: "18px", fontWeight: "bold" }}>
            Final Salary: ₹{salaryData.finalSalary}
          </p>
        </div>
      )}

    </div>
  );
}

export default SalaryPage;
