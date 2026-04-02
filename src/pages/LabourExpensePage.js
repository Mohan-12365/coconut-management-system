import { useEffect, useState } from "react";
import api from "../api";

function LabourExpensePage() {

  const [expenses, setExpenses] = useState([]);

  const labourId = localStorage.getItem("labourId");

  useEffect(() => {
    api.get(`/transactions/labour/${labourId}`)
      .then(res => setExpenses(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h2>My Expenses</h2>

      {expenses.map((e, index) => (
        <div key={index} className="card p-2 mb-2">
          ₹{e.amount} - {e.type} - {e.date}
        </div>
      ))}
    </div>
  );
}

export default LabourExpensePage;
