import { useState } from "react"
import axios from "axios"
import dayjs from "dayjs";

const AddNote = ({ setNotes }) => {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const add = () => {
        if (!text.trim()) return;

        setNotes(prev => [...prev, {
            id: crypto.randomUUID(),
            text,
            date: dayjs()
        }]);
        setText('')
    }

    const ai = async () => {
        try {
            setLoading(true);

            const res = await axios.post("http://localhost:3000/api/complete", {
                text
            });

            const improved = res.data.choices[0].message.content;
            setText(improved);

        } catch (err) {
            console.error(err);
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