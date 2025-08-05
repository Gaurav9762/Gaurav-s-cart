import React, { useState } from "react";
import logoPic from "../assets/image.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 w-full
        bg-gradient-to-r from-purple-900 via-pink-500 to-red-500
        bg-[length:200%_200%] animate-gradient-shift
        shadow-xl h-16 flex items-center px-8 z-50 border-b-4 border-pink-400
      "
    >
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="/Dashboard"
          className="text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition p-2 rounded-full"
        >
          <span className="flex items-center space-x-2">
            {/* <img src={logoPic} alt="My company logo" className="h-10" /> */}
            <span className="text-white">Cart-A-Zon</span>
          </span>
        </a>

        {/* Hamburger Icon */}
        <button
          className="md:hidden text-white hover:text-pink-200 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Nav Links + Login/Logout */}
        <ul
          className={`md:flex md:items-center md:space-x-8 absolute md:static w-1/2 md:w-auto right-0 md:left-auto shadow-lg top-16 md:top-auto transition-all duration-300 ease-in bg-gradient-to-r from-purple-800 via-pink-600 to-red-600 ${
            isOpen ? "flex flex-col space-y-2 px-6 py-4" : "hidden"
          }`}
        >
          {["Home", "About", "Services", "Contact"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="block px-2 py-1 text-white hover:text-pink-300 hover:underline right:0transition font-medium"
              >
                {item}
              </a>
            </li>
          ))}

          <li className="md:px-0 w-full md:w-auto">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-white text-red-600 font-semibold px-4 py-2 rounded hover:bg-red-100 transition w-full md:w-auto"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => (window.location.href = "/login")}
                className="bg-white text-purple-700 font-semibold px-4 py-2 rounded hover:bg-purple-100 transition w-full md:w-auto text-center"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
