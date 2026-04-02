import { useEffect, useState } from "react";
import api from "../api";

function LabourSalaryPage() {

  const [salaryData, setSalaryData] = useState(null);

  const labourId = localStorage.getItem("labourId");

  useEffect(() => {
    api.get(`/salary/weekly/${labourId}?startDate=2026-03-01&endDate=2026-03-31`)
      .then(res => setSalaryData(res.data))
      .catch(err => console.log(err));
  }, [labourId]);

  return (
    <div className="container mt-4">
      <h2>My Salary</h2>

      {salaryData && (
        <div className="card p-3">
          <p>Total Wage: ₹{salaryData.totalWages}</p>
          <p>Expense: ₹{salaryData.totalExpense}</p>
          <h4>Final Salary: ₹{salaryData.finalSalary}</h4>
        </div>
      )}
    </div>
  );
}

export default LabourSalaryPage;
