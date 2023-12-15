import "./App.css";
import Todo from "./components/Todo";
import Form from "./components/Form"
import Filter from "./components/Filter";
import { useState } from "react";
import { nanoid } from "nanoid";


const FILTER_MAP ={
  All : () => true,
  Active : (task)=>!task.completed,
  Completed :(task)=> task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAP)


function App(props) {

  const [tasks ,setTasks] = useState(props.tasks)
  const [filter ,setFilter] = useState("All")


  //Creating a New Task
  function createTask (name){
    const newTask = {id: `todo-${nanoid()}` , name , completed : false}
    setTasks([...tasks,newTask])
  }


  //Editing a existing Task
  function editTask (id,newName){
    const editedTask = tasks.map((task)=>{
      if(id === task.id){
        return {...task,name:newName}
      }
      return task
    })
    setTasks(editedTask)
  }

  //Changing the Completed status of a task
  function toggleTaskCompleted (id){
    const toggleChanged = tasks.map((task)=> {
      if(id === task.id){
        return {...task,completed : !tasks.completed}
      }
      return task
    })
    setTasks(toggleChanged)
  }

  //Deleting a task
  function deleteTask (id){
    const remainingTask = tasks.filter((task) => id !== task.id)
    setTasks(remainingTask)
  }

  //Sending all the props to the Todo Component
  const taskList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Todo 
    id={task.id} 
    name={task.name} 
    completed={task.completed} 
    key={task.id}
    editTask ={editTask}
    deleteTask = {deleteTask}
    toggleTaskCompleted = {toggleTaskCompleted}
   
    />
  ));

  const filterList = FILTER_NAMES.map((name)=> (
    
    <Filter 
    key ={name}
    name ={name}
    isPressed = {name === filter}
    setFilter ={setFilter}
    />
  ))


  const taskNoun = taskList.length !== 1 ? "tasks" : "task"
const headingTask = `${taskList.length} ${taskNoun} remaining`

  return (
    <div className="todoapp stack-large">
      <h1>Todo-List</h1>
      <Form createTask = {createTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading">{headingTask}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
