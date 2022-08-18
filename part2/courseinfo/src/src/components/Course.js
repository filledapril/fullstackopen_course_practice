/*
Course Component
*/

import React from 'react'

//map() each course beafore
const Course = ({course}) =>{
    
    return(
        <div>
            <Header course = {course}/>
            <Content parts = {course.parts}/>
            <Total parts = {course.parts}/>
        </div>

    )}

const Header = ({course}) =>{
    console.log('Header props:', course)
    return(
        <h2>{course.name}</h2>
    )}


const Part = ({part}) =>{
    console.log("part:", part)
    return(
        <div>
        {part.name} {part.exercises}
        </div>
    )}

const Content = ({parts}) =>{
    console.log("content:", parts)
    return(
        <ul>
        {parts.map((part) => <li key = {part.id}><Part part={part}/></li>)}
        </ul>
    )}

const Total = ({parts}) =>{
    const sum = parts.reduce((a, c) => a + c.exercises, 0)

    return(
        <div>
            <h4>
                total of {sum} exercises
            </h4>
        </div>
    )
}



export default Course
