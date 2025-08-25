import React from "react";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, getTotalPrice } = useCart();

  return (
    <div className="pt-20 px-4 max-w-full sm:max-w-xl md:max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Checkout
      </h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between border-b py-2 text-gray-700"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <span>
                {item.name} x {item.quantity}
              </span>
            </div>

            <div>₹{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
        <div className="text-right font-bold mt-4">
          Total: ₹{getTotalPrice().toFixed(2)}
        </div>
      </div>

      <div className=" flex mt-8 justify-center items-center ">
        <button className=" bg-green-600 w-1/2 text-white px-6 py-2 rounded hover:bg-green-500">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
