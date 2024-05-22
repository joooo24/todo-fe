import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const RegisterPage = () => {
    return (
        <div className="form-container">
            <Form className="form-box">
                <h1>회원가입</h1>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="string" placeholder="Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호 재입력</Form.Label>
                    <Form.Control type="password" placeholder="re-enter the password" />
                </Form.Group>

                <Button className="button-primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;
