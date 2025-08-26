import React, { useState, useEffect } from "react";
import socket from "../socket";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chat message");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() === "") return;
    socket.emit("chat message", input);
    setInput("");
  };

  return (
    <div className="flex flex-col w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto bg-white rounded-lg shadow-lg h-[80vh] sm:h-[400px]">
      <div
        className="bg-gradient-to-r from-purple-900 via-pink-500 to-red-500
    bg-[length:200%_200%] animate-gradient-shift text-white text-xl font-semibold p-4 rounded-t-lg"
      >
        Live Customer Support Chat
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">No messages yet</p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded shadow text-gray-800 max-w-[75%] break-words"
          >
            {msg}
          </div>
        ))}
      </div>

      <div className="p-4 flex gap-2 border-t border-gray-300 bg-white rounded-b-lg">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage() : null)}
        />
        <button
          onClick={sendMessage}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
