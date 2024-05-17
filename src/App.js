import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "./utils/api";

function App() {

    // 할일 가져오는 함수
    const [tasks, setTasks] = useState([]);
    const getTasks = async () => {
        try {
            const response = await axios.get("/tasks");

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
            const response = await axios.post("/tasks", { task: todoValue, isComplete: false });

            console.log("### addTask response", response.data.data);
            // 추가 된 할일 목록 업데이트
            getTasks();
        } catch (error) {
            console.error('할일 추가에 실패했습니다:', error);
        }
    };

    // 추가 버튼 클릭 시 이벤트 핸들러
    const handleAddClick = () => {
        console.log("### todoValue", todoValue);
        addTask();
        setTodoValue("");
    };

    return (
        <Container>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        className="input-box"
                        value={todoValue}
                        onChange={(event) => { setTodoValue(event.target.value) }}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={handleAddClick}>추가</button>
                </Col>
            </Row>

            <TodoBoard tasks={tasks} />
        </Container>
    );
}

export default App;
