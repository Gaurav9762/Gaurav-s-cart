import React, { useState } from "react";
import Chat from "./Chat";

const ChatSupportWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-gradient-to-r from-purple-900 via-pink-500 to-red-500
        bg-[length:200%_200%] animate-gradient-shift text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none z-50"
        aria-label="Toggle chat support"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-3 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span
          className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                     invisible group-hover:visible opacity-0 group-hover:opacity-100
                     bg-gray-800 text-white text-xs rounded py-1 px-2
                     whitespace-nowrap transition-opacity duration-300"
        >
          Chat Support
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 z-50">
          <Chat />
        </div>
      )}
    </>
  );
};

export default ChatSupportWrapper;
