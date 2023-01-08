import { useState } from 'react';
import './App.css';
import { InputTodo } from './components/inputTodo';
import { TodoLists } from './components/todoLists';


export interface ToDo {
  id:string;
  name:string;
  isCompleted:boolean;
}

function App() {
  const [Todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<ToDo[]>([]);
  const handleTodoName = (e:React.ChangeEvent<HTMLInputElement>):void=>{
    setTodo(e.target.value);
  };
  const handleTodoNameSubmit = (e:React.FormEvent<HTMLFormElement>):void=>{
    e.preventDefault();
    if(Todo.replace(/\s/g, '').length){
      setTodoList(
        [...todoList,{id:new Date().toString(),name:Todo,isCompleted:false}]
      )
      // setTodoList(todoList.concat({
      //   id:new Date().toString(),
      //   name:Todo,
      //   isCompleted:false,
      // }))
    }
    setTodo("");
  };

  const handleTodoCheck = (selectedId:string):void=>{
    const modifiedTodoList = todoList.map(todoItem=>{
        if(todoItem.id===selectedId){
          return {
            ...todoItem,
            isCompleted:!todoItem.isCompleted,
          };
        }
        else{
          return todoItem;
        }
      }
    )
    setTodoList(modifiedTodoList);
  }

  const handleTodoDelete = (selectedId:string):void=>{
    const modifiedTodoList = todoList.filter(todo=>{return todo.id!==selectedId})
    setTodoList(modifiedTodoList);
  }

  const handleTodoEdit = (selectedId:string,selectedName:string):void=>{
    console.log('here');
    const modifiedTodoList = todoList.map(todoItem=>{
        if(todoItem.id===selectedId){
          return {
            ...todoItem,
            name:selectedName,
          };
        }
        else{
          return todoItem;
        }
      }
    )
    console.log(modifiedTodoList)
    setTodoList(modifiedTodoList);
  }

  return (
    <div className="App">
      <h1 className="todoHeading">ToDo List</h1>
      <InputTodo Todo={Todo} handleTodoName={handleTodoName} handleTodoNameSubmit={handleTodoNameSubmit} />
      <TodoLists todoList={todoList} handleTodoCheck={handleTodoCheck} handleTodoDelete={handleTodoDelete}
      handleTodoEdit={handleTodoEdit} />
    </div>
  );
}

export default App;
