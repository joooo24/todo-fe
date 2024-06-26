import React, { useState, useEffect } from "react";
import api from "./../utils/api";
import TodoBoard from './../components/TodoBoard';

const TodoPage = ({ loginUserData, setLoginUserData }) => {

    // 할일 가져오는 함수
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        try {
            const response = await api.get("/tasks");
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
            const response = await api.post("/tasks", { task: todoValue, isComplete: false });
            console.log("### addTask response", response.data.data);
            getTasks();
        } catch (error) {
            console.error('할일 추가에 실패했습니다:', error);
        }
    };

    // 할일 업데이트 함수
    const updateTask = async (taskId, updateData) => {
        try {
            // 서버에 업데이트된 데이터를 보냄
            await api.put(`/tasks/${taskId}`, updateData);
            console.log("!!!!!!! updateData", updateData)
            getTasks();
        } catch (error) {
            console.error('할일 업데이트에 실패했습니다:', error);
        }
    };

    // 할일 삭제 함수
    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`)
            getTasks();
        } catch (error) {
            console.error('할일 삭제에 실패했습니다:', error);
        }
    }

    // 로그아웃 함수
    const userLogout = async () => {
        sessionStorage.clear();
        setLoginUserData(null) // PrivateRoute 라우팅 시 필요한 키 값
    }

    // 추가 버튼 클릭 시 이벤트 핸들러
    const handleAddClick = () => {
        console.log("### todoValue", todoValue);
        addTask();
        setTodoValue("");
    };
    return (
        <div className="todo-container">
            <div className="logout-wrap">
                <span className="user-name">{loginUserData.name}님</span>
                <span onClick={userLogout} className="btn-logout">로그아웃</span>
            </div>
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
            <TodoBoard loginUserData={loginUserData} tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
        </div>
    )
}

export default TodoPage
