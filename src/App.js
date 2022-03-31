import './App.css';
import { useState, useEffect } from 'react';
import Note from './components/Note'
import Course from './components/Course'
import noteService from './services/notes'
import axios from 'axios'


const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("a new note ...")
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  useEffect(() => noteService.getAll.then(response => {
    setNotes(response.data)
  }),[])
  const courses = [
    {
      id: 1,
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(response => {
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
  }

  const toggleImportanceOf = (id) => {
    const url = `http://localhost:3000/notes/${id}`
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService.update(id,changedNote).then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  }

  return (
    <>
      <h1>Notes</h1>
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
      <hr></hr>
      {courses.map(course => 
        <Course key={course.id} course={course}/>
      )}
    </>
  )
}
export default App;
