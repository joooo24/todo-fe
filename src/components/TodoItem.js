import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ tasksData, updateTask, deleteTask, filter }) => {
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editValue, setEditValue] = useState("");

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
        updateTask(taskId, { isComplete: isChecked });
    };

    // 수정 모드로 전환 핸들러
    const handleEditClick = (taskId, currentTask) => {
        setEditingTaskId(taskId);
        setEditValue(currentTask);
    };

    // 수정 완료 핸들러
    const handleSaveClick = (taskId) => {
        updateTask(taskId, { task: editValue });
        setEditingTaskId(null);
        setEditValue("");
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

                        {/* 할 일 */}
                        <div className="todo-content">
                            {editingTaskId === todo._id ? (
                                <input
                                    className="input-box"
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                            ) : (
                                <span className="todo-task">
                                    {todo.task}
                                    {todo.author && (
                                        <span className="todo-by">by {todo.author.name}</span>
                                    )}
                                </span>
                            )}
                        </div>

                        {/* 수정/저장 버튼 */}
                        {editingTaskId === todo._id ? (
                            <button
                                className="button-save"
                                onClick={() => handleSaveClick(todo._id)}
                            >
                                저장
                            </button>
                        ) : (
                            <button
                                className="button-edit"
                                onClick={() => handleEditClick(todo._id, todo.task)}
                            >
                                수정
                            </button>
                        )}

                        {/* 삭제 버튼 */}
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
