import { useRef } from "react";

interface Props{
    Todo:string
    handleTodoName:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    handleTodoNameSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
}

export function InputTodo(props:Props){
    const todoInputRef = useRef<HTMLInputElement>(null);
    return(
    <form className="inputTodoForm" onSubmit={(e)=>{
            props.handleTodoNameSubmit(e)
            todoInputRef.current?.blur();
        }}>
        <input type="text" className="inputTodo" placeholder="Enter ToDo's" ref={todoInputRef} value={props.Todo}
        onChange={(e)=>{props.handleTodoName(e)}} />
        <button type="submit" className="inputAddBtn" >Add</button>
    </form>
    )
}