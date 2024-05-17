import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoBoard from "./components/TodoBoard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

function App() {

    const [inputValue, setInputValue] = useState("");

    const handleAddClick = () => {
        console.log("### inputValue", inputValue);

        setInputValue("");
    };

    return (
        <Container>
            <Row className="add-item-row">
                <Col xs={12} sm={10}>
                    <input
                        type="text"
                        placeholder="할일을 입력하세요"
                        className="input-box"
                        value={inputValue}
                        onChange={(event) => { setInputValue(event.target.value) }}
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
