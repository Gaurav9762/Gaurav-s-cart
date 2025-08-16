import React, { useState, useEffect } from "react";

const ProductFilterBar = ({ onFilterChange }) => {
  // Why useState? → useState allows us to store and update component-specific data (form values) without reloading.
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    handleFilterChange();
  }, [category, minPrice, maxPrice, sortOrder]);

  // Whenever any filter changes, we call the parent's callback
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
    <div className="fixed top-16 left-0 w-full bg-white shadow-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap gap-4 items-center justify-between">
        {/* Category Filter */}
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
        {/* Price Range Filter */}
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
        {/* Sort Dropdown */}
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
        ;{/* Reset Filters Button */}
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
