import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import { useDispatch } from "react-redux";
import { fetchTasks, addTask } from "./actions/actions";

function App() {
    const dispatch = useDispatch();
    const [todoValue, setTodoValue] = useState("");

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleAddClick = () => {
        dispatch(addTask({ task: todoValue, isComplete: false }));
        setTodoValue("");
    };

    return (
        <div className="todo-container">
            <div className="add-item-wrap">
                <input
                    type="text"
                    placeholder="할일을 입력하세요"
                    className="input-box"
                    value={todoValue}
                    onChange={(event) => { setTodoValue(event.target.value) }}
                />
                <button className="button-add" onClick={handleAddClick}>추가</button>
            </div>
            <TodoBoard />
        </div>
    );
}

export default App;