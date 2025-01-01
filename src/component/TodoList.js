import { useState,useMemo, useContext } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import { TodoStateContext } from "../App";

const TodoList = () =>{

    //const storeData=useContext(TodoContext);

    const todo =useContext(TodoStateContext);
    //console.log(storeData);
    //검색필터링
    const [search,setSerach] =useState("");
    const onChangeSearch = (e) =>{
        setSerach(e.target.value);
    }
    const getSearchResult= () =>{
        return search==="" ? todo : todo.filter((it) => 
            it.content.toLowerCase().includes(search.toLowerCase())
        );
    }

    //useMemo 의존성 배열 값이 변하지 않는이상 호출하지 않는다.
    //할일분석기능
    const analyzeTodo = useMemo(()=>{
        //콜백함수
        
        const totalCount=todo.length;
        const doneCount=todo.filter((it) => it.isDone).length;
        const notDoneCount=totalCount-doneCount;
        return {
            totalCount,doneCount,notDoneCount
        };},
        //의존성배열
        [todo]);
    

        //analyzeTodo는 useMemo를 쓰고 객체가 됨 analyzeTodo() x
    const {totalCount,doneCount,notDoneCount} = analyzeTodo;

    return(
        <div className="TodoList">
            <h4>Todo List</h4>
            <div>
                <div>총 개수: {totalCount}</div>
                <div>완료된 일: {doneCount}</div>
                <div>아직 완료하지 못한 일일: {notDoneCount}</div>
            </div>
            <input 
                value={search}
                onChange={onChangeSearch}
                className="searchbar"
                placeholder="검색어 입력"></input>
            <div className="list_wrapper">
                {getSearchResult().map((it) =>{
                    //key - 각각의 컴포넌트를 구분하기 위한 값
                    return <TodoItem key={it.id} {...it}/>
                })}
            </div>
        </div>
    )
}


TodoList.defaultProps={
    todo:[]
};
export default TodoList;

//고차 컴포넌트 - 강화된 컴포넌트를 반환하는 함수