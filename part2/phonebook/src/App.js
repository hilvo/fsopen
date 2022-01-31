import React, { useState, useEffect } from 'react'
import personService from './services/personService'

const Filter = ({ value, onChange}) => {
  return(
    <form>
      <div>
        filter shown with <input value={value} onChange={onChange}/>
      </div>
    </form>
  )
}

const PersonForm = ({ addPerson, newName, handlePersonChange, newNumber, handleNumberChange }) => {
  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonChange}/><br/>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ namesToShow, deletePerson }) => {

  return(
    <div>
      {namesToShow.map(person =>
        <p key={person.name}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>)}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    const currentNames = persons.map(person => person.name)
    if (currentNames.includes(newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updateId = persons.filter(person => person.name === newName)[0].id
        updateNumber(updateId, newNumber)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`Added ${newName}.`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(error => {
        setMessage(error.response.data.error)
        setTimeout(() => setMessage(null), 5000)
      })
    }
  }

  const namesToShow = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filterName))
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const deletePerson = (props) => {
    const delPerson = persons.filter(person => person.id === props)
    if (window.confirm(`Delete ${delPerson[0].name}?`)) {
      personService
      .del(props)
      .then(returnedPerson => {
        setPersons(persons.filter(person => person.id !== props))
      })
    }
  }

  const updateNumber = (id, newNumber) => {
    const person = persons.find(n => n.id === id)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      .then(setNewName(''))
      .then(setNewNumber(''))
      .then(setMessage(`The number of ${changedPerson.name} was successfully changed.`))
      .then(setTimeout(() => setMessage(null), 5000))

  }

  const Notification = ({ message }) => {

    const messageStyle = {
      color: 'green',
      background: 'lightgrey',
      fontStyle: 'italic',
      fontSize: 16,
      borderStyle: 'solid',
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    }

    if (message === null) {
      return null
    }
  
    return (
      <div style={messageStyle}>
        {message}
      </div>
    )
  }
 

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

      <Filter value={filterName} onChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson}
                  newName={newName}
                  handlePersonChange={handlePersonChange}
                  newNumber={newNumber}
                  handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>

      <Persons namesToShow={namesToShow()} deletePerson={deletePerson}/>

    </div>
  )

}

export default App
