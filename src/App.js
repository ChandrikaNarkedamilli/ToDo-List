import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete}  from 'react-icons/ai'
import {GiCheckMark} from 'react-icons/gi'

function App() {
  const [isCompletedScreen, setisCompletedScreen] = useState(false)
  const [allTodos, setAllTodos] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [completedTodos, setCompletedTodos] = useState([])

  const handleAddNewTodo = () => {
    let newTodoObj = {
        title : newTitle ,
        description : newDescription
    }
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoObj)
    setAllTodos(updatedTodoArr)
    localStorage.setItem('todolist',JSON.stringify(updatedTodoArr));
  }

  
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'))
    if(savedTodo){
      setAllTodos(savedTodo)
    }
  },[])
  

  const handleDeleteTodo = index => {
    let reducedTodoArr = [...allTodos];
    reducedTodoArr.splice(index ,1);
    localStorage.setItem('todolist',JSON.stringify(reducedTodoArr));
    setAllTodos(reducedTodoArr)
  }

  const handleComplete = index => {
    const date = new Date()
    let dd = date.getDate()
    let mm = date.getMonth()
    let yyyy = date.getFullYear()
    let hh = date.getHours()
    let minutes = date.getMinutes()
    let ss = date.getSeconds()

    let finalDate = dd + '-' + mm  + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss

    let filteredTodo =  {
      ...allTodos[index],
      completedOn : finalDate
    }

    let updatedCompletedArr = [...completedTodos , filteredTodo]
    setCompletedTodos(updatedCompletedArr)
    handleDeleteTodo(index)
  }


  return (
    <div className="App">
      <h1 style={{color : 'white'}}>My ToDos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type ="text" value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Enter the Task u want to do"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type ="text" value={newDescription} onChange={e => setNewDescription(e.target.value)} placeholder="Enter the Description of the task"/>
          </div>
          <div>
            <button className='primary-button' type= "button" onClick={handleAddNewTodo}>Add</button>
          </div>
        </div>

        <div className="button-area">
          <button 
            className={`secondary-button ${isCompletedScreen=== false && 'active'}`} 
            onClick={() => setisCompletedScreen(false)}
          >
            ToDo
          </button>
          <button
            className={`secondary-button ${isCompletedScreen=== true && 'active'}`} 
            onClick={() => setisCompletedScreen(true)} 
          >
            Completed
          </button>
        </div>
        <div className='todo-list'>

        {isCompletedScreen ===false && allTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <div>
                  <AiOutlineDelete className='delete-icon' onClick={() => handleDeleteTodo(index)}/>
                  <GiCheckMark className='check-icon' onClick={() => handleComplete(index)} />
                </div>
              </div>
            )
          })}

        {isCompletedScreen === true && completedTodos.map((item, index)=>{
            return(
              <div className='todo-list-item' key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on {item.completedOn}</small></p>
                </div>
                <div>
                  <AiOutlineDelete className='delete-icon' onClick={() => handleDeleteTodo(index)}/>
                </div>
              </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
