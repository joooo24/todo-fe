import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ tasksData, updateTask, deleteTask, filter }) => {

    // 필터링된 할 일 목록을 반환하는 함수
    const getFilteredTasks = () => {
        switch (filter) {
            case "Pending":
                return tasksData.filter(task => !task.isComplete);
            case "Complete":
                return tasksData.filter(task => task.isComplete);
            default:
                return tasksData;
        }
    };

    // 필터링된 할 일 목록
    const filteredTasks = getFilteredTasks();

    // 할 일 완료 상태 변경
    const handleCheckboxChange = (taskId, isChecked) => {
        updateTask(taskId, isChecked);
    };

    // 할 일 수정 핸들러
    const handleEditClick = (taskId) => {
        deleteTask(taskId);
    };

    // 할 일 삭제 핸들러
    const handleDeleteClick = (taskId) => {
        deleteTask(taskId);
    };

    return (
        <Row className="todo-item-wrap">
            <Col xs={12}>
                {filteredTasks.map((todo) => (
                    <div
                        className={`todo-item ${todo.isComplete ? "complete" : ""}`}
                        key={todo._id}
                    >
                        <input
                            type="checkbox"
                            checked={todo.isComplete}
                            onChange={(event) =>
                                handleCheckboxChange(todo._id, event.target.checked)
                            }
                        />
                        <div className="todo-content">
                            <span className="todo-task">
                                {todo.task}
                                {todo.author && (
                                    <span className="todo-by">by {todo.author.name}</span>
                                )}
                            </span>
                        </div>
                        <button
                            className="button-update"
                            onClick={() => handleEditClick(todo._id)}
                        >
                            수정
                        </button>
                        <button
                            className="button-delete"
                            onClick={() => handleDeleteClick(todo._id)}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </Col>
        </Row>
    );
};

export default TodoItem;
