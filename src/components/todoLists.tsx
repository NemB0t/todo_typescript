// import { Droppable } from "react-beautiful-dnd";
import { Droppable } from '@hello-pangea/dnd';
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
           <Droppable droppableId="activeTodos" >
            {
                (provided,snapshot)=>(
                    <div className= {`activetodotasks ${snapshot.isDraggingOver?"dragactive":""}`}
                     ref={provided.innerRef}{...provided.droppableProps}>
                        <h4>Active Tasks</h4>
                        <div className="todoLists">
                            {props.todoList.map((todo,todoIndex)=>{
                                if(!todo.isCompleted){
                                    return <TodoItem key={todo.id} todo={todo} handleTodoCheck={props.handleTodoCheck} 
                            handleTodoDelete={props.handleTodoDelete} handleTodoEdit={props.handleTodoEdit} 
                            todoIndex={todoIndex} />
                                }
                                return undefined;
                            })}
                        </div>
                        {provided.placeholder}
                    </div>
                )
            }
           </Droppable>
           <Droppable droppableId="compledtedTodos" >
                {
                    (provided,snapshot)=>(
                        <div className={`completedtodotasks ${snapshot.isDraggingOver?"dragcomplete":""}`}
                        ref={provided.innerRef}{...provided.droppableProps}>
                            <h4>Completed Tasks</h4>
                            <div className="todoLists">
                                {props.todoList.map((todo,todoIndex)=>{
                                    if(todo.isCompleted){
                                        return <TodoItem key={todo.id} todo={todo} handleTodoCheck={props.handleTodoCheck} 
                                        handleTodoDelete={props.handleTodoDelete} handleTodoEdit={props.handleTodoEdit}
                                        todoIndex={todoIndex} />
                                    }
                                    return undefined;
                                })}
                            </div>
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}