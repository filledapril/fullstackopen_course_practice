import React, { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  
  const handleNameChange = (event) =>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) =>{
    setSearchName(event.target.value)
  }



  const addPerson = (event) =>{
    event.preventDefault()
      const nameObject = {
        name: newName,
        number: newNumber,
        id: newName,
      }
      
    const checkPerson = persons.some(e => e.name === newName)
    ? alert(`${newName} is already added to phonebook`)
    : setPersons(persons.concat(nameObject))  

    setNewName('')
  }


  const showNumber = searchName === ''
  ? persons
  : persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleChange={handleSearchChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons showNumber={showNumber}/>
    </div>
  )
}

export default App