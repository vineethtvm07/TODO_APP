import React, {useEffect, useState } from 'react'
import './App.scss'
import { Header } from './Component/header/Header'
import { Form } from './Component/form/Form'
import { TodoList } from './Component/todoList/TodoList'
import axios from "axios"

const App = () => {

  const [inputText, setInputText] = useState("") //Input field//
  const [todosCount, setTodosCount] = useState(1)
  const [todos, setTodos] = useState([]) //todos Storage//
  const [status, setStatus] = useState("all") //DropDrown select//
  const [editTodo, setEditTodo] = useState('') //Edit Todo//
  const [filteredTodos, setFilteredTodos] = useState([]) //All,Complete,Uncomplete -Filtered todos//

  const API_URL = "http://localhost:3005/api/todo"
  
  //All Filtered todos Status //
  useEffect(() => {
    filteredHandler();
  },[todos,status]);

//Filter Complete , Uncomplete Items//
  const filteredHandler = () => {
    switch (status) {
       case "completed":
        setFilteredTodos(todos.filter((todo )=> todo.Completed === true));
        break;
        case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.Completed === false));
        break; 
        default: setFilteredTodos(todos);
        break; 
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios(API_URL);
    setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  }
    
    useEffect(() => {
      fetchTodos()
    }, []);
  
  return (
    <div className='app-container'>
     <Header />
     <Form inputText={inputText} setInputText={setInputText} 
           todos={todos} setTodos={setTodos} setFilteredTodos={setFilteredTodos}  
           setStatus={setStatus} editTodo={editTodo} setEditTodo={setEditTodo} 
          todosCount={todosCount} setTodosCount={setTodosCount} API_URL={API_URL} 
           />
           
      <TodoList todos={todos} setTodos={setTodos} 
               filteredTodos={filteredTodos} 
               setInputText={setInputText} 
               setEditTodo={setEditTodo} editTodo={editTodo} API_URL={API_URL}/> 
    </div>
  )
}

export default App
