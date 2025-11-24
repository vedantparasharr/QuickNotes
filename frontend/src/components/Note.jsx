import dayjs from "dayjs";

const Note = ({ notes, setNotes, setText, setIsEditing, setNoteId }) => {


    const remove = (id) => {
        setNotes(prev => prev.filter(n => n.id != id))
    }

    const edit = (id) => {
        const note = notes.find(n => n.id === id)
        setText(note.text)
        setIsEditing(true)
        setNoteId(id)
    }

    if (!notes) return null;

    return notes.map((note) => {
        return (
            <div
                key={note.id}
                className="
                bg-gradient-to-br from-orange-200 to-orange-300
                p-5 mb-5 rounded-2xl shadow-md 
                transition-all duration-300 
                hover:shadow-xl hover:-translate-y-1
                animate-fadeIn
                h-auto
                break-inside-avoid

            "
            >
                <p className="font-medium text-xl text-gray-900 break-words max-h-52 overflow-y-auto custom-scrollbar">
                    {note.text}
                </p>

                <div className="flex justify-between items-center mt-3">
                    <p className="text-sm text-gray-700">
                        {dayjs(note.date).format('MMM D, YYYY')}
                    </p>

                    <div className="flex gap-3">
                        <span
                            className="material-symbols-outlined cursor-pointer hover:text-blue-600 transition"
                            onClick={() => edit(note.id)}
                        >
                            edit
                        </span>

                        <span
                            className="material-symbols-outlined cursor-pointer hover:text-red-600 transition"
                            onClick={() => remove(note.id)}
                        >
                            delete
                        </span>
                    </div>
                </div>
            </div>
        );
    });

}

export default Note