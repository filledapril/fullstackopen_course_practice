import React, { useState, useEffect} from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import Notification from './Components/Notification'
import numberServer from './server/Number'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [addedMessage, setAddedMessage] = useState(null)
  const [removeMessage, setRemoveMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  



  useEffect(() => {
    numberServer.getAll().then(initialNumber => {
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
      }

    if(persons.map(person => person.name).includes(nameObject.name)){
      if(window.confirm(`Replace ${nameObject.number} with ${nameObject.name}?`)){
        const personUpdate = persons.find(p => p.name === newName)
        const numberChange = {...personUpdate, number: newNumber}
        const id = personUpdate.id

        numberServer
            .update(id, numberChange).then(returnNumber => {
              setPersons(persons.map(person => 
                person.id !== id ? person : returnNumber))
            }) 
            .catch(error => {
              setErrorMessage(`${id} was already deleted from server`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })          

            setNewName('')
            setNewNumber('')

      }
    } else {
      numberServer
          .create(nameObject)
          .then(returnNumber => {
            setPersons(persons.concat(returnNumber))
            setNewName('')
            setNewNumber('')

            setAddedMessage(
              `Added ${newName} ${newNumber}`
            )
            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
          })
          .catch(error => {
            setAddedMessage(
              `Error : ${error.response.data.error}`
            )
            setTimeout(() => {
              setAddedMessage(null)
            }, 5000)
          })
    }}
    
    const removeName = (id, name) =>{

      if (window.confirm(`Do you really want to delete ${name}?`)){
        numberServer
            .remove(id)
            .then(result => {
            console.log('deleted', result)
            setPersons(persons.filter(persons => persons.id !== id))
            setRemoveMessage(`${persons.find(p => p.id === id).name} delete successful`)
            setTimeout(() => {
              setRemoveMessage(null)
            }, 5000)
            
      })
            .catch(error => {
              setRemoveMessage(
                `${name} was already deleted`)
              setTimeout(() => {
                setRemoveMessage(null)
              }, 5000)
              setPersons(persons.filter(persons => persons.id !== id))
            })
      }
    }
  //show the searching number by name
    const showNumber = searchName === ''
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(searchName.toLowerCase()))



  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        searchName={searchName} 
        handleChange={handleSearchChange}/>
      <h2>Add a new</h2>
      <Notification message={errorMessage} />
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}/>
      <Notification message={addedMessage}/>
      <h2>Numbers</h2>
      <Notification message={removeMessage}/>
      <Persons 
        showNumber={showNumber} 
        removeName={removeName}/>
    </div>
  )
}

export default App



//previous-------------------
//Check if name alredy exist
    // persons.some(e => e.name === newName)
    //   ? alert(`${newName} is already exist in phonebook`)
    //   : numberServer
    //       .create(nameObject)
    //       .then(returnNumber => {
    //         setPersons(persons.concat(returnNumber))
    //         setNewName('')
    //         setNewNumber('')

    //         setAddedMessage(
    //           `Added ${newName} ${newNumber}`
    //         )
    //         setTimeout(() => {
    //           setAddedMessage(null)
    //         }, 5000)
    //       })
    //       .catch(error => {
    //         setAddedMessage(
    //           `${error.response.data.error}`
    //         )
    //         setTimeout(() => {
    //           setAddedMessage(null)
    //         }, 5000)
    //       })

//person alredy exist ask for updating
    // const personUpdate = persons.find(p => p.name === newName)
    //   if(personUpdate){
    //     if(window.confirm(`Replace ${personUpdate.number} with ${newNumber}?`)){

    //       const numberChange = {...personUpdate, number: newNumber}
    //       const id = personUpdate.id

    //       numberServer
    //         .update(id, numberChange).then(returnNumber => {
    //           setPersons(persons.map(person => 
    //             person.id !== id ? person : returnNumber))
    //         }) 
    //         .catch(error => {
    //           setErrorMessage(`${id} was already deleted from server`)
    //           setTimeout(() => {
    //             setErrorMessage(null)
    //           }, 5000)
    //         })          

    //         setNewName('')
    //         setNewNumber('')
    //     }
    //   }        
  


