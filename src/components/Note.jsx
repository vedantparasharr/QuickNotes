import dayjs from "dayjs";

const Note = ({ notes }) => {

    const date = dayjs().format('MMM D, YYYY')

    if (!notes) return null;

    return notes.map((note) => {
        return (
            <div key={crypto.randomUUID()} className='flex flex-col bg-orange-300 max-h-56 p-5 rounded-3xl shadow-2xl transition-all duration-300 ease-in-out hover:max-h-screen overflow-hidden'>
                <p className='align-middle font-[450] text-2xl overflow-hidden h-full ' >
                    {note}
                </p>
                <div className='flex justify-between items-center mt-2 ' >
                    <p className='align-middle font-medium text-1xl' >{date}</p>
                    <div className="flex gap-2">
                        <span className="material-symbols-outlined">
                        edit
                    </span>
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                    </div>
                </div>
            </div>)
    })
}

export default Note