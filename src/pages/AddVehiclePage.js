import { useState } from "react";
//import axios from "axios";
import api from "../api";

function AddVehiclePage() {

  const [vehicleNo, setVehicleNo] = useState("");
  const [amount, setAmount] = useState("");

  const addVehicle = () => {

    api.post("https://coconut-management-system-2.onrender.com", {
      vehicleNo: vehicleNo,
      fixedAmount: Number(amount)
    })
    .then(() => {
      alert("Vehicle Added");
      setVehicleNo("");
      setAmount("");
    })
    .catch(err => console.log(err));

  };

  return (
    <div>

      <h2>Add Vehicle</h2>

      <input
        placeholder="Vehicle Number"
        value={vehicleNo}
        onChange={(e)=>setVehicleNo(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Fixed Amount"
        value={amount}
        onChange={(e)=>setAmount(e.target.value)}
      />

      <br/><br/>

      <button onClick={addVehicle}>Add Vehicle</button>

    </div>
  );
}

export default AddVehiclePage;
