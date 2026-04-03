
import { useState } from "react";   // ✅ ADD THIS
import api from "../api";

function LabourSalaryPage() {

  const [salaryData, setSalaryData] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const labourId = localStorage.getItem("labourId");

  const fetchSalary = () => {

    if (!startDate || !endDate) {
      alert("Please select date range");
      return;
    }

    api.get(`/salary/weekly/${labourId}?startDate=${startDate}&endDate=${endDate}`)
      .then(res => setSalaryData(res.data))
      .catch(err => console.log(err));
  };

  return (
    <div className="container mt-4">

      <div className="card shadow p-4">

        <h2 className="text-center mb-4">💰 My Salary</h2>

        {/* Start Date */}
        <div className="mb-3">
          <label>Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        {/* End Date */}
        <div className="mb-3">
          <label>End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Button */}
        <button className="btn btn-primary w-100" onClick={fetchSalary}>
          Get My Salary
        </button>

        {/* Result */}
        {salaryData && (
          <div className="mt-4 border p-3 rounded">

            <p><strong>Total Wage:</strong> ₹{salaryData.totalWages}</p>
            <p><strong>Expense:</strong> ₹{salaryData.totalExpense}</p>

            <h5 className="text-success">
              Final Salary: ₹{salaryData.finalSalary}
            </h5>

          </div>
        )}

      </div>

    </div>
  );
}

export default LabourSalaryPage;




  
  );
}

export default LabourSalaryPage;
