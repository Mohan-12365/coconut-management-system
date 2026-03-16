import { useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function SalaryReport() {

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [data, setData] = useState([]);

  const fetchSalary = () => {
    axios.get(`http://localhost:8080/salary/monthly?year=${year}&month=${month}`)
      .then(res => {
        const formatted = res.data.map(row => ({
          labourId: row[0],
          name: row[1],
          totalTrips: row[2],
          totalSalary: row[3]
        }));
        setData(formatted);
      })
      .catch(err => console.log(err));
  };

  const exportToExcel = () => {
    if (data.length === 0) {
      alert("No data to export");
      return;
    }
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary Report");
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });
  
    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream"
    });
  
    saveAs(fileData, `Salary_Report_${month}_${year}.xlsx`);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Monthly Salary Report</h2>

      <input
        placeholder="Year"
        onChange={e => setYear(e.target.value)}
      />

      <input
        placeholder="Month"
        onChange={e => setMonth(e.target.value)}
      />

      <button onClick={fetchSalary}>Get Report</button>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Trips</th>
            <th>Total Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.totalTrips}</td>
              <td>{row.totalSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chart */}
      <h3 style={{ marginTop: "40px" }}>Salary Chart</h3>

      <BarChart
        width={600}
        height={300}
        data={data}
        style={{ marginTop: "20px" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSalary" fill="#82ca9d" />
      </BarChart>

      <button onClick={exportToExcel} style={{ marginLeft: "10px"}}>
        Export to Excel
      </button>
    </div>
  );
}

export default SalaryReport;