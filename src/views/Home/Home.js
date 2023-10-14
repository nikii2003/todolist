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
    
    const[id,setId]=useState(0)
    const [title,setTitle]=useState('');
    const[description,setDescription]=useState('')
    const[priority,setPriority]=useState('')
    const[isEdit,setIsEdit]=useState(false)
    const[search,setSearch]=useState('')
  

    const saveListToLocalStorage = (task)=>{
    const saveList=localStorage.setItem('todolist',JSON.stringify(task));
    if(saveList && saveList.length>=0){
        setTasklist(saveList);
    }
    }
    useEffect(()=>{
    const getFromLocalStorage=JSON.parse(localStorage.getItem('todolist'));
   
    // if(getFromLocalStorage && getFromLocalStorage>=0){
        setTasklist(getFromLocalStorage)
    // }
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
     saveListToLocalStorage(tempArray)
  }

  const setTaskEditable = (id)=>{
    setIsEdit(true)
    setId(id)

    let currentEditTask ;
    tasklist.forEach((task)=>{
        if(task.id===id){
            currentEditTask=task;
        }

    })
 setTitle(currentEditTask.title)
 setDescription(currentEditTask.description)
setPriority(currentEditTask.priority) 
  }

   const updateTaskList =()=>{
   let indextoupdate;
    tasklist.forEach((task,i)=>{
        if(task.id===id){
            indextoupdate=i
        }
    })
   const tempArray=tasklist;
   tempArray[indextoupdate]={
   id:id,
   title:title,
   description:description,
   priority:priority
   }
 setId(0)
 setTitle('')
 setDescription('');
 setPriority('');
  setTasklist([...tempArray])
 saveListToLocalStorage(tempArray)
 setIsEdit(false)
   }

    const filterArray =tasklist.filter((list)=>{
    const title = list.title.toLocaleLowerCase();
    const id=list.id.toString();
    const query=search.toLocaleLowerCase();
    return (title.includes(query) || id.includes(query))
    })

    const cancelData = () =>{
        setIsEdit(false)
        setTitle('')
        setPriority('')
        setDescription('')
    }
  
  return (
    <div>
        <h1 className='my-heading'>to do application</h1>
        <div className='card-flex'>
            <div>
           <h1> Task List</h1>
           <input type='text' className='search-filter' value={search} onChange={(e)=>setSearch(e.target.value)} placeholder='search list'/>
           {
            filterArray.map((taskItem, i)=>{
                const {id,title,description,priority}=taskItem
                return(
                    <div>
                       <Card id={id} 
                       title={title} 
                       descriptio={description} 
                       priority={priority} 
                       key={i}
                       removeTaskFromList={removeTaskFromList}
                       setTaskEditable={setTaskEditable}/>  
                    </div>
                )
            })
           }
            </div>
            <div>
            <h1>
            {isEdit  ? `Upadate Task ${id}` : 'Add Task'}
            </h1>
            <div className='input-box'>
                <form className='input-box'>
            <input type='text' value={title} placeholder='title' className='input-field' onChange={(e)=>{setTitle(e.target.value)}} />
            <input type='text' value={description} placeholder='description' className='input-field' onChange={(e)=>{setDescription(e.target.value)}} />
            <input type='text' value={priority} placeholder='priority' className='input-field' onChange={(e)=>{setPriority(e.target.value)}} />
            </form>
            </div>
            <div className='btn-container'>
                {
                    isEdit ? <> <button onClick={updateTaskList} type='button'>Update</button> <button type="button" onClick={cancelData}>cancel</button></> :
                    <button onClick={addTasktolist}> Add</button>
                }
               
               
            </div>
            </div>
        </div>
    </div>
  )
}

export default Home