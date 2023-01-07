interface Props{
    Todo:string
    handleTodoName:(e:React.ChangeEvent<HTMLInputElement>)=>void;
    handleTodoNameSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
}

export function InputTodo(props:Props){
    return(
    <form className="inputTodoForm" onSubmit={(e)=>{props.handleTodoNameSubmit(e)}}>
        <input type="text" className="inputTodo" placeholder="Enter ToDo's" value={props.Todo}
        onChange={(e)=>{props.handleTodoName(e)}} />
        <button type="submit" className="inputAddBtn" >Add</button>
    </form>
    )
}