import axios from "axios";
import "dotenv/config";

export async function aiComplete(text) {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "openai/gpt-4o-mini",
      messages: [
        {
          role: "system", content: `You are a concise text-improver for a notes application.

                  Your task: rewrite the user’s text so it becomes clearer, smoother, and more natural while keeping the original meaning fully intact.

                  Rules:
                  • Return only the improved text.
                  • No greetings, no explanations, no commentary.
                  • No extra details or additions.
                  • Maintain the user’s structure unless improvement requires slight adjustment.
                  • Never ask questions. Never include prompts like “let me know”.
                  • If the text is already good, lightly polish it.
                  ` },
        { role: "user", content: text }
      ]
    },
    {
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_KEY}`,
        "HTTP-Referer": process.env.SITE_URL,
        "X-Title": "QuickNotes",
        "Content-Type": "application/json"
      }
    }
  );

  return res.data;
}
