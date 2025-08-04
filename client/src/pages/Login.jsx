import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login successful:", data);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        console.error("Login failed:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="
    w-full
    bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 
    text-white 
    font-semibold
    py-3
    rounded-lg
    shadow-lg
    hover:from-purple-800 hover:via-pink-700 hover:to-red-700
    transition-colors
    duration-300
    focus:outline-none
    focus:ring-4 focus:ring-pink-500/40
  "
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
