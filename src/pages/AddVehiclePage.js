import { useState } from "react";
import axios from "axios";

function AddVehiclePage() {

  const [vehicleNo, setVehicleNo] = useState("");
  const [amount, setAmount] = useState("");

  const addVehicle = () => {

    axios.post("http://localhost:8080/vehicles/add", {
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