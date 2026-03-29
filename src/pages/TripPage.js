import { useState, useEffect } from "react";

import api from "../api";

function App() {

  const [labours, setLabours] = useState([]);
  const [selectedLabours, setSelectedLabours] = useState([]);
  const [driverId, setDriverId] = useState();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [date, setDate] = useState("");
  const [tripResult, setTripResult] = useState([]);

  //Add Labour
  useEffect(() => {
    api.get("/labours/all")
       .then(res => setLabours(res.data))
       .catch(err => console.log(err));

    api.get("/vehicles/all")
       .then(res => setVehicles(res.data));
  }, []);

  const handleLabourSelect = (labourId) => {
    if (selectedLabours.includes(labourId)) {
      setSelectedLabours(selectedLabours.filter(id => id !== labourId));
    } else {
      setSelectedLabours([...selectedLabours, labourId]);
    }
  };

  const createTrip = () => {


     if (!selectedVehicleId) {
          alert("Please select vehicle");
          return;
         }

      if (!date) {
          alert("Please select date");
          return;
         }

      if (selectedLabours.length === 0) {
          alert("Please select at least one labour");
          return;
         }

      if (!driverId || !selectedLabours.includes(driverId)) {
        alert("Please select driver from selected labours");
        return;
      }

    const tripData = {
      vehicleId: selectedVehicleId,
      date: date,
      labours: selectedLabours.map(id => ({
         labourId: id,
         driver: id === driverId

    
      }))
    };

    console.log(tripData);

    const currentDate = date;
    
    api.post("/trips/full", tripData)
    .then(res => {

      console.log("DATA:", res.data);
       setTripResult(res.data);
      
      alert("Trip Created Successfully");

      setSelectedVehicleId(null);
      setSelectedLabours([]);
      setDriverId(null);
      setDate("");
    })
    .catch(err => console.log(err));
 };

  return (
    <div style={{ padding: "20px"  }}>
      <h1>Coconut Management System</h1>

      <h2>Create Trip</h2>

      {/* <input
      placeholder="Vehicle ID"
      onChange={(e) => setVehiclesId(e.target.value)}
      /> */}

      <select onChange={(e) => setSelectedVehicleId(Number(e.target.value))}>
        <option value = "">Select Vehicle</option>
        {vehicles.map(vehicle => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.vehicleNo}
          </option>
        ))}
      </select>
      <br/><br/>

      <h3>Seleted Labours</h3>

      {labours.map(labour => (
        <div key={labour.id}>
          <input
          type="checkbox"
          checked={selectedLabours.includes(labour.id)}
          onChange={() => handleLabourSelect(labour.id)}
          />
          {labour.name}

          <input
          type="radio"
          name="driver"
          onChange={()  => setDriverId(labour.id)}
          /> Driver 
          </div>
      ))}

     <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
<br/><br/>
        
      <br/>
      <button onClick={createTrip}>Create</button>

    <h3>Send WhatsApp</h3>

{tripResult.map((labour, index) => (
  <div key={index}>
    {labour.name} - ₹{labour.wage}

    <button onClick={() => {

      const message = `Trip Created

Date: ${currentDate}
Wage: ₹${labour.wage}
${labour.driver ? "Driver 🚗" : ""}`;

      const url = `https://wa.me/91${labour.phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

    }}>
      Send WhatsApp
    </button>
  </div>
))}
    </div>
  );
}

export default App;
