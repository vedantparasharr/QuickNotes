import { useState } from "react"
import axios from "axios";

const AddNote = ({ setNotes }) => {

    const [text, setText] = useState("");

    const add = () => {
        setNotes(prev => [...prev, text]);
        setText('')
    }

    const ai = async () => {
        if (!text.trim()) return;

        try {
            const res = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_API_KEY}`,
                {
                    contents: [
                        {
                            parts: [{
                                text: `Rewrite the following note to sound more natural, smooth, and well-phrased.
                                        Do not add explanations. 
                                        Do not add extra details. 
                                        Do not give options. 
                                        Do not comment. 
                                        Return ONLY the improved note text.

                        "${text}"

                    ` }]
                        }
                    ]
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            const enhanced =
                res.data?.candidates?.[0]?.content?.parts?.[0]?.text || text;

            setText(enhanced);
        } catch (err) {
            console.error("AI Error:", err);
        }
    };

    return (
        <div className='  flex flex-col bg-purple-300 max-h-56 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out' >
            <textarea
                className='bg-purple-300 h-full w-full resize-none rounded-3xl p-5 align-middle font-[450] text-2xl overflow-hidden'
                value={text}
                onChange={((e) => setText(e.target.value))}
                onKeyDown={(e) => {
                    e.key === 'Enter' && add();
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