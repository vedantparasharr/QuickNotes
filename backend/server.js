import express from "express";
import cors from "cors";
import "dotenv/config";
import { aiComplete } from "./api/complete.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/complete", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await aiComplete(text);
    res.json(result);
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "AI request failed" });
  }
});
console.log("Backend loaded key:", process.env.OPENROUTER_KEY);

app.listen(3000, () => console.log("Backend running at http://localhost:3000"));
