import React from 'react'



const Persons = ({showNumber, removeName}) =>{
    return(
        <div>
            {showNumber.map((p)=> 
            <div key={p.id}>
                {p.name} 
                {p.number}
                <button onClick={() => removeName(p.id, p.name)}>Delete</button>
            </div>)}
            
        </div>
    )}

export default Persons