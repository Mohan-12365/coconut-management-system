import { useState, useEffect } from "react";
import api from "./api";

function TripHistory() {

  const [trips, setTrips] = useState([]);

  useEffect(() => {
    api.get("/trips/all")
      .then(res => {
        console.log(res.data);
        setTrips(Array.isArray(res.data) ? res.data : res.data.content);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trip History</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Labours Count</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(trips) && trips.map(trip => (
            <tr key={trip.id}>
              <td>{trip.id}</td>
              <td>{trip.date}</td>
              <td>{trip.vehicle?.vehicleNo}</td>
              <td>{trip.tripLabours?.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TripHistory;
