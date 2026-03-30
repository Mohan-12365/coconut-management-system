import { useState } from "react";
import { useEffect } from "react";
//import axios from "axios";
import api from "../api";

// redeploy trigger

function ExpensePage() {

  //const [labourId, setLabourId] = useState("");
  const [selectedLabours, setSelectedLabours] = useState([]);
  const [customAmounts, setCustomAmounts] = useState({});
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [labours, setLabours] = useState([]);
  
  const [date, setDate] = useState("");

  useEffect(()  => {
    api.get("/labours/all")
      .then(res => {
        setLabours(res.data);
      })
      .catch(err => console.log(err));
  }, [])

  // const addExpense = () => {

  //   api.post(`/transactions/add?labourId=${labourId}`, {
  //     amount: Number(amount),
     
  //     type: type,
  //     date: date
  //   })
  //   .then(res => {
  //     alert("Expence Added");
  //   })
  //   .catch(err => console.log(err));

  // };

 const addExpense = () => {

  if (selectedLabours.length === 0) {
    alert("Please select labours");
    return;
  }

  if (!amount || !date || !type) {
    alert("Fill all fields");
    return;
  }

  // 👉 Check if custom amounts entered
  const isCustom = Object.keys(customAmounts).length > 0;

  if (isCustom) {

    // 🔥 Validate total
    const totalCustom = Object.values(customAmounts)
      .reduce((sum, val) => sum + Number(val || 0), 0);

    if (totalCustom !== Number(amount)) {
      alert("Custom total must match total amount");
      return;
    }

    // 🔥 Send custom amounts
    Promise.all(
      selectedLabours.map(labourId =>
        api.post(`/transactions/add?labourId=${labourId}`, {
          amount: Number(customAmounts[labourId] || 0),
          type: type,
          date: date
        })
      )
    )
    .then(() => {
      alert("Custom Expense Added Successfully");

      setSelectedLabours([]);
      setCustomAmounts({});
      setAmount("");
      setType("");
      setDate("");
    });

  } else {

    // ✅ Default equal split
    const splitAmount = Number(amount) / selectedLabours.length;

    Promise.all(
      selectedLabours.map(labourId =>
        api.post(`/transactions/add?labourId=${labourId}`, {
          amount: splitAmount,
          type: type,
          date: date
        })
      )
    )
    .then(() => {
      alert("Expense Split Successfully");

      setSelectedLabours([]);
      setAmount("");
      setType("");
      setDate("");
    });
  }
};
  return (
    <div>
      <h2>Add Expense</h2>

      
   <h3>Select Labours</h3>

{labours.map(l => (
  <div key={l.id}>
    
    <input
      type="checkbox"
      checked={selectedLabours.includes(l.id)}
      onChange={() => {
        if (selectedLabours.includes(l.id)) {
          setSelectedLabours(selectedLabours.filter(id => id !== l.id));
        } else {
          setSelectedLabours([...selectedLabours, l.id]);
        }
      }}
    />

    {l.name}

    {/* Custom amount input */}
    {selectedLabours.includes(l.id) && (
      <input
        type="number"
        placeholder="Enter amount"
        value={customAmounts[l.id] || ""}
        onChange={(e) => {
          setCustomAmounts({
            ...customAmounts,
            [l.id]: e.target.value
          });
        }}
        style={{ marginLeft: "10px" }}
      />
    )}

  </div>
))}



<br/><br/>

      <br/><br/>

      <input
        placeholder="Amount"
        onChange={(e)=>setAmount(e.target.value)}
      />

      <br/><br/>


      <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>
<br/><br/>

<select onChange={(e) => setType(e.target.value)}>

  <option value="">Select Expense Type</option>

  <option value="TEA">1 - Tea</option>
  <option value="FOOD">2 - Food</option>
  <option value="RECHARGE">3 - Recharge</option>
  <option value="ADVANCE">4 - Advance</option>

</select>

<br/><br/>

      <button onClick={addExpense}>Add Expense</button>

    </div>
  );
}

export default ExpensePage;
