import { useState, useEffect } from "react";
//import axios from "axios";
import api from "../api";
import jsPDF from "jspdf";

function SalaryPage() {

  const [labours, setLabours] = useState([]);
  const [selectedLabourId, setSelectedLabourId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [salaryData, setSalaryData] = useState(null);

//   const selectedLabour = labours.find(
//   l => l.id === Number(selectedLabourId)
// );

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

 const downloadPDF = () => {

  const doc = new jsPDF();

  const selectedLabour = labours.find(
    l => l.id === Number(selectedLabourId)
  );

  // 🔥 Clean function
  const cleanNumber = (value) => {
    return Number(String(value).replace(/[^0-9.-]+/g, ""));
  };

  doc.setFontSize(16);
  doc.text("Salary Report", 20, 20);

  doc.setFontSize(12);

  doc.text(`Name: ${selectedLabour.name}`, 20, 40);
  doc.text(`From: ${startDate}`, 20, 50);
  doc.text(`To: ${endDate}`, 20, 60);

  // ✅ NOW CORRECT
  doc.text(`Total Wage: ₹${cleanNumber(salaryData.totalWages)}`, 20, 80);
  doc.text(`Expense: ₹${cleanNumber(salaryData.totalExpense)}`, 20, 90);
  doc.text(`Final Salary: ₹${cleanNumber(salaryData.finalSalary)}`, 20, 100);

  doc.save(`${selectedLabour.name}_salary.pdf`);
};
//   return (
//     <div>

//       <h2>Weekly Salary Report</h2>

//       {/* Labour Dropdown */}
//       <select
//         value={selectedLabourId}
//         onChange={(e) => setSelectedLabourId(e.target.value)}
//       >
//         <option value="">Select Labour</option>
//         {labours.map(labour => (
//           <option key={labour.id} value={labour.id}>
//             {labour.name}
//           </option>
//         ))}
//       </select>

//       <br /><br />

//       {/* Date Range */}
//       <input
//         type="date"
//         value={startDate}
//         onChange={(e) => setStartDate(e.target.value)}
//       />

//       <input
//         type="date"
//         value={endDate}
//         onChange={(e) => setEndDate(e.target.value)}
//       />

//       <br /><br />

//       <button onClick={fetchSalary}>Get Salary</button>

//       {/* Salary Result */}
//       {salaryData && (
//         <div style={{ marginTop: "20px" }}>
//           <p><strong>Total Wages:</strong> ₹{salaryData.totalWages}</p>
//           <p><strong>Total Expense:</strong> ₹{salaryData.totalExpense}</p>
//           <p style={{ fontSize: "18px", fontWeight: "bold" }}>
//             Final Salary: ₹{salaryData.finalSalary}
//           </p>
//         </div>
//       )}

// {salaryData && selectedLabour && (
//   <button onClick={() => {

//     const message = `Salary Report

// Name: ${selectedLabour.name}
// From: ${startDate}
// To: ${endDate}

// Total Wage: ₹${salaryData.totalWages}
// Expense: ₹${salaryData.totalExpense}
// Final Salary: ₹${salaryData.finalSalary}`;

//     const url = `https://wa.me/91${selectedLabour.phone}?text=${encodeURIComponent(message)}`;
//     window.open(url, "_blank");

//   }}>
//     Send WhatsApp
//   </button>
// )}
//     </div>
//   );

  return (
  <div className="container mt-4">

    <div className="card shadow p-4">

      <h2 className="text-center mb-4">💰 Salary Report</h2>

      {/* Labour */}
      <div className="mb-3">
        <label>Select Labour</label>
        <select
          className="form-control"
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
      </div>

      {/* Dates */}
      <div className="mb-3">
        <label>Start Date</label>
        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>End Date</label>
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <button className="btn btn-primary w-100" onClick={fetchSalary}>
        Get Salary
      </button>

      {/* Result */}
      {salaryData && (
        <div className="mt-4 border p-3 rounded">

          <p><strong>Total Wages:</strong> ₹{salaryData.totalWages}</p>
          <p><strong>Total Expense:</strong> ₹{salaryData.totalExpense}</p>

          <h5 className="text-success">
            Final Salary: ₹{salaryData.finalSalary}
          </h5>

          {/* WhatsApp Button */}
          <button
            className="btn btn-success mt-3 w-100"
            onClick={() => {

              const selectedLabour = labours.find(
                l => l.id === Number(selectedLabourId)
              );

              const message = `Hi ${selectedLabour.name},

Salary Report

From: ${startDate}
To: ${endDate}

Total Wage: ₹${salaryData.totalWages}
Expense: ₹${salaryData.totalExpense}

Final Salary: ₹${salaryData.finalSalary}`;

              const url = `https://wa.me/91${selectedLabour.phone}?text=${encodeURIComponent(message)}`;
              window.open(url, "_blank");

            }}
          >
            Send WhatsApp
          </button>

              <button
  className="btn btn-dark mt-2 w-100"
  onClick={downloadPDF}
>
  Download PDF
</button>

        </div>
      )}

    </div>

  </div>
);
}

export default SalaryPage;
