import { useEffect, useRef } from 'react'
import form from './form.scss'
import TodoSelecter from '../todoSelecter/TodoSelecter';
import axios from "axios"

export const Form = ({inputText, setInputText,todosCount, setTodosCount, todos, setTodos,setStatus,editTodo,setEditTodo, API_URL}) => {
 

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus()
  })
  //Onchange input field//
  const inputTextHandler = (event) => {
    setInputText(event.target.value)
  };
  //Todos add and submit//
  const addTodosHandler = async (event) => {
    if (inputText) {
      try {
        const response = await axios(API_URL , {
          method: "POST",
          data: {
            todo: inputText
          }
        })
        setTodos(response.data);
      setTodosCount((prev) => prev + 1);
      } catch (error) {
        console.log(error);
      }
    }
      setInputText("")
  };

  const keyHandler = (e) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      if (inputText){
        addTodosHandler()
      }else{
        updateHandler()
      }
    }
  }
  const statusHandler = (event) => {
    setStatus(event.target.value);
  };
//On Change Edit field//
  const onChangeEditHandler = (e) => {
    const newEntry = {
      id: editTodo.id ,
      Completed: editTodo.Completed ? true : false,
      text: e.target.value 
    }
    setEditTodo(newEntry)
  }
  //Update List/
  const updateHandler = async () => {
   try {
    const response = await axios(API_URL, {
      method: "PUT",
      data: [{
        Completed: editTodo.Completed ? true : false,
        id: editTodo.id ,
        text: editTodo.text 
      }]
    })
    setTodos(response.data)
    setEditTodo('')
   } catch (error) {
    console.log(error.response.data.message)
   }
  }
  //Update Cancel//
    const cancelHandler = () => {
      setEditTodo('')
    }
 
  return (
    <div className='form-container'>
        <div className='home-container' >
          <div className="text-container">

                {editTodo && editTodo ? (
                  <>
                <div className="update-box">
                <input value = {editTodo && editTodo.text} onChange={onChangeEditHandler} onKeyDown={keyHandler} type="text" ref={inputRef} className='todo-update' placeholder='Update Todo...'/>
                <button onClick={updateHandler}  className='update-btn' type='submit'>
                <i className="fa-solid fa-square-pen"></i>
                </button>
                </div>
                <button onClick={cancelHandler} className='cancel-btn'><i className="fa-solid fa-rectangle-xmark"></i></button>
                </>
                ) : (
                <div className="todo-box">
                <input value = {inputText||""} onChange={inputTextHandler} onKeyDown={keyHandler} ref={inputRef} type="text" className='todo-input' placeholder='Enter a Todo...'/>
                <button onClick={addTodosHandler} className='todo-btn' type='submit'>
                <i className="fa fa-plus-square plus-square-btn"/>
                </button>
                </div>
              )}
         </div>
           <TodoSelecter statusHandler={statusHandler} />
          </div>
    </div>
  )
}
