import React from 'react'

const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'make not important' : 'make important'
  return (
    <li className='note'>
      {note.content} 
      <button className='note_btn' onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note