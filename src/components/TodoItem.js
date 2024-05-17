import React from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ tasksData }) => {
    return (
        <Row>
            <Col xs={12}>
                {tasksData.map(todo => (
                    <div className="todo-item" key={todo.id}>
                        <input type="checkbox" checked={todo.isComplete} />
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
