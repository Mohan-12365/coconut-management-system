import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LabourListPage() {

  const [labours, setLabours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/labours/all")
      .then(res => setLabours(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>

      <h2>Labour List</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Advance</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {labours.map(l => (
            <tr key={l.id}>
              <td>{l.id}</td>
              <td>{l.name}</td>
              <td>{l.phone}</td>
              <td>{l.totalAdvance}</td>

              <td>
                <button onClick={() => navigate(`/edit-labour/${l.id}`)}>
                  Edit
                </button>
              </td>

            </tr>
          ))}

        </tbody>
      </table>

    </div>
  );
}

export default LabourListPage;