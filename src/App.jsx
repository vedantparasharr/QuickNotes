import { useState } from 'react'
import './App.css'
import Note from './components/Note'
import AddNote from './components/AddNote'
import { useEffect } from 'react'

function App() {

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("quicknotes-data");
      return saved ? JSON.parse(saved) : [];
    } catch {
      console.error("Invalid saved notes");
      return [];
    }
  });

  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [noteId, setNoteId] = useState(null);

  useEffect(() => {
    localStorage.setItem("quicknotes-data", JSON.stringify(notes));
  }, [notes]);


  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f6f5ff] to-[#e7e6ff] p-5">
      <h1 className="font-semibold text-center text-5xl mx-12 mb-5">Quick Notes</h1>

      <div className="max-w-3xl mx-auto mb-10 px-2">
        <AddNote
          setNotes={setNotes}
          text={text}
          setText={setText}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          noteId={noteId}
          setNoteId={setNoteId}
        />
      </div>

      <div className="columns-1 md:columns-4 gap-5 mx-2 md:mx-12">
        <Note
          notes={notes}
          setNotes={setNotes}
          setText={setText}
          setIsEditing={setIsEditing}
          setNoteId={setNoteId}
        />
      </div>
    </main>

  )
}

export default App
