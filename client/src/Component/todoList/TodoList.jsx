import Todo from '../todo/Todo'
import './todoList.scss'

export const TodoList = ({todos, setTodos, filteredTodos, setInputText,editTodo, setEditTodo,  API_URL}) => {
       
  return (
    <div className='todo-container'>
      <ul className='todo-list'></ul>
      {
      filteredTodos.map((todo) => (
          todo.text && <Todo key={todo.id} text={todo.text} todo={todo} 
          todos={todos} setTodos={setTodos} setInputText={setInputText} 
          editTodo={editTodo} setEditTodo={setEditTodo} API_URL={API_URL}/>
      ))}
    </div>
  )
}
