import React, { useState, useEffect} from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import numberServer from './server/Number'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')



  useEffect(() => {
    numberServer
      .getAll()
      .then(initialNumber => {
        setPersons(initialNumber)
      })
  }, [])
    console.log('render', persons.length, 'persons')



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
    
//Check if name alredy exist, if not, add person
    persons.some(e => e.name === newName)
      ? alert(`${newName} is already added to phonebook`)
      : numberServer
          .create(nameObject)
          .then(returnNumber => {
            setPersons(persons.concat(returnNumber))
            setNewName('')
            setNewNumber('')
          })
//person alredy exist ask for updating
    const personUpdate = persons.find(p => p.name === newName)
      if(personUpdate){
        if(window.confirm(`Replace ${personUpdate.number} with ${newNumber}?`)){

          const numberChange = {...personUpdate, number: newNumber}
          const id = personUpdate.id

          numberServer
            .update(id, numberChange)
            .then(returnNumber => {
              setPersons(persons.map(person => 
                person.id !== id ? person : returnNumber))
            })

            setNewName('')
            setNewNumber('')
        }
      }        
  }


  const removeName = (id) =>{
    if (window.confirm(`Do you really want to delete ${id}?`)){
      numberServer
        .remove(id)
        .then(() => {
          setPersons(persons.filter(persons => persons.id !== id))
    })}
    }

  //show the searching number by name
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
      <Persons showNumber={showNumber} removeName={removeName}/>
    </div>
  )
}

export default App