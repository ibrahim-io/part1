import { useState, useEffect } from 'react';
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note ...")
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const notesToShow = showAll ? notes : notes.filter(note => note.important)
  useEffect(() => noteService.getAll().then(
    initialNotes => setNotes(initialNotes)
  ),[])
  

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}
    console.log(changedNote)
    noteService.update(id,changedNote).then(returnedNote => {
      setNotes(notes.map(n => n.id !== id ? n : returnedNote))
    }).catch(error => {
      setErrorMsg(
        `the note '${note.content}' was already deleted from the server`
      )
      setTimeout(() => {
        setErrorMsg('')
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMsg}/>
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} 
                toggleImportance={()=> toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </>
  )
}
export default App;
