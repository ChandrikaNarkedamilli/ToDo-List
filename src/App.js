import React, {useState} from 'react';
import './App.css';
import {AiOutlineDelete}  from 'react-icons/ai'
import {GiCheckMark} from 'react-icons/gi'

function App() {
  const [isCompletedScreen, setisCompletedScreen] = useState(false)
  return (
    <div className="App">
      <h1 style={{color : 'white'}}>My ToDos</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title</label>
            <input type ="text" placeholder="Enter the Task u want to do"/>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type ="text" placeholder="Enter the Description of the task"/>
          </div>
          <div>
            <button className='primary-button' type= "button" >Add</button>
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
          <div className='todo-list-item'>
            <div>
            <h3>Task name</h3>
            <p>Description</p>
            </div>
            <div>
            <AiOutlineDelete className='delete-icon' />
            <GiCheckMark className='check-icon' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
