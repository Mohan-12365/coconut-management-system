import { useState, useEffect } from "react";
//import axios from "axios";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

function EditLabourPage() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [advance, setAdvance] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {

    api.get(`/labours/${id}`)
      .then(res => {
        setName(res.data.name);
        setPhone(res.data.phone);
        setAdvance(res.data.totalAdvance);

        setUsername(res.data.username);
        setPassword(res.data.password);
      });

  }, [id]);

  const updateLabour = () => {

    api.put(`/labours/update/${id}`, {
      name: name,
      phone: phone,
      totalAdvance: advance,
      username,   
      password 
    })
    .then(() => {
      alert("Labour Updated");
      navigate("/labours");
    });

  };

  return (
    <div>

      <h2>Edit Labour</h2>

      <input
        value={name || ""}
        onChange={(e)=>setName(e.target.value)}
      />

      <br/><br/>

      <input
        value={phone}
        onChange={(e)=>setPhone(e.target.value)}
      />

      <br/><br/>

      <input
        value={advance}
        onChange={(e)=>setAdvance(e.target.value)}
      />

      <br/><br/>

          <input
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
 <br/><br/>
<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
 <br/><br/>
    
      <button onClick={updateLabour}>
        Update
      </button>

    </div>
  );
}

export default EditLabourPage;
