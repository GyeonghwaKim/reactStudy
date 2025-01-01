import { TodoDispatchContext } from "../App";
import "./TodoItem.css";
import React, { useContext } from "react";
const TodoItem = ({id,content,isDone,createDate}) => {

    const {onDelete,onUpdate} = useContext(TodoDispatchContext)

    const onChangeCheckbox = () =>{
        onUpdate(id);
    }

    const onClickDelete = () =>{
        onDelete(id);
    }
    
console.log(`${id} TodoItem update`)
    return (
        <div className="TodoItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox}
                checked={isDone} type="checkbox"></input>
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createDate).toLocaleDateString()}</div>
            <div className="btn_col">
                <button onClick={onClickDelete}>삭제</button>
            </div>
        </div>
    )

}
//export default TodoItem;
export default React.memo(TodoItem);

//useMemo, React.memo, useCallBack