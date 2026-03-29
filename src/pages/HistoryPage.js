import React, { useState } from "react";
import api from "./api"; // axios config

function App() {
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const fetchTrips = () => {
    api.get(`/trips/by-date?date=${date}`)
      .then(res => setResults(res.data))
      .catch(err => console.log(err));
  };

  const sendWhatsApp = (labour) => {
    const message = `Hi ${labour.name},

📅 Date: ${date}
💰 Wage: ₹${labour.wage}
${labour.driver ? "🚗 Driver" : "👷 Labour"}

Thanks!`;

    const url = `https://wa.me/91${labour.phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trip History</h2>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={fetchTrips}>Search</button>

      <hr />

      {results.map((labour, index) => (
        <div key={index} style={{ margin: "10px", border: "1px solid gray", padding: "10px" }}>
          <p><b>{labour.name}</b></p>
          <p>₹{labour.wage}</p>

          <button onClick={() => sendWhatsApp(labour)}>
            Send WhatsApp
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
