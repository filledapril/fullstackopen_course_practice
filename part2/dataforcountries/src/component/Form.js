import React from 'react'

const Form = ({findCountry,handleFindChange}) =>{

    return(
      <div>
        <form>
          <div>Find countries: 
            <input 
              value={findCountry}
              onChange={handleFindChange}/>
          </div>
        </form>
      </div>
    )}



export default Form 