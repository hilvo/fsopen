import React from 'react'

const Header = ({ course }) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((prevValue, currentValue) => prevValue + currentValue.exercises, 0)
    return(
      <p><b>total of {total} exercises</b></p>
    ) 
  }
  
  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>    
    )
  }
  
  const Content = ({ course }) => {
    return course.parts.map(part => <Part part={part} key={part.id}/>)
  }

  const Course = ({ course }) => {
    return (
        <div>
          <Header course = {course} />
          <Content course = {course} />
          <Total course = {course} />
        </div>
      )
  }

export default Course