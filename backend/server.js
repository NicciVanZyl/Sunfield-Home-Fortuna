require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { getPool } = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const donationRoutes = require("./routes/donationRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const app = express();

//allows the frontend static web app to make calls from the backend
app.use(
  cors({
    origin: (process.env.CLIENT_URL || "").split(",").map((s) => s.trim()),
  }),
);
app.use(express.json());

//routes that will be used
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/wishlist", wishlistRoutes);

//error handling middleware
app.use(notFound);
app.use(errorHandler);

//open the server connection
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  getPool().catch((err) =>
    console.error("Initial DB connection failed:", err.message),
  );
});
