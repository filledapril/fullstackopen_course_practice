import React, { useState, useEffect} from 'react'
import axios from 'axios'
import Form from './component/Form'
import Countries from './component/Countries'



  const App =() =>{
    const [countries, setCountries] = useState([])
    const [findCountry, setFindCountry] = useState('')
    const [showData, setShowData] = useState('')


    const handleFindChange = (event) => {
      setFindCountry(event.target.value)}

    useEffect (() =>{
        console.log('effect')
        axios 
          .get('https://restcountries.com/v3.1/all')
          .then(response => {
            console.log('promise fulfilled')
            setCountries(response.data)
          })
    },[])
    console.log('render', countries.length, 'countries')


  return(
    <div>
        <Form findCountry={findCountry} handleFindChange={handleFindChange}/>

        <Countries findCountry={findCountry} countries={countries}/>


    </div>
  )
}

export default App;
