import { useState } from "react";

// redeploy fix

import api from "../api";

function AddLabourPage() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [advance, setAdvance] = useState("");

  const addLabour = () => {

    api.post("/labours/add", {
      name: name,
      phone: phone,
      totalAdvance: Number(advance)
    })
    .then(() => {
      alert("Labour Added");
      setName("");
      setPhone("");
      setAdvance("");
    })
    .catch(err => console.log(err));

  };

  return (
    <div>

      <h2>Add Labour</h2>

      <input
        placeholder="Labour Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Phone"
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <br/><br/>

      <input
        placeholder="Total Advance"
        value={advance}
        onChange={(e)=>setAdvance(e.target.value)}
      />

      <br/><br/>

      <button onClick={addLabour}>Add Labour</button>

    </div>
  );
}

export default AddLabourPage;
