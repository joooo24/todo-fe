import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {

    const [todoValue, settodoValue] = useState("");

    const handleAddClick = () => {
        console.log("### todoValue", todoValue);

        settodoValue("");
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
                        onChange={(event) => { settodoValue(event.target.value) }}
                    />
                </Col>
                <Col xs={12} sm={2}>
                    <button className="button-add" onClick={handleAddClick}>추가</button>
                </Col>
            </Row>

            <TodoBoard />
        </Container>
    );
}

export default App;
