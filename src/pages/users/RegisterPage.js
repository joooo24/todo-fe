import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./users.scss";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            // 비밀번호 입력 확인
            if (password !== rePassword) {
                throw new Error("패스워드가 일치하지 않습니다. 다시 입력해 주세요.");
            }

            // 회원가입 로직
            console.log("회원가입 성공");

        } catch (err) {
            setError(err.message)
            console.log("err.message", error)
        }
    }

    return (
        <div className="form-container">
            <Form className="form-box" onSubmit={handleSubmit}>
                <h1>회원가입</h1>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => { setName(event.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호 재입력</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="re-enter the password"
                        value={rePassword}
                        onChange={(event) => { setRePassword(event.target.value) }}
                    />
                </Form.Group>

                <button type="submit">회원가입</button>
            </Form>
        </div>
    );
};

export default RegisterPage;
