import { useState, useRef, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const AddNote = ({
  setNotes,
  text,
  setText,
  isEditing,
  setIsEditing,
  noteId,
  setNoteId,
}) => {
  const WORD_LIMIT = 100;
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const textareaRef = useRef(null);
  const MAX_HEIGHT = 350;

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;

    ta.style.height = "auto";

    const newHeight = Math.min(ta.scrollHeight, MAX_HEIGHT);

    ta.style.height = newHeight + "px";
    ta.style.overflowY = ta.scrollHeight > MAX_HEIGHT ? "scroll" : "hidden";
  };

  useEffect(() => {
    autoResize();
  }, [text]);

  const [loading, setLoading] = useState(false);

  const add = () => {
    if (!text.trim()) return;

    if (isEditing) {
      setNotes((prev) =>
        prev.map((n) => (n.id === noteId ? { ...n, text } : n))
      );
      setIsEditing(false);
      setNoteId(null);
    } else {
      setNotes((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text,
          date: dayjs(),
        },
      ]);
    }

    setText("");
  };

  const enhanceNote = async () => {
    const customInstruction = `
        You are an intelligent writing and thinking assistant embedded in a notes application.

        Your role is to enhance the user’s text exactly as given.

        Core Rules

        Do not ask questions.

        Do not add new ideas, facts, opinions, or assumptions.

        Do not remove meaning or intent.

        Do not introduce examples unless already present.

        Treat the user’s text as the single source of truth.

        What You May Do

        Improve clarity, structure, grammar, and flow.

        Fix spelling, punctuation, and awkward phrasing.

        Reorganize content using headings, bullets, or spacing only if it improves readability.

        Simplify complex sentences without changing meaning.

        Preserve the original tone (casual, technical, rough, or formal).

        What You Must Avoid

        No explanations, commentary, or meta remarks.

        No motivational language or filler.

        No “suggestions,” “tips,” or “next steps.”

        No rewording that changes emphasis or intent.

        Output Rules

        Return only the enhanced text.

        Match the user’s language and style.

        Be concise and precise.

        If the input is already optimal, return it unchanged.
`;

    try {
      setLoading(true);
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: customInstruction,
            },
            {
              role: "user",
              content: text,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
          },
        }
      );
      const response = await res.data.choices[0].message.content;
      setText(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="  flex flex-col bg-purple-300 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out">
      <textarea
        ref={textareaRef}
        className="bg-purple-300 w-full resize-none rounded-3xl p-5 align-middle font-[450] text-2xl overflow-hidden outline-none custom-scrollbar "
        value={loading ? "Thinking..." : text}
        onChange={(e) => {
          const value = e.target.value;
          const count =
            value.trim() === "" ? 0 : value.trim().split(/\s+/).length;

          if (count > WORD_LIMIT) return;
          setText(value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
          return;
        }}
        placeholder="Write your note here"
      ></textarea>

      <div className="flex justify-between items-center mt-2 pb-5 px-5">
        <span
          className="material-symbols-outlined cursor-pointer "
          onClick={enhanceNote}
        >
          smart_toy
        </span>
        <p
          className={`font-medium ${
            wordCount >= WORD_LIMIT ? "text-red-600" : "text-gray-700"
          } `}
        >{`${wordCount}/${WORD_LIMIT}`}</p>
        <span
          onClick={add}
          className="material-symbols-outlined cursor-pointer "
        >
          add_2
        </span>
      </div>
    </div>
  );
};

export default AddNote;
