const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    io.emit("chat message", `User: ${msg}`);

    let response = "Sorry, I didn't understand that.";

    if (msg.toLowerCase().includes("hello")) {
      response = "Hi there! How can I help you today?";
    } else if (msg.toLowerCase().includes("price")) {
      response =
        "Our prices vary depending on the product. What are you interested in?";
    } else if (msg.toLowerCase().includes("shipping")) {
      response = "We offer free shipping on orders over $50!";
    }

    socket.emit("chat message", "Bot: " + response);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});
