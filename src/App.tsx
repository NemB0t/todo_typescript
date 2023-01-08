import { useEffect, useState } from 'react';
import './App.css';
import { InputTodo } from './components/inputTodo';
import { TodoLists } from './components/todoLists';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd'

const localStorageListKey = 'todoTaskListTS';

export interface ToDo {
  id:string;
  name:string;
  isCompleted:boolean;
}

function App() {
  const [Todo, setTodo] = useState<string>("");
  //The useEffect is being called twice due to batched rendering in react 18
  //Hence to prevent the local storage key,value pair from being initialized by default value eg:[]
  //We have to load the data from local storage in the state initialization.
  //Automatic batching reference: https://reactjs.org/blog/2022/03/29/react-v18.html#new-feature-automatic-batching
  const [todoList, setTodoList] = 
  useState<ToDo[]>(JSON.parse(localStorage.getItem(localStorageListKey)||'[]'));
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
    setTodoList(modifiedTodoList);
  }

  const handleOnDragEnd = (result:DropResult)=>{
    // console.log(result);
    const {source,destination}=result;

    // hover and leave it
    if(!destination) return
    // hover and leave it
    if(destination?.droppableId===source.droppableId 
      && destination.index===source.index) return
    
    // handle dnd active to completed
    if(source.droppableId==="activeTodos"&&destination.droppableId==="compledtedTodos"){
      const modifiedTodoList = todoList.map((todoItem,todoIndex)=>{
        if(source.index===todoIndex){
          return {
            ...todoItem,
            isCompleted:true,
          };
        }
        else
          return todoItem
      })
      
      //handle changing of positions of the tasks
      const temp = modifiedTodoList[destination.index]
      modifiedTodoList[destination.index] = modifiedTodoList[source.index]
      modifiedTodoList[source.index] = temp

      setTodoList(modifiedTodoList)
    }
    // handle dnd completed to active
    if(source.droppableId==="compledtedTodos"&&destination.droppableId==="activeTodos"){
      const modifiedTodoList = todoList.map((todoItem,todoIndex)=>{
        if(source.index===todoIndex){
          return {
            ...todoItem,
            isCompleted:false,
          };
        }
        else
          return todoItem
      })
      
      //handle changing of positions of the tasks
      const temp = modifiedTodoList[destination.index]
      modifiedTodoList[destination.index] = modifiedTodoList[source.index]
      modifiedTodoList[source.index] = temp
      setTodoList(modifiedTodoList)
    }

    //handle dnd with in a dropper
    if(source.index!==destination.index &&source.droppableId===destination.droppableId)
    {
      //handle changing of positions of the tasks
      const modifiedTodoList = todoList;
      const temp = modifiedTodoList[destination.index]
      modifiedTodoList[destination.index] = modifiedTodoList[source.index]
      modifiedTodoList[source.index] = temp
      setTodoList(modifiedTodoList)
    }

  };

  //To fetch data from local storage when the component is mounted.
  useEffect(() => {
    const cacheTodoList:ToDo[] = JSON.parse(localStorage.getItem(localStorageListKey)||'{}');
    if (cacheTodoList) {
     setTodoList(cacheTodoList);
    }
    
  }, []);

  //To update the local storage when the todoList gets updated.
  useEffect(() => {
    if(todoList){
      localStorage.setItem(localStorageListKey, JSON.stringify(todoList));
      console.log('modified ',todoList)
    }
  }, [todoList]);
  
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className="App">
        <h1 className="todoHeading">ToDo List</h1>
        <InputTodo Todo={Todo} handleTodoName={handleTodoName} handleTodoNameSubmit={handleTodoNameSubmit} />
        <TodoLists todoList={todoList} handleTodoCheck={handleTodoCheck} handleTodoDelete={handleTodoDelete}
        handleTodoEdit={handleTodoEdit} />
      </div>
    </DragDropContext>
  );
}

export default App;
