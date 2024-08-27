// app.js
const express = require("express");
const cors = require("cors");
const router = require("./config/routes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Use routes from routers.js
app.use("/api", router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
