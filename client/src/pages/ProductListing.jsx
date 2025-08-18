import React, { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductFilterBar from "../components/ProductFilterBar";
import NotificationPopup from "./NotificationPopup";

const ProductList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortOrder: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/products?search=${searchQuery}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [searchQuery]);
  const getFilteredProducts = () => {
    let updatedProducts = [...products];

    // Category filter
    if (filters.category) {
      updatedProducts = updatedProducts.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    //worked on main for category logic commit before reating new branch

    // Price filter
    if (filters.minPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => p.price >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      updatedProducts = updatedProducts.filter(
        (p) => p.price <= Number(filters.maxPrice)
      );
    }

    // Sorting
    console.log("Object.values(inventory)", filters.sortOrder);

    if (filters.sortOrder === "priceLowHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (filters.sortOrder === "priceHighLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    } else if (filters.sortOrder === "newest") {
      updatedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return updatedProducts;
  };
  console.log("products", products);
  return (
    <>
      {/* {showNotification && (
        <NotificationPopup onClose={() => setShowNotification(false)} />
      )} */}

      <ProductFilterBar onFilterChange={setFilters} />
      <div className="pt-24 px-6 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 min-h-screen">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 text-center tracking-tight">
          Product List
        </h2>

        {loading ? (
          <div
            className="flex items-center justify-center"
            style={{ minHeight: "60vh" }}
          >
            <ClipLoader color="#ec4899" size={50} />
          </div>
        ) : Array.isArray(products) && products.length > 0 ? (
          <div className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {getFilteredProducts().map((product) => (
              <div
                key={product.id}
                className="bg-white hover:bg-gray-100 hover:scale-105 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center p-4 min-h-[350px] w-full"
              >
                <img
                  src={`/Product_Images/${product.image}`}
                  alt={product.name}
                  onClick={() => navigate(`/productDescription/${product.id}`)}
                  className="w-full h-60 object-cover rounded-lg mb-4 cursor-pointer"
                  loading="eager"
                />
                <h3
                  className="text-lg font-semibold text-pink-700 mb-2 text-center cursor-pointer"
                  onClick={() => navigate(`/productDescription/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-gray-800 font-bold mb-4 text-center">
                  ₹{product.price}
                </p>
                <button
                  onClick={() => {
                    addToCart({
                      ...product,
                      image: `/Product_Images/${product.image}`,
                    });
                    navigate("/cart");
                  }}
                  className="mt-auto bg-gradient-to-r from-pink-600 to-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:from-pink-500 hover:to-red-400 transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-center w-full">
            No products found.
          </p>
        )}
      </div>
    </>
  );
};

export default ProductList;
