

//import {useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TripPage from "./pages/TripPage";
import SalaryPage from "./pages/SalaryPage";
import DashboardPage from "./pages/DashboardPage";
//import TripHistory from "./TripHistory";
import SalaryReport from "./SalaryReport";
import LoginPage from "./LoginPage";
import ProtectedRoute from "./ProtectedRoute";
import ExpensePage from "./pages/ExpensePage";
import ExpenseHistory from "./pages/ExpenseHistory";
import AddLabourPage from "./pages/AddLabourPage";
import AddVehiclePage from "./pages/AddVehiclePage";
import LabourListPage from "./pages/LabourListPage";
import EditLabourPage from "./pages/EditLabourPage";
import HistoryPage from "./pages/HistoryPage";

import LabourSalaryPage from "./pages/LabourSalaryPage";
import LabourExpensePage from "./pages/LabourExpensePage";
import logo from "./assets/logo.png";

function App() {

    

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
      

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Coconut Management System</h1>
      {/*  <nav style={{ marginBottom: "20px" }}>
          <Link to="/trip" style={{ marginRight: "15px" }}>Trip</Link>
          <Link to="/salary" style={{ marginRight: "15px" }}>Salary</Link>
          <Link to="/dashboard" style={{ marginRight: "15px" }}>Dashboard</Link>
          <Link to="/expense" style={{ marginRight: "15px" }}>Expense</Link>
          <Link to="/expense-history" style={{ marginRight: "15px" }}>Expense History</Link>
          <Link to="/add-labour" style={{ marginRight: "15px" }}>Add Labour</Link>
          <Link to="/add-vehicle" style={{ marginRight: "15px" }}>Add Vehicle</Link>
          <Link to="/history" style={{ marginRight: "15px" }}>Trip History</Link>
          <Link to="/labours">Labours</Link>

          </nav>   */}
        {token && (
          
  <div>
            
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 shadow">
  <div className="container-fluid d-flex justify-content-between">

    {/* 🔥 LOGO + TITLE */}
    <div className="d-flex align-items-center">
      <img 
        src={logo} 
        alt="logo" 
        width="45" 
        height="45" 
        className="me-2 rounded-circle border border-light"
      />
      <span className="fs-5 fw-bold text-white">🌴 Coconut System</span>
    </div>

    {/* 🔥 RIGHT SIDE MENU */}
    <div className="d-flex align-items-center gap-2">

      {role === "ADMIN" && (
        <div>
          <Link className="btn btn-outline-light btn-sm" to="/dashboard">Dashboard</Link>
          <Link className="btn btn-outline-light btn-sm" to="/trip">Trip</Link>
          <Link className="btn btn-outline-light btn-sm" to="/salary">Salary</Link>
          <Link className="btn btn-outline-light btn-sm" to="/expense">Expense</Link>
          <Link className="btn btn-outline-light btn-sm" to="/expense-history">History</Link>
          <Link className="btn btn-outline-light btn-sm" to="/labours">Labours</Link>
        </div>
      )}

      {role === "LABOUR" && (
        <div>
          <Link className="btn btn-outline-light btn-sm" to="/my-salary">My Salary</Link>
          <Link className="btn btn-outline-light btn-sm" to="/my-expense">My Expense</Link>
        </div>
      )}

      {/* 🔥 LOGOUT */}
      <button
        className="btn btn-danger btn-sm ms-2"
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>
  </div>
</nav>
          
        
       
  

  
</div>
      )}

  <Routes>

 

          <Route path="/" element={<LoginPage/>} />

          <Route path="/trip" element={<ProtectedRoute allowedRole="ADMIN"><TripPage /></ProtectedRoute>} />
          <Route path="/salary" element={<ProtectedRoute allowedRole="ADMIN"><SalaryPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute allowedRole="ADMIN"><DashboardPage/></ProtectedRoute>} />
         <Route path="/history" element={<ProtectedRoute allowedRole="ADMIN"><HistoryPage/></ProtectedRoute>} />
          <Route path="/salary-report" element={<ProtectedRoute allowedRole="ADMIN"><SalaryReport/></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute allowedRole="ADMIN"><ExpensePage/></ProtectedRoute>} />
          <Route path="/expense-history" element={<ProtectedRoute allowedRole="ADMIN"><ExpenseHistory/></ProtectedRoute>} />
          <Route path="/add-labour" element={<ProtectedRoute allowedRole="ADMIN"><AddLabourPage/></ProtectedRoute>} />
          <Route path="/add-vehicle" element={<ProtectedRoute allowedRole="ADMIN"><AddVehiclePage/></ProtectedRoute>} />
          <Route path="/labours" element={<ProtectedRoute allowedRole="ADMIN"><LabourListPage/></ProtectedRoute>} />
          <Route path="/edit-labour/:id" element={<ProtectedRoute allowedRole="ADMIN"><EditLabourPage/></ProtectedRoute>} />
        {/* <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>} /> */}
            <Route path="/my-salary" element={<ProtectedRoute allowedRole="LABOUR"><LabourSalaryPage/></ProtectedRoute>} />
            <Route path="/my-expense" element={<ProtectedRoute allowedRole="LABOUR"><LabourExpensePage/></ProtectedRoute>} />
        </Routes>
   
      </div>

    </Router>
  );
}

export default App;


 

 

















