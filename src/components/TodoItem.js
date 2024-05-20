import React from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { updateTask, deleteTask } from "./../actions/actions";

const TodoItem = ({ tasksData }) => {
    const dispatch = useDispatch();

    const handleCheckboxChange = (taskId, isChecked) => {
        dispatch(updateTask(taskId, isChecked));
    };

    const handleDeleteClick = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    return (
        <Row>
            <Col xs={12}>
                {tasksData.map((todo) => (
                    <div className={`todo-item ${todo.isComplete ? 'complete' : ''}`} key={todo._id}>
                        <input
                            type="checkbox"
                            checked={todo.isComplete}
                            onChange={(event) => handleCheckboxChange(todo._id, event.target.checked)}
                        />
                        <div className="todo-content">{todo.task}</div>
                        <div>
                            <button className="button-delete" onClick={() => handleDeleteClick(todo._id)}>삭제</button>
                        </div>
                    </div>
                ))}
            </Col>
        </Row>
    );
};

export default TodoItem;
