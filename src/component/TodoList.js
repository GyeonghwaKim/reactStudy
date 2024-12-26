import TodoItem from "./TodoItem";
import "./TodoList.css";
import {useMemo, useState } from "react";

const TodoList = ({todo, onUpdate, onDelete}) =>{
    const [search,setSerach]=useState("");
    const onChangeSearch= (e) =>{
        setSerach(e.target.value)
    };

    const getSearchResult = () =>{
        return search === "" ? todo : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    };

    const analyzeTodo =useMemo( ()=> {
        console.log("analyzeTodo 함수 호출")
        const totalcount= todo.length;
        const doneCount=todo.filter((it)=> it.isDone).length;
        const notDoneCount=totalcount-doneCount;
        return {
            totalcount,
            doneCount,
            notDoneCount
        };
    },[todo]);

    const {totalcount,doneCount,notDoneCount} = analyzeTodo;

    return (
        <div className="TodoList">
            <h4>Todo List</h4>
<div>
    <div>총개수: {totalcount}</div>
    <div>완료된 할 일: {doneCount}</div>
    <div>아직 완료하지 못한 할 일일: {notDoneCount}</div>
</div>

            <input value={search}
            onChange={onChangeSearch}
             className="searchbar" placeholder="검색어를 입력하세요" />
            <div className="list_wrapper">
                {getSearchResult().map((it)=>(
                    <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete}/>
                ))}
            </div>
        </div>
    );
};
export default TodoList;