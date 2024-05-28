import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ tasksData, updateTask, deleteTask }) => {

    //  추가
    const handleCheckboxChange = (taskId, isChecked) => {
        updateTask(taskId, isChecked);
    };

    // 수정
    const handleEditClick = (taskId) => {
        deleteTask(taskId);
    };

    // 삭제
    const handleDeleteClick = (taskId) => {
        deleteTask(taskId);
    };

    return (
        <Row className="todo-item-wrap">
            <Col xs={12}>
                {tasksData.map((todo) => (
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
