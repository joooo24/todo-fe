import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import axios from "./utils/api";

function App() {

    // 할일 가져오는 함수
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        try {
            const response = await axios.get("/tasks");
            setTasks(response.data.data);
        } catch (error) {
            console.error('할일 목록을 불러오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    // 할일 추가 함수
    const [todoValue, setTodoValue] = useState("");
    const addTask = async () => {
        try {
            // 서버에 추가된 todoValue 값을 보냄
            const response = await axios.post("/tasks", { task: todoValue, isComplete: false });
            console.log("### addTask response", response.data.data);
            getTasks();
        } catch (error) {
            console.error('할일 추가에 실패했습니다:', error);
        }
    };

    // 할일 업데이트 함수
    const updateTask = async (taskId, isChecked) => {
        try {
            // 서버에 업데이트된 isComplete 값을 보냄
            await axios.put(`/tasks/${taskId}`, { isComplete: isChecked });
            getTasks();
        } catch (error) {
            console.error('할일 업데이트에 실패했습니다:', error);
        }
    };

    // 할일 삭제 함수
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`/tasks/${taskId}`)
            getTasks();
        } catch (error) {
            console.error('할일 삭제에 실패했습니다:', error);
        }
    }

    // 추가 버튼 클릭 시 이벤트 핸들러
    const handleAddClick = () => {
        console.log("### todoValue", todoValue);
        addTask();
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

            {/* tasks데이터와 updateTask, deleteTask함수 전달 */}
            <TodoBoard tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
    );
}

export default App;
