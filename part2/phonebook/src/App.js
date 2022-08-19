import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

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

  console.log(showNumber)

  return (
    <div>
      <div> debug adding: {newName} searching...{searchName}</div>
      <h2>Phonebook</h2>
      <div>filter shown with<input value={searchName} onChange={handleSearchChange}/> 
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {showNumber.map((p)=> <div key={p.id}>{p.name} {p.number}</div>)}
      </div>
    </div>
  )
}

export default App