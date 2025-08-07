import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-gray-600">
            Your cart is empty.{" "}
            <Link to="/" className="text-blue-500 underline">
              Go shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500">${item.price}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-400"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="text-right mt-6">
              <h3 className="text-xl font-semibold">
                Total: ${getTotalPrice()}
              </h3>
              <button className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-500">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
