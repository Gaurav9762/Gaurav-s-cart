import React, { useState } from "react";
import Navbar from "../components/NavBar";
import Login from "./Login";
const Dashboard = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <Navbar></Navbar>
      <div className="pt-16 justify-center flex items-center min-h-screen">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
      </div>
    </>
  );
};

export default Dashboard;
