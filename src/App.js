

//import {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TripPage from "./pages/TripPage";
import SalaryPage from "./pages/SalaryPage";
import DashboardPage from "./pages/DashboardPage";
import TripHistory from "./TripHistory";
import SalaryReport from "./SalaryReport";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ExpensePage from "./pages/ExpensePage";
import ExpenseHistory from "./pages/ExpenseHistory";
import AddLabourPage from "./pages/AddLabourPage";
import AddVehiclePage from "./pages/AddVehiclePage";
import LabourListPage from "./pages/LabourListPage";
import EditLabourPage from "./pages/EditLabourPage";

function App() {

    // const [user, setUser] = useState(null);

    // if (!user) {
    //   return <LoginPage onLogin={setUser} />
    // }

    const token = localStorage.getItem("token");
      

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Coconut Management System</h1>

        {token && (
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/trip" style={{ marginRight: "15px" }}>Trip</Link>
          <Link to="/salary" style={{ marginRight: "15px" }}>Salary</Link>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
          <Link to="/expense" style={{ marginRight: "15px" }}>Expense</Link>
          <Link to="/expense-history" style={{ marginRight: "15px" }}>Expense History</Link>
          <Link to="/add-labour" style={{ marginRight: "15px" }}>Add Labour</Link>
          <Link to="/add-vehicle" style={{ marginRight: "15px" }}>Add Vehicle</Link>
          <Link to="/labours">Labours</Link>
            
        </nav>
        )}
        {/* <SalaryReport/>

<TripHistory/> */}
        <Routes>

          <Route path="/" element={<LoginPage/>} />

          <Route path="/trip" element={<ProtectedRoute><TripPage /></ProtectedRoute>} />
          <Route path="/salary" element={<ProtectedRoute><SalaryPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><TripHistory/></ProtectedRoute>} />
          <Route path="/salary-report" element={<ProtectedRoute><SalaryReport/></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute><ExpensePage/></ProtectedRoute>} />
          <Route path="/expense-history" element={<ProtectedRoute><ExpenseHistory/></ProtectedRoute>} />
          <Route path="/add-labour" element={<ProtectedRoute><AddLabourPage/></ProtectedRoute>} />
          <Route path="/add-vehicle" element={<ProtectedRoute><AddVehiclePage/></ProtectedRoute>} />
          <Route path="/labours" element={<ProtectedRoute><LabourListPage/></ProtectedRoute>} />
          <Route path="/edit-labour/:id" element={<ProtectedRoute><EditLabourPage/></ProtectedRoute>} />
          {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
