import {TodoDispatchContext } from "../App";
import "./TodoEditor.css";
import { useState,useRef, useContext } from "react";

const TodoEditor  = () =>{

    const {onCreate} = useContext(TodoDispatchContext);
    const [content,setContent]= useState("");

    //useRef - 돔요소에 접근
    const inputRef=useRef();

    const onChangeContent=(e)=>{
        //console.log(e);
        setContent(e.target.value);
    }

    //추가버튼
    const onSubmit1= ()=>{

        //빈값 추가 막기
        if(!content){
            inputRef.current.focus();
            return;
        }

        onCreate(content);
        setContent("");
    }

    //enter 키
    const onKeyDown1= (e) =>{
        if(e.keyCode ===13){
            onSubmit1();
        }
    }

    return <div className="TodoEditor">

                <h4>새로운 Todo 작성하기</h4>
                <div className="editor_wrapper">
                    <input 
                        ref={inputRef}
                        value={content}
                        onChange={onChangeContent}
                        onKeyDown={onKeyDown1}
                        placeholder="새로운 Todo.." />
                    <button onClick={onSubmit1}>추가</button>
                </div>
            </div>
}

export default TodoEditor;