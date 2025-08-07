import React, { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  useEffect(() => {
    axios
      .get("/api/products")
      .then((res) => {
        console.log("API response:", res.data);
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return (
    <>
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
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white hover:bg-gray-100 hover:scale-105 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 flex flex-col items-center p-4 min-h-[350px] w-full"
              >
                <img
                  src={`/Product_Images/${product.image}`}
                  alt={product.name}
                  onClick={() => navigate(`/productDescription/${product.id}`)} // 👈 move click here
                  className="w-full h-60 object-cover rounded-lg mb-4 cursor-pointer"
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
                  onClick={() => addToCart(product)}
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
