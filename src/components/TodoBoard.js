import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";

const TodoBoard = () => {
    const tasks = useSelector((state) => state.tasks);

    return (
        <div>
            <h2>Todo List</h2>
            {tasks.length > 0 ? (
                <TodoItem tasksData={tasks} />
            ) : (
                <h2>할 일 목록이 없습니다.</h2>
            )}
        </div>
    );
};

export default TodoBoard;