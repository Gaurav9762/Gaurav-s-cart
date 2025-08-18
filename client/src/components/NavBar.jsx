import React, { useEffect, useState, useRef } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const { cartItems } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const searchRef = useRef();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchResults = async () => {
        if (!searchQuery.trim()) {
          setSearchResults([]);
          setShowDropdown(false);
          return;
        }
        try {
          const res = await axios.get(`/api/products?search=${searchQuery}`);
          setSearchResults(res.data);
          setShowDropdown(true);
        } catch (err) {
          console.error(err);
        }
      };
      fetchResults();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleSelectProduct = (id) => {
    setSearchQuery("");
    setShowDropdown(false);
    navigate(`/productDescription/${id}`);
  };

  useEffect(() => {
    const onClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 w-full
        bg-gradient-to-r from-purple-900 via-pink-500 to-red-500
        bg-[length:200%_200%] animate-gradient-shift
        shadow-xl h-16 flex items-center px-8 z-50 border-b-4 border-pink-400
      "
    >
      <div className="container mx-auto flex justify-between items-center space-x-6">
        <a
          href="/Dashboard"
          className="text-2xl sm:text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 transition p-2 rounded-full whitespace-nowrap"
        >
          <span className="flex items-center space-x-2 text-white">
            Cart-A-Zon
          </span>
        </a>
        <div
          ref={searchRef}
          className="relative w-full max-w-[12rem] sm:max-w-[14rem] md:max-w-[16rem] lg:max-w-[18rem]"
        >
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-lg shadow-md px-3 py-1 w-full"
          >
            <input
              type="text"
              placeholder="Search for products, brands and more.."
              className="flex-grow placeholder-gray-400 text-gray-700 focus:outline-none px-3 py-2 text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
            />
            <button
              type="submit"
              aria-label="Search"
              className="ml-2 flex-shrink-0"
            >
              <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 text-gray-700 cursor-pointer" />
            </button>
          </form>
          {showDropdown && searchResults.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z-50 max-h-64 overflow-y-auto">
              {searchResults.map((prod) => (
                <li
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod.id)}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={`/Product_Images/${prod.image}`}
                    alt={prod.name}
                    className="w-14 h-14 object-contain rounded"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="font-medium truncate">{prod.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {prod.description}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
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
        <ul
          className={`md:flex md:items-center md:space-x-8 absolute md:static w-1/2 md:w-auto right-0 md:left-auto shadow-lg top-16 md:top-auto transition-all duration-300 ease-in bg-gradient-to-r from-purple-800 via-pink-600 to-red-600 ${
            isOpen ? "flex flex-col space-y-2 px-6 py-4" : "hidden"
          }`}
        >
          {["Home", "About"].map((item) => (
            <li key={item}>
              <a
                href="/products"
                className="block px-1 py-1 pl-5 text-white hover:text-pink-300 hover:underline transition font-medium"
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
        <div className="relative ml-4">
          <Link
            to="/cart"
            className="text-white text-3xl hover:text-pink-200 transition"
            title="View Cart"
          >
            🛒
          </Link>
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
