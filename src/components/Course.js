import React from 'react'

const Course = ({course}) => {
    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts} />
        </>
    )
}

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  const total = parts.reduce((s,p,i) => {
    if(i === 1) {
      return s.exercises + p.exercises
    } else {
      return s + p.exercises
    }
  })
  return (
    <>
      <ul>
        {parts.map(part =>
          <Part key={part.id} part={part} />  
        )}
        <li>total of {total} exercises </li>
      </ul>
    </>
  )
}

const Part = ({part}) => {
  return (
    <li>{part.name} {part.exercises}</li>
  )
}

export default Course