import { ToDo } from "../App"
import { AiFillEdit,AiFillDelete,AiOutlineUndo } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import { useState } from 'react';
// import { Draggable } from "react-beautiful-dnd";
import { Draggable } from '@hello-pangea/dnd';

interface Props{
    todo:ToDo;
    handleTodoCheck:(id:string)=>void;
    handleTodoDelete:(id:string)=>void;
    handleTodoEdit:(id:string,name:string)=>void;
    todoIndex:number;
}

export function TodoItem(props:Props){
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>("");
    const handleEditToggle = ()=>{
        setIsEdit(prevIsEdit=>!prevIsEdit);
        setEditText("");
    };
    const handleEditTextUpdate = (e:React.ChangeEvent<HTMLInputElement>):void=>{
        setEditText(e.target.value);
    };

    const handleEditSubmit = (e:React.FormEvent<HTMLFormElement>):void=>{
        e.preventDefault();
        props.handleTodoEdit(props.todo.id,editText);
        handleEditToggle();
    }

    if(props.todo.isCompleted)
    {
         return (
            <Draggable draggableId={props.todo.id} index={props.todoIndex}>
                {
                    (provided)=>(
                        <div className="todoItem" ref={provided.innerRef} 
                        {...provided.draggableProps}{...provided.dragHandleProps}>
                            {isEdit?
                            <form onSubmit={(e)=>{handleEditSubmit(e)}}>
                                <input type="text" onChange={(e)=>{handleEditTextUpdate(e)}}/>
                            </form>:
                            <s>{props.todo.name}</s>}
                            <button className='icon' onClick={handleEditToggle}><AiFillEdit/></button>
                            <button className='icon' onClick={()=>{props.handleTodoDelete(props.todo.id)}}><AiFillDelete/></button>
                            <button className='icon' onClick={()=>{props.handleTodoCheck(props.todo.id)}}><AiOutlineUndo/></button>
                        </div>  
                    )
                }
                 
            </Draggable>
        )
    }
    else{
        return(
            <Draggable draggableId={props.todo.id} index={props.todoIndex}>
                {
                    (provided)=>(
                        <div className="todoItem" ref={provided.innerRef} 
                        {...provided.draggableProps}{...provided.dragHandleProps}>
                            {isEdit?
                            <form onSubmit={(e)=>{handleEditSubmit(e)}}>
                                <input type="text" className="editInput" onChange={(e)=>{handleEditTextUpdate(e)}}/>
                            </form>:
                            <span>{props.todo.name}</span>}
                            <button className='icon' onClick={handleEditToggle}><AiFillEdit/></button>
                            <button className='icon' onClick={()=>{props.handleTodoDelete(props.todo.id)}}><AiFillDelete/></button>
                            <button className='icon' onClick={()=>{props.handleTodoCheck(props.todo.id)}}><MdDone/></button>
                        </div>
                    )
                }
            </Draggable>
        )
    }        
}