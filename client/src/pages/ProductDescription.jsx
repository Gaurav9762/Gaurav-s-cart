import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductDescription = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/products/getSingleProduct/${productId}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [productId]);

  return (
    <>
      {product ? (
        <div className="pt-24 p-8 flex flex-col lg:flex-row gap-10">
          <img
            src={`/Product_Images/${product.image}`}
            alt={product.name}
            className="w-full max-w-md h-auto object-cover rounded-lg hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h1 className="text-3xl font-bold text-pink-700">{product.name}</h1>
            <p className="text-lg text-gray-700 my-4">{product.description}</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">
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
              className="bg-gradient-to-r from-pink-600 to-red-500 text-white px-6 py-2 rounded-lg hover:from-pink-500 hover:to-red-400 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">Loading...</p>
      )}
    </>
  );
};

export default ProductDescription;
