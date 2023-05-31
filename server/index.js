const express = require ("express");
const cors = require ("cors");
const { v4: uuidv4 } = require('uuid');

const todoList = [{}];

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/todo', (req, res) => {
   res.json(todoList);
});

app.post('/api/todo', (req,res) => {
    const {todo} = req.body;

    if( !("todo" in req.body)) {
        return res.status(400).json({
            message: `${JSON.stringify(
                req.body
            )} : This attribute is not accepted, required attributes: todo`, 
        })
    }
    const newTodoItem = {
        Completed:false, id: uuidv4(), text: todo 
    }
    todoList.push(newTodoItem)
    res.json(todoList)
});

app.put('/api/todo', (req,res) => {
    const [{Completed, id, text}] = req.body
    const isExist = todoList.find((data) => data.id === id)
    if(isExist) {
        todoList.forEach((newTodo) => {
            if(newTodo.id === id) {
                newTodo.text = text
                newTodo.Completed = Completed || false
            }
        })
        res.json(todoList)
    }
    res.status(404).json({
        message: `Item with id: ${id} does not exist`,
    })
});

app.patch("/api/todo", (req, res) => {
    const { id } = req.body;
    const newList = (todoList.map((item) => {
        if(item.id === id) {
          return {
            ...item, Completed: !item.Completed
          }
        }
            return item;
      }))
      res.json(newList)
  });


app.delete('/api/todo', (req,res) => {
    const {id} = req.body

    const todoIndex = todoList.findIndex((item) => item.id === id)
    if(todoIndex !== -1) {
        todoList.splice(todoIndex, 1);
        return res.json(todoList)
    }
    res.status(404).json({
        message: "Item does not exist"
    })
});

app.all('*', (req, res) => {
    res.status(404).json("This page does not exist")
});


PORT = 3005
app.listen(PORT, () => console.log(`Server Running port ${PORT}...`) );