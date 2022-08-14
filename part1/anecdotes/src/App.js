import { useState } from 'react'

const Button = (props) =>{
  return(
    <div>
      <button onClick={props.handleVotedClick}>vote</button>
      <button onClick={props.handleRandomClick}>next anecdote</button>
    </div>
)}

const Display = (props) =>{
  return(
    <div>
        <h2>Anecdote of the day</h2>
        {props.anecdotes}
        <p>has {props.votedPoint} votes</p>
    </div>
  )}

/*const Most = ({point, anecdotes}) =>{
  const max = Math.max(...point);
  const maxIndex = point.indexOf(Math.max(...point));
  if(max === 0){
    return(
          <h2>vote the anecdote you like</h2>
  )}
    return(
        <div>
            <h2>Anecdote with most votes</h2>
            <p>{anecdotes[maxIndex]}</p>

        </div>
    )}
    */

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0);
  const [point, setPoint] = useState(new Array(anecdotes.length).fill(0));
  // const [clicks, setClicks] = useState(0);
  const anecdoteIndex = anecdotes.length;
  const randomIndex = Math.floor(Math.random() * anecdoteIndex);

  const handleRandomClick = () =>{
    setSelected(randomIndex);
  }

 // const handleVotedClick
  const handleVotedClick = () =>{
  const pointCopy = {...point}
  pointCopy[selected] += 1;
  setPoint(pointCopy);
  }


  return (
    <div>
      <Display anecdotes={anecdotes[selected]} votedPoint={point[selected]}/>
      <Button handleRandomClick={handleRandomClick} handleVotedClick={handleVotedClick}/>
    </div>
  )
}

export default App
