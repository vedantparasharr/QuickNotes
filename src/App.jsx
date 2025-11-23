import { useState } from 'react'
import './App.css'
import Note from './components/Note'
import AddNote from './components/AddNote'

function App() {

  const [notes, setNotes] = useState([])
  
  return (
    <main className='min-h-screen bg-white p-5' >
      <h1 className='font-semibold text-6xl mx-12'>Quick Notes</h1>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5 mx-12 my-10'>
        <Note notes={notes} />
        <AddNote notes={notes} setNotes={setNotes} />
      </div>
    </main>
  )
}

export default App
