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
        <div className="todoTaskLists">
            <div className="activetodotasks">
                <h4>Active Tasks</h4>
                <div className="todoLists">
                    {props.todoList.map(todo=>{
                        if(!todo.isCompleted){
                            return <TodoItem key={todo.id} todo={todo} handleTodoCheck={props.handleTodoCheck} 
                    handleTodoDelete={props.handleTodoDelete} handleTodoEdit={props.handleTodoEdit} />
                        }
                        return undefined;
                    })}
                </div>
            </div>
            <div className="completedtodotasks">
                <h4>Completed Tasks</h4>
                <div className="todoLists">
                    {props.todoList.map(todo=>{
                        if(todo.isCompleted){
                            return <TodoItem key={todo.id} todo={todo} handleTodoCheck={props.handleTodoCheck} 
                            handleTodoDelete={props.handleTodoDelete} handleTodoEdit={props.handleTodoEdit} />
                        }
                        return undefined;
                    })}
                </div>
            </div>
        </div>
    )
}