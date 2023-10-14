import React, { useEffect, useState } from 'react'
import './Home.css'
import Card from '../../component/Card/Card'

function Home() {
    const[tasklist,setTasklist]=useState([
        {
            id:1,
            title:"djndjndnnnndnbnsbd",
            description:"hjdhdjhfjdhjdjdjdj",
            priority:"high"

        }
    ])
    
 
    const [title,setTitle]=useState('');
    const[description,setDescription]=useState('')
    const[priority,setPriority]=useState('')

    const saveListToLocalStorage = (task)=>{
    const saveList=localStorage.setItem('todolist',JSON.stringify(task));
    if(saveList && saveList.length>0)
    setTasklist(saveList);
    }

    useEffect(()=>{
    const getFromLocalStorage=JSON.parse(localStorage.getItem('todolist'));
    setTasklist(getFromLocalStorage) ;
    },[])

    const addTasktolist= ()=>{
        const random = Math.floor(Math.random()*1000)
        const obj={
            id:random,
            title:title,
            description:description,
            priority:priority
        }
     const newArray=[...tasklist,obj]

       setTasklist(newArray)  

       setTitle('');
       setDescription('');
       setPriority('');
       saveListToLocalStorage(newArray)
      
    }

  const removeTaskFromList = (id)=>{
  let index;
  tasklist.forEach((task,i)=>{
    if(task.id===id){
        index=i;
    }
  })
     const tempArray =tasklist;
     tempArray.splice(index,1);
     setTasklist([...tempArray])
  }
  return (
    <div>
        <h1 className='my-heading'>to do application</h1>
        <div className='card-flex'>
            <div>
           <h1> Task List</h1>
           {
            tasklist.map((taskItem, i)=>{
                const {id,title,description,priority}=taskItem
                return(
                    <div>
                       <Card id={id} 
                       title={title} 
                       descriptio={description} 
                       priority={priority} 
                       key={i}
                       removeTaskFromList={removeTaskFromList}/>  
                    </div>
                )
            })
           }
            </div>
            <div>
            <h1>Add Task</h1>
            <div className='input-box'>
                <form className='input-box'>
            <input type='text' value={title} placeholder='title' className='input-field' onChange={(e)=>{setTitle(e.target.value)}} />
            <input type='text' value={description} placeholder='description' className='input-field' onChange={(e)=>{setDescription(e.target.value)}} />
            <input type='text' value={priority} placeholder='priority' className='input-field' onChange={(e)=>{setPriority(e.target.value)}} />
            </form>
            </div>
            <div className='btn-container'>
                <button onClick={addTasktolist} type='button'>Add</button>
                <button onClick={addTasktolist}>Update</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home