import { useReducer } from "react"

//상태관리를 위해
function reducer(state,action){

    switch(action.type){
        case "INCREASE":
            return state+action.data;
        case "DECREASE":
            return state-action.data;
        case "INIT":
            return 0;
        default:
            return state;
    }

}

function TestComp() {
    //const [state 변수, 상태 변화 촉발 함수] = 생성자(상태변화함수,초기값)
    const [count,dispatch] = useReducer(reducer,0);

    return(
        <div>
            <h4>테스트 컴포넌트</h4>
            <div>
                <bold>{count}</bold>
            </div>
            <div>
                <button onClick={()=>{
                    dispatch({type:"INCREASE",data:1})
                }}>+</button>
                <button>-</button>
            </div>
        </div>
    )

}

export default TestComp;