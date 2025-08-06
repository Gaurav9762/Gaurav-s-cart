import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";

import "./index.css";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import ProductList from "./pages/ProductListing";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductDescription from "./pages/ProductDescription";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/products" element={<ProductList />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/productDescription/:productId"
        element={<ProductDescription />}
      />
    </Routes>
  </Router>
);
