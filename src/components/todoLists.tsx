import { ToDo } from "../App"
import { TodoItem } from "./todoItem";

interface Props{
    todoList:ToDo[];
}

export function TodoLists(props:Props){
    return(
        <div className="todoLists">
            {props.todoList.map(todo=>{
            return <TodoItem key={todo.id} val={todo.name} />
            })}
        </div>
    )
}