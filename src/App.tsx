import { useState } from 'react';
import './App.css';
import { InputTodo } from './components/inputTodo';
import { TodoLists } from './components/todoLists';


export interface ToDo {
  id:string;
  name:string;
}

function App() {
  const [Todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<ToDo[]>([]);
  const handleTodoName = (e:React.ChangeEvent<HTMLInputElement>):void=>{
    setTodo(e.target.value);
  };
  const handleTodoNameSubmit = (e:React.FormEvent<HTMLFormElement>):void=>{
    e.preventDefault();
    console.log(e);
    setTodoList(todoList.concat({
      id:new Date().toString(),
      name:Todo,
    }))
    setTodo("");
  };
  return (
    <div className="App">
      <h1 className="todoHeading">ToDo List</h1>
      <InputTodo Todo={Todo} handleTodoName={handleTodoName} handleTodoNameSubmit={handleTodoNameSubmit} />
      <TodoLists todoList={todoList}/>
    </div>
  );
}

export default App;
