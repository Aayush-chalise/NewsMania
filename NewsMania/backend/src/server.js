import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import verifyToken from "./middleware/middleware.js";
import fetchfeed from "./routes/fetchfeed.js";

const app = express();
app.use(cors()); // Allows React frontend to talk backend
app.use(express.json()); // Parses incoming JSON requests
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is configured");
});
app.use("/auth", authRoutes);
app.use("/notes", verifyToken, noteRoutes);
app.use("/fetch-feed", fetchfeed);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
