

// import { useEffect, useState } from "react";
// import api from "../api";
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
// } from "recharts";

// function DashboardPage() {

//   const [stats, setStats] = useState({
//     trips: 0,
//     salary: 0,
//     expense: 0
//   });

//   const [chartData, setChartData] = useState([]);

//   useEffect(() => {
//     api.get("/dashboard")
//       .then(res => {
//         setStats(res.data);

//         // sample chart format
//         setChartData([
//           { name: "Trips", value: res.data.trips },
//           { name: "Salary", value: res.data.salary },
//           { name: "Expense", value: res.data.expense }
//         ]);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   return (
//     <div className="container">

//       <h2 className="mb-4">📊 Dashboard</h2>

//       {/* 🔥 CARDS */}
//       <div className="row">

//         <div className="col-md-4">
//           <div className="card text-center shadow p-3">
//             <h5>🚚 Trips</h5>
//             <h3>{stats.trips}</h3>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card text-center shadow p-3">
//             <h5>💰 Salary</h5>
//             <h3>₹{stats.salary}</h3>
//           </div>
//         </div>

//         <div className="col-md-4">
//           <div className="card text-center shadow p-3">
//             <h5>💸 Expense</h5>
//             <h3>₹{stats.expense}</h3>
//           </div>
//         </div>

//       </div>

//       {/* 🔥 CHART */}
//       <div className="card shadow p-4 mt-4">
//         <h5 className="mb-3">📈 Overview</h5>

//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chartData}>
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="value" />
//           </BarChart>
//         </ResponsiveContainer>

//       </div>

//     </div>
//   );
// }

// export default DashboardPage;

import { useEffect, useState } from "react";
import api from "../api";

function DashboardPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/dashboard")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  if (!data) return <h3>Loading...</h3>;

  const cardStyle = {
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f9f9f9",
    textAlign: "center"
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px"
      }}>
        <div style={cardStyle}>
          <h4>Total Labours</h4>
          <h2>{data.totalLabours}</h2>
        </div>

        <div style={cardStyle}>
          <h4>Total Vehicles</h4>
          <h2>{data.totalVehicles}</h2>
        </div>

        <div style={cardStyle}>
          <h4>This Week Wages</h4>
          <h2>₹{data.totalWages}</h2>
        </div>

        <div style={cardStyle}>
          <h4>This Week Expense</h4>
          <h2>₹{data.totalExpense}</h2>
        </div>

        <div style={cardStyle}>
          <h4>Net Amount</h4>
          <h2>₹{data.netAmount}</h2>
        </div>
      </div>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Logout
      </button>
    </div>
  );
}

export default DashboardPage;
