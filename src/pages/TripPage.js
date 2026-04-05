import { useState, useEffect } from "react";

import api from "../api";

// force redeploy

function App() {

  const [labours, setLabours] = useState([]);
  const [selectedLabours, setSelectedLabours] = useState([]);
  const [driverId, setDriverId] = useState();
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [date, setDate] = useState("");
  const [tripResult, setTripResult] = useState([]);
  const [savedDate, setSavedDate] = useState("");
  const [sqft, setSqft] = useState("");
  const [coirMill, setCoirMill] = useState("");
  const [rate, setRate] = useState(5); // default rate
  const [paymentStatus, setPaymentStatus] = useState("UNPAID");

  //Add Labour
  useEffect(() => {
    api.get("/labours/all")
       .then(res => setLabours(res.data))
       .catch(err => console.log(err));

    api.get("/vehicles/all")
       .then(res => setVehicles(res.data));
  }, []);
const totalAmount = sqft && rate ? sqft * rate : 0;
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
       vehicleId,
       date,
      labours,
      sqft: Number(sqft),
      coirMill,
      ratePerSqft: Number(rate),
      paymentStatus
      labours: selectedLabours.map(id => ({
         labourId: id,
         driver: id === driverId

    
      }))
    };

    console.log(tripData);

    
    api.post("/trips/full", tripData)
    .then(res => {

      console.log("DATA:", res.data);
       setTripResult(res.data);
        setSavedDate(date);
      alert("Trip Created Successfully");

      setSelectedVehicleId(null);
      setSelectedLabours([]);
      setDriverId(null);
      setDate("");
    })
    .catch(err => console.log(err));
 };

  

  return (
//     <div style={{ padding: "20px"  }}>
//       <h1>Coconut Management System</h1>

//       <h2>Create Trip</h2>

//       {/* <input
//       placeholder="Vehicle ID"
//       onChange={(e) => setVehiclesId(e.target.value)}
//       /> */}

//       <select onChange={(e) => setSelectedVehicleId(Number(e.target.value))}>
//         <option value = "">Select Vehicle</option>
//         {vehicles.map(vehicle => (
//           <option key={vehicle.id} value={vehicle.id}>
//             {vehicle.vehicleNo}
//           </option>
//         ))}
//       </select>
//       <br/><br/>

//       <h3>Seleted Labours</h3>

//       {labours.map(labour => (
//         <div key={labour.id}>
//           <input
//           type="checkbox"
//           checked={selectedLabours.includes(labour.id)}
//           onChange={() => handleLabourSelect(labour.id)}
//           />
//           {labour.name}

//           <input
//           type="radio"
//           name="driver"
//           onChange={()  => setDriverId(labour.id)}
//           /> Driver 
//           </div>
//       ))}

//      <input
//   type="date"
//   value={date}
//   onChange={(e) => setDate(e.target.value)}
// />
// <br/><br/>
        
//       <br/>
//       <button onClick={createTrip}>Create</button>

    <div className="container mt-4">

  <div className="card shadow p-4">
    
    <h2 className="mb-4 text-center">🚚 Create Trip</h2>

    {/* Vehicle */}
    <div className="mb-3">
      <label>Select Vehicle</label>
      <select className="form-control"
        onChange={(e) => setSelectedVehicleId(Number(e.target.value))}
      >
        <option value="">Select Vehicle</option>
        {vehicles.map(vehicle => (
          <option key={vehicle.id} value={vehicle.id}>
            {vehicle.vehicleNo}
          </option>
        ))}
      </select>
    </div>

    {/* Date */}
    <div className="mb-3">
      <label>Select Date</label>
      <input
        type="date"
        className="form-control"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>

    {/* Labours */}
    <div className="mb-3">
      <label>Select Labours</label>
      {labours.map(labour => (
        <div key={labour.id} className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={selectedLabours.includes(labour.id)}
            onChange={() => handleLabourSelect(labour.id)}
          />
          <label className="form-check-label">
            {labour.name}
          </label>

          <input
            type="radio"
            name="driver"
            className="ms-2"
            onChange={() => setDriverId(labour.id)}
          /> Driver
        </div>
      ))}
    </div>
<input
  type="text"
  placeholder="Coir Mill Name"
  value={coirMill}
  onChange={(e) => setCoirMill(e.target.value)}
/>

<br/><br/>

<input
  type="number"
  placeholder="Rate per Sqft"
  value={rate}
  onChange={(e) => setRate(e.target.value)}
/>

<br/><br/>

<p><strong>Total Amount:</strong> ₹{totalAmount}</p>

<br/>

<select
  value={paymentStatus}
  onChange={(e) => setPaymentStatus(e.target.value)}
>
  <option value="UNPAID">Unpaid</option>
  <option value="PAID">Paid</option>
</select>
    {/* Button */}
    <button className="btn btn-success w-100" onClick={createTrip}>
      Create Trip
    </button>

  


    <h3>Send WhatsApp</h3>

{tripResult.map((labour, index) => (
  <div key={index}>
    {labour.name} - ₹{labour.wage}

    <button onClick={() => {

      const message = `Hi ${labour.name},
      Your Trip is Calculated.

Date: ${savedDate}
Wage: ₹${labour.wage}
${labour.driver ? "Driver 🚗" : ""}`;

      const url = `https://wa.me/91${labour.phone}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");

    }}>
      Send WhatsApp
    </button>
      <input
  type="number"
  placeholder="Enter Sqft"
  value={sqft}
  onChange={(e) => setSqft(e.target.value)}
/>

<br/><br/>


  </div>
  
))}
    </div>
  </div>
  );
}

export default App;
