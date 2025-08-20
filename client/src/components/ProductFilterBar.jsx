import React, { useState, useEffect } from "react";

const ProductFilterBar = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    handleFilterChange();
  }, [category, minPrice, maxPrice, sortOrder]);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFilterChange = () => {
    onFilterChange({ category, minPrice, maxPrice, sortOrder });
  };

  const handleReset = () => {
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSortOrder("");
    onFilterChange({ category: "", minPrice: "", maxPrice: "", sortOrder: "" });
  };

  return (
    <div
      className={`fixed top-16 left-0 w-full bg-white shadow-md border-b border-gray-200 z-30 transform transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange();
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">All Categories</option>
          <option value="clothing">Clothing</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home & Living</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => {
              setMinPrice(e.target.value);
              handleFilterChange();
            }}
            placeholder="Min Price"
            className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <span className="text-gray-500">-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              handleFilterChange();
            }}
            placeholder="Max Price"
            className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select
          value={sortOrder}
          onChange={(e) => {
            const newSort = e.target.value;
            setSortOrder(newSort);
            onFilterChange({
              category,
              minPrice,
              maxPrice,
              sortOrder: newSort,
            });
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="newest">Newest Arrivals</option>
        </select>

        <button
          onClick={handleReset}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ProductFilterBar;
