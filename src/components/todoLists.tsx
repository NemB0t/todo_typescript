import { ToDo } from "../App"
import { TodoItem } from "./todoItem";

interface Props{
    todoList:ToDo[];
    handleTodoCheck:(id:string)=>void;
    handleTodoDelete:(id:string)=>void;
    handleTodoEdit:(id:string,name:string)=>void;
}

export function TodoLists(props:Props){
    return(
        <div className="todoLists">
            {props.todoList.map(todo=>{
            return <TodoItem key={todo.id} todo={todo} handleTodoCheck={props.handleTodoCheck} 
            handleTodoDelete={props.handleTodoDelete} handleTodoEdit={props.handleTodoEdit} />
            })}
        </div>
    )
}