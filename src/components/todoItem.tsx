import { AiFillEdit,AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
interface Props{
    val:string;
}

export function TodoItem(props:Props){
    return(
        <div className="todoItem">
            <span>{props.val}</span>
            <span className='icon'><AiFillEdit/></span>
            <span className='icon'><AiFillDelete/></span>
            <span className='icon'><MdDone/></span>
        </div>
    )
}