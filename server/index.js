const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

// Routes
const captionRoutes = require("./routes/captionroutes"); // ✅ path is correct if captionroutes.js is inside server/routes

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use((req, res, next) => {
  console.log("Incoming content-type:", req.headers['content-type']);
  next();
});

app.use("/api", captionRoutes); // ✅ ensures POST to /api/caption works
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
