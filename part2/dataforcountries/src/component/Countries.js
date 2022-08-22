import React, {useState} from "react";

const CountryData = ({countryMatch}) =>{

    return(
        <div>
            <h2>{countryMatch[0].name.common}</h2>
            <p>Capital: {countryMatch[0].capital}</p>
            <p>Area: {countryMatch[0].area}</p>
            <h4>Languages:</h4>
            <ul>
                {Object.values(countryMatch[0].languages).map((lan) => 
                <li key={lan}>{lan}</li>)}
            </ul>
            <img 
            src={countryMatch[0].flags.png} 
            alt={countryMatch[0].name.common}
            style={{width: 200+'px', border: "1px solid gray"}}></img>
        </div>
    )

}

const Countries = ({findCountry, countries})=>{

    console.log("filtered", countries.filter(c => 
      c.name.common.toLowerCase().includes(findCountry.toLowerCase())))

    let countryMatch = [];

    if(findCountry.length > 0){
      countryMatch = countries.filter(c => 
        c.name.common.toLowerCase().includes(findCountry.toLowerCase()))
    } else {countryMatch = []}
  
    if(countryMatch.length > 10) {
      return `Too many matches, specify another filter`
    }else if(countryMatch.length === 1){
      return(
        <CountryData countryMatch={countryMatch}/>
      )}else{
        return(
          <div>
            {countryMatch.map((c) => 
            <div key={c.name.common}>
                {c.name.common}
                <button>show</button>
            </div>)}
          </div>
        )
      }
    }





export default Countries