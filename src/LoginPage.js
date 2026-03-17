import { useState } from "react";
import { useEffect } from "react";
//import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "./api";

function LoginPage({ onLogin }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = () => {

    console.log("FULL URL:", api.defaults.baseURL + "/login");
    // axios.post("http://localhost:8080/login", {
      api.post("/login", {
      username: username,
      password: password
    })
    .then(res => {
      alert("Login Success");
      localStorage.setItem("token", JSON.stringify(res.data));
      
      navigate("/dashboard")

    })
    .catch(err => {
      alert("Invalid Credentials");
      console.log(err);
    });
  };

  return (
    <div style={{ padding: "50px" }}>
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginPage;
