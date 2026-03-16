import { useState } from "react";
import axios from "axios";

function ExpenseHistory() {

  const [labourId, setLabourId] = useState("");
  const [transactions, setTransactions] = useState([]);

  const loadHistory = () => {

    axios.get(`http://localhost:8080/transactions/labour/${labourId}`)
      .then(res => {
        setTransactions(res.data);
      })
      .catch(err => console.log(err));

  };

  return (
    <div>

      <h2>Expense History</h2>

      <input
        placeholder="Enter Labour ID"
        onChange={(e)=>setLabourId(e.target.value)}
      />

      <button onClick={loadHistory}>Load</button>

      <br/><br/>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>

          {transactions.map((t,i)=>(
            <tr key={i}>
              <td>{t.date}</td>
              <td>{t.type}</td>
              <td>{t.amount}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ExpenseHistory;