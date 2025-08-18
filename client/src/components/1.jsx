import React, { useState, useEffect } from "react";
import logoPic from "../assets/image.png";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const token = localStorage.getItem("token");
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // debounce effect
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.trim()) {
        fetchSearchResults(query);
      } else {
        setResults([]);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [query]);

  const fetchSearchResults = async (search) => {
    try {
      const res = await axios.get(`/api/products?search=${search}`);
      setResults(res.data);
      setShowDropdown(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSelectProduct = (id) => {
    setQuery("");
    setShowDropdown(false);
    navigate(`/productDescription/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowDropdown(false);
    navigate(`/products?search=${query}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full
        bg-gradient-to-r from-purple-900 via-pink-500 to-red-500
        bg-[length:200%_200%] animate-gradient-shift
        shadow-xl h-16 flex items-center px-8 z-50 border-b-4 border-pink-400"
    >
      <div className="container mx-auto flex justify-between items-center space-x-6">
        {/* Logo */}
        <a href="/Dashboard" className="text-2xl font-extrabold text-white">
          Cart-A-Zon
        </a>

        {/* Search Bar */}
        <div className="relative w-48 sm:w-64 md:w-80 lg:w-96">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-lg shadow-md px-3 py-1"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowDropdown(true)}
              placeholder="Search for products, brands and more.."
              className="flex-grow focus:outline-none px-3 py-2 text-sm sm:text-base"
            />
            <button type="submit">
              <MagnifyingGlassIcon className="h-5 w-5 sm:h-6 text-gray-500" />
            </button>
          </form>

          {/* Suggestions Dropdown */}
          {showDropdown && results.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 z- max-h-64 overflow-y-auto">
              {results.map((prod) => (
                <li
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod.id)}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <div className="font-medium">{prod.name}</div>
                  <div className="text-sm text-gray-500 truncate">
                    {prod.description}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ...rest of your navbar unchanged */}
      </div>
    </nav>
  );
};

export default Navbar;
