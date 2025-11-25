import express from "express";
import cors from "cors";
import "dotenv/config";
import { aiComplete } from "./api/complete.js";

const app = express();
app.use(cors());
app.use(express.json());

// AI Route
app.post("/api/complete", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await aiComplete(text);
    return res.json(result);
  } catch (err) {
    console.error(err.response?.data || err);
    return res.status(500).json({ error: "AI request failed" });
  }
});

// Test route for browser
app.get("/", (req, res) => {
  res.send("QuickNotes API is running!");
});

// IMPORTANT for Render: must use dynamic port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
