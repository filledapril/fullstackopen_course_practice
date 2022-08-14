const Header = (props) =>{
  return(
    <div>
      <h3>Course Name: {props.course}</h3>
    </div>
  )}


const Content = (props) =>{
console.log(props)
  return(
<div>
  <p>{props.contentName[0]}: {props.contentExercise[0]}</p>
  <p>{props.contentName[1]}: {props.contentExercise[1]}</p>
  <p>{props.contentName[2]}: {props.contentExercise[2]}</p>
</div>
  )}

const Total = (props) =>{
  return(
    <div>
      <p>This course has totally {props.partsTotal} exercises.</p>
    </div>
  )}



const App = () => {
const course = {
  name: 'Half Stack application development',
  parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}

const courseName = course.name;
//get object-parts from course array
const partsArr = course.parts;
//get value of object from parts array
const contentName = partsArr.map(a => a.name);
const contentExercise = partsArr.map(a => a.exercises);
//exercises total calculation
let total = 0;
contentExercise.forEach((num) => total += num)

/*const [part1, part2, part3] = partsArr;
const total = part1.exercises + part2.exercises + part3.exercises;*/

return (
  <div>
   <Header course={courseName}/>
   <Content contentName={contentName} contentExercise={contentExercise} />
   <Total partsTotal={total}/>
  </div>
)}



export default App;
