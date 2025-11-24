import { useState } from "react"
import axios from "axios";
import { OpenRouter } from "@openrouter/sdk";

const AddNote = ({ setNotes }) => {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const add = () => {
        setNotes(prev => [...prev, text]);
        setText('')
    }

    const ai = async () => {
        if (!text.trim()) return;
        setLoading(true);

        try {
            const res = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: "gpt-4o-mini", // free/cheap model
                    messages: [
                        {
                            role: "system",
                            content:
                                "Rewrite this text to sound more natural and improved. Return ONLY the improved text. No explanations, no extra words."
                        },
                        {
                            role: "user",
                            content: text
                        }
                    ]
                },
                {
                    headers: {
                        "Authorization": `Bearer ${import.meta.env.VITE_API_KEY}`,
                        "HTTP-Referer": "http://localhost:5173",
                        "Content-Type": "application/json"
                    }
                }
            );

            const improved = res.data.choices?.[0]?.message?.content || text;
            setText(improved);

        } catch (err) {
            console.error("AI Error:", err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='  flex flex-col bg-purple-300 max-h-56 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out' >
            <textarea
                className='bg-purple-300 h-full w-full resize-none rounded-3xl p-5 align-middle font-[450] text-2xl overflow-hidden'
                value={loading ? 'Thinking...' : text}
                onChange={((e) => setText(e.target.value))}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        add()
                    }
                    return;
                }}
                placeholder='Write your note here' ></textarea>

            <div className='flex justify-between items-center mt-2 pb-5 px-5' >
                <span className="material-symbols-outlined cursor-pointer " onClick={ai} >
                    smart_toy
                </span>
                <span onClick={add} className="material-symbols-outlined cursor-pointer ">
                    add_2
                </span>
            </div>
        </div>
    )
}

export default AddNote