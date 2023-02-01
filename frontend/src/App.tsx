import React, { useState, ChangeEvent, useEffect } from 'react'
import "bootswatch/dist/darkly/bootstrap.min.css";
import './App.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { InputGroup } from 'react-bootstrap';
import Header from './components/Header';
import axios from 'axios';
import { Tasks } from './components/Tasks';

export interface myTasks {
  id: number;
  title: string;
  completed: boolean; 
}

export interface responseTasks {
  completed: myTasks[];
  pending: myTasks[];
}

export async function getTasks():Promise<responseTasks> {
  let response = await axios.get('all_tasks')
  return response.data
}  


function App(){
  const [selected, setSelected] = useState<number[]>([])
  const [completedTasks, setCompletedTasks]:[myTasks[], (completedTasks:myTasks[]) => void] = React.useState<myTasks[]>([])
  const [pendingTasks, setPendingTasks]:[myTasks[], (pendingTasks:myTasks[]) => void] = React.useState<myTasks[]>([])

  useEffect(() => {
    const getResponse = async () => {
      let response = await getTasks()
      setCompletedTasks(response.completed)
      setPendingTasks(response.pending)
    }
    getResponse()
  }, [])

  return(
    <div className='App'>
      <Header/> 
    <Row style={{textAlign:'center'}}>
      <h3>Pending Tasks</h3>
        {pendingTasks.map((task) => 
          <Tasks task={task} selected={selected} setSelected={setSelected} />
        )}
    </Row>
    
    <Row style={{textAlign:'center'}}>
      <h3>Completed Tasks</h3>
        {completedTasks.map((task) =>
        <Tasks task={task} selected={selected} setSelected={setSelected} />
        )}
    </Row>


    </div>
  )
}

export default App


  // const [task, setTask] = useState<string>('')
  // const [todo, setTodo] = useState<ITtask[]>([])

  // const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.name === 'task'){
  //     setTask(event.target.value)
  //   }
  // }

  // const addTask = () => {
  //   const newTask = {
  //     taskName: task
  //   }
  //   setTodo([...todo, newTask])
  //   setTask('')
  // }

  // const completeTask = (taskNameToDelete:string) => {
  //   setTodo(todo.filter((task) => {
  //     return task.taskName === taskNameToDelete
  //   }))
  // }

  // return (
  //   <div className="App">
  //     <div className='header'>
  //       <div className='inputContainer'>
  //         <input type="text" name='task' placeholder='Add Task' value={task} onChange={handleChange} />
  //       </div>
  //       <button onClick={addTask}>Add</button>
  //     </div>
  //     <div className='todoApp'>
  //     {todo.map((task:ITtask, key:number)=>{
  //         return <Tasks key={key} task={task} completeTask={completeTask} />
  //       })}
  //     </div>
  //   </div>
  // )