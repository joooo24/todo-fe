import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ tasksData, updateTask }) => {

    const handleCheckboxChange = (taskId, isChecked) => {
        // 해당 taskId에 해당하는 할일의 isComplete 값을 업데이트
        console.log("### taskId", taskId)
        console.log("### isChecked", isChecked)
        updateTask(taskId, isChecked);
    };

    return (
        <Row>
            <Col xs={12}>
                {tasksData.map((todo) => (
                    <div className="todo-item" key={todo._id}>
                        <input
                            type="checkbox"
                            checked={todo.isComplete}
                            onChange={(event) => handleCheckboxChange(todo._id, event.target.checked)}
                        />
                        <div className="todo-content">{todo.task}</div>
                        <div>
                            <button className="button-delete">삭제</button>
                        </div>
                    </div>
                ))}
            </Col>
        </Row>
    );
};

export default TodoItem;
