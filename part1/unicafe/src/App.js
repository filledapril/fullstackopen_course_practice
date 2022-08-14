import { useState } from 'react'

const Button = (props) =>{
  return(
    <div>
    <button onClick={props.handleGoodClick}>good</button>
    <button onClick={props.handleNeuClick}>neutral</button>
    <button onClick={props.handleBadClick}>bad</button>
    </div>
)}

const StatisticLine = ({text, value}) =>(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )

const Statistics = (props) =>{
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
    return(
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good} />
            <StatisticLine text="neutral" value={props.neutral} />
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={props.total}/>
            <StatisticLine text="average" value={props.avg}/>
            <StatisticLine text="positve" value={props.positive} />
          </tbody>
        </table>
  )}


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const[total, setTotal] = useState(0)
  const[point, setPoint] = useState([])

  // save clicks of each button to its own state
  const handleGoodClick = () =>{
    setGood(good + 1)
    setTotal(total + 1)
    setPoint(point.concat("1"))
  }

  const handleNeuClick = () =>{
    setNeutral(neutral + 1)
    setTotal(total + 1)
    setPoint(point.concat("0"))
  }

  const handleBadClick = () =>{
    setBad(bad + 1)
    setTotal(total + 1)
    setPoint(point.concat("-1"))
  }

  const avg =
      point.reduce((sum, curr) => sum + Number(curr), 0) /
      point.length;

  const positive = (100 * good) /total + "%";

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleGoodClick={handleGoodClick}
        handleNeuClick={handleNeuClick}
        handleBadClick={handleBadClick}
        />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} avg={avg} positive={positive}/>
    </div>
  )
}


/*--------------------1d------------------------
  const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({handleClick, text}) => (
      <button onClick={handleClick}>
      {text}
      </button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text="left"/>
      <Button handleClick={handleRightClick} text="right"/>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}
*/

/* ------------------------1c-------------------------------
const App = () => {
  const [ counter, setCounter ] = useState(0);

  const increaseByOne = () => setCounter(counter + 1);
  const decreaseByOne = () => setCounter(counter - 1);
  const setToZero = () => setCounter(0);

   return (
     <div>
       <Display counter={counter}/>
       <Button
         onClick={increaseByOne}
         text='plus'
       />
       <Button
         onClick={setToZero}
         text='zero'
       />
       <Button
         onClick={decreaseByOne}
         text='minus'
       />
     </div>
   )
}
//simplyfied component
const Display = ({ counter }) => <div>{counter}</div>


const Button = ({onClick, text}) => (
    <button onClick={onClick}>
      {text}
    </button>
  )
*/




// export default App
export default App
