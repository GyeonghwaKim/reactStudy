import "./App.css";
import Header from "./component/Header";
import TodoEditor from "./component/TodoEditor";
import TodoList from "./component/TodoList";
import React,{ useCallback, useMemo, useReducer,useRef } from "react";

export const TodoStateContext=React.createContext();
export const TodoDispatchContext=React.createContext();

const mockTodo = [
    {
      id:0,
      isDone: false,
      content: "React 공부하기",
      createDate: new Date().getTime(),
    },
    {
      id:1,
      isDone: false,
      content: "빨래 널기",
      createDate: new Date().getTime(),
    },
    {
      id:2,
      isDone: false,
      content: "노래 연습하기",
      createDate: new Date().getTime(),
    },
    
  ]
  

function reducer (state,action){
  switch(action.type){
    case "CREATE":{
      return [action.newItem,...state]
    }
    case "UPDATE":{
      return state.map((it) => it.id === action.targetId? {...it,isDone: !it.isDone}:it)
    }
    case "DELETE":{
      //암시적반환? 명시적반환? 
      return state.filter((it) => 
        it.id !== action.targetId
      )
    }
    default:
      return state;
  }

}

function App(){

  
    //목데이터 추가
    //const [todo,setTodo]=useState(mockTodo);
    const [todo,dispatch]=useReducer(reducer,mockTodo);


    //중복아이디문제 해결을 위한 useRef
    const idRef=useRef(3);

    //생성기능
    const onCreate = (content) => {

      dispatch({
        type:"CREATE",
        newItem: {
              id:idRef.current,
              isDone: false,
              content,
              createDate: new Date().getTime(),
          },
      });
        // const newItem = {
        //     id:idRef.current,
        //     isDone: false,
        //     content,
        //     createDate: new Date().getTime(),
        // };
        // setTodo([newItem,...todo]);
        idRef.current+=1;
    };

    //수정기능
    const onUpdate = useCallback((targetId) => {

      dispatch({
        type:"UPDATE",
        targetId,
      })
      // setTodo(
      //   todo.map(
      //     (it) => it.id === targetId ? {...it,isDone: !it.isDone} : it
      //   )
      // );
    },[]);

    //삭제기능
    const onDelete = useCallback((targetId) =>{
      //setTodo(todo.filter((it) => it.id !== targetId));
      dispatch({
        type:"DELETE",
        targetId
      })
    },[]);


    const memoizedDispatchs = useMemo(() => {
      return { onCreate, onUpdate, onDelete };
    },[onUpdate,onDelete]);
  
    return <div className="App">
      {/* <TestComp /> */}
        <Header />
        <TodoStateContext.Provider value={todo}>
          <TodoDispatchContext.Provider value={memoizedDispatchs}>
            <TodoEditor />
            <TodoList />
          </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
        
    </div>;
}

export default App;