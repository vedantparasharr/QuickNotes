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
        console.log(note.date)
        return (
            <div key={note.id} className='flex flex-col bg-orange-300 max-h-56 p-5 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out hover:max-h-screen overflow-hidden'>
                <p className='align-middle font-[450] text-2xl overflow-hidden h-full ' >
                    {note.text}
                </p>
                <div className='flex justify-between items-center mt-2 ' >
                    <p className='align-middle font-medium text-1xl' >{dayjs(note.date).format('MMM D, YYYY')}</p>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined cursor-pointer"
                                onClick={() => {
                                    edit(note.id)
                                } } 
                                >
                            edit
                        </span>
                        <span
                            className="material-symbols-outlined cursor-pointer "
                            onClick={() => {
                                remove(note.id)
                            }}
                        >
                            delete
                        </span>
                    </div>
                </div>
            </div>)
    })
}

export default Note