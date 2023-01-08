import { useState } from 'react';
import './App.css';
import { InputTodo } from './components/inputTodo';
import { TodoLists } from './components/todoLists';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd'


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
      
      const temp = modifiedTodoList[destination.index]
      modifiedTodoList[destination.index] = modifiedTodoList[source.index]
      modifiedTodoList[source.index] = temp
      setTodoList(modifiedTodoList)
    }

    //handle dnd with in a dropper
    if(source.index!==destination.index &&source.droppableId===destination.droppableId)
    {
      const modifiedTodoList = todoList;
      const temp = modifiedTodoList[destination.index]
      modifiedTodoList[destination.index] = modifiedTodoList[source.index]
      modifiedTodoList[source.index] = temp
      setTodoList(modifiedTodoList)
    }

  };
  
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
