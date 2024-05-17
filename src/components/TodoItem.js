import React, { useState, useEffect } from "react";
import axios from "./../utils/api";
import { Col, Row } from "react-bootstrap";

const TodoItem = () => {
    const [todoData, setTodoData] = useState([]);

    const getTasks = async () => {
        try {
            const response = await axios.get("/tasks");
            console.log("### response", response.data.data);

            setTodoData(response.data.data);
        } catch (error) {
            console.error('Failed to fetch todo data:', error);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    useEffect(() => {
        console.log("### todoData", todoData);
    }, [todoData]);

    return (
        <Row>
            <Col xs={12}>
                {todoData.map(todo => (
                    <div className="todo-item" key={todo.id}>
                        <input type="checkbox" checked={todo.isComplete}/>
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
