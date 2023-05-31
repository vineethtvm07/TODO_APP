import { useContext, useState } from 'react';
import './todo.scss'
import axios from 'axios'
export default function Todo({ text, todo, todos, setTodos,editTodo, setEditTodo, API_URL}) {

    
    //Delete each todo//
  const deleteHandler = async () => {
    try {
      const response = await axios(API_URL, {
        method: "DELETE",
        data: {
          id: todo.id
        }
      })
      setTodos(response.data)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

   //Complete & Line-through Todo//
  const completeHandler = async () => {
    const response = await axios(API_URL, {
      method: "PATCH",
      data: {
        id:todo.id
      }
    })
    setTodos(response.data)
  };

  return (
    <div className='todo'>
        <div className="todo-box">
      <li onClick={completeHandler} className={`todo-item ${todo.Completed ? 'todo-line-through' : ""}`}> {text} </li>
      </div>
      {
        editTodo && editTodo ? (
          <div className="buttons"></div>
        ) : (
          <div className="buttons">
      <button onClick={()=>setEditTodo({id:todo.id,
      text:todo.text,
      Complete:todo.Complete ? true : false
      })} 
      className='edit-btn'> <i className="fa-regular fa-pen-to-square"></i> </button>
      <button onClick={deleteHandler}className='trash-btn' > <i className="fa-solid fa-trash-can"></i> </button>  
      </div>
        )
      }
      
    </div>
  )
}
