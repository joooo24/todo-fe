import React, { useState } from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ tasks, updateTask, deleteTask, loginUserData }) => {
    const [filter, setFilter] = useState("All");

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };
    return (
        <div className="todo-board">
            <div className="tab-container">
                <h2>Todo List
                </h2>
                <ul className="tab-wrap">
                    <li
                        className={filter === "All" ? "active" : ""}
                        onClick={() => handleFilterChange("All")}
                    >
                        All
                    </li>
                    <li
                        className={filter === "Pending" ? "active" : ""}
                        onClick={() => handleFilterChange("Pending")}
                    >
                        미완료
                    </li>
                    <li
                        className={filter === "Complete" ? "active" : ""}
                        onClick={() => handleFilterChange("Complete")}
                    >
                        완료
                    </li>
                </ul>
            </div>
            {tasks.length > 0 ?
                <TodoItem loginUserData={loginUserData} tasksData={tasks} updateTask={updateTask} deleteTask={deleteTask} filter={filter} />
                :
                <h2>할 일 목록이 없습니다.</h2>}
        </div>
    );
};

export default TodoBoard;
