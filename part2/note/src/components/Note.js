import React from "react"


const Note = ({ note , handleClick}) => {
    const label = note.important
      ? 'make not important' : 'make important'

    return (
      <li>
        {note.content}
        <button onClick={handleClick}>{label}</button>
      </li>
    )
  }
  
  export default Note
