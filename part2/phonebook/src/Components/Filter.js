import React from 'react'

const Filter = ({searchName, handleChange}) =>{
    

    return(
        <div>
            filter shown with<input value={searchName} onChange={handleChange}/>
        </div>

    )}





export default Filter
