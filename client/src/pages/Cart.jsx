import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const navigate = useNavigate();
  return (
    <div className="pt-20 px-4 max-w-full sm:max-w-xl md:max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 items-center text-center text-gray-800">
        Shopping Cart
      </h2>
      {console.log("cart items", cartItems)}
      {cartItems.length === 0 ? (
        <div className="text-gray-600 items-center pt-20 text-center text-xl ">
          Your cart is empty.{" "}
          <Link to="/products" className="text-blue-500 underline">
            Go shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-6">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border px-3 py-2 rounded-lg shadow-md"
            >
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-base">{item.name}</h3>
                  <p className="text-gray-500 text-sm">₹{item.price}</p>
                  <div className="flex items-center mt-1 space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right mt-3 sm:mt-0 w-full sm:w-auto">
                <p className="text-gray-700 font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-400 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="text-right mt-4 sm:mt-0">
            <h3 className="text-xl font-semibold">
              Total: ₹{getTotalPrice().toFixed(2)}
            </h3>
            <button
              className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500"
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
