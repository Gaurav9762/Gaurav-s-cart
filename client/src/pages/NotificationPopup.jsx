import React from "react";

const NotificationPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 ">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold text-2xl focus:outline-none"
          aria-label="Close notification"
        >
          &times;
        </button>

        {/* Content */}
        <h2 className="text-xl font-bold mb-2 text-pink-600">
          Special Sale Offer!
        </h2>
        <p className="text-gray-700">
          Get up to 50% off on selected products today. Don’t miss out!
        </p>
      </div>
    </div>
  );
};

export default NotificationPopup;
