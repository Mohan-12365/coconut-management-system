

import { useEffect, useState } from "react";
import api from "./api";

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
