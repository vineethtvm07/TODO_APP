import './todoSelecter.scss'

export default function TodoSelecter({statusHandler}) {
  return (
    <div className="dropdown-container">
    <div className='filter-todo'>
    <select onChange={statusHandler}  name="todos" className='todo-select'>
    <option className='option-box' value="all">All</option>
    <option className='option-box' value="completed">Completed</option>
    <option className='option-box' value="uncompleted">Uncompleted</option>
    </select>
    </div>
    <div className="custom-arrow">
      <i className="fa-solid fa-caret-down"></i>
    </div>
    </div>
  )
}
