import React from 'react'
import "./Card.css"

function Card({id,title,descriptio,priority,removeTaskFromList,setTaskEditable}) {
  return (
    <div className='card-container'>
        <h1>{title}</h1>
        <p>{descriptio}</p>
        <p>{priority}</p>
        <span className='delete-icon' onClick={()=>{
            removeTaskFromList(id)
        }}>😔</span>
        <span className='edit-icon' onClick={()=>{
            setTaskEditable(id)
        }}>🖊</span>
    </div>
  )
}

export default Card