import React from "react";

const Button = ({ type, text }) => (
  <button
    type={type}
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
  >
    {text}
  </button>
);

export default Button;
