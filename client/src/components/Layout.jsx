import React from "react";
import Navbar from "./NavBar";
import Footer from "./Footer";
// import Footer from "./components/Footer"; // create Footer component or remove if you don’t have one

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-120px)]">
        {" "}
        {/* optional styling */}
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
