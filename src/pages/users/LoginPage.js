import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./users.scss";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // 로그인 로직
        console.log("로그인 성공", data);
    };

    return (
        <div className="form-container">
            <Form className="form-box" onSubmit={handleSubmit(onSubmit)}>
                <h1>로그인</h1>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        {...register("email", {
                            required: "이메일을 입력해 주세요.",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "유효한 이메일 주소를 입력해 주세요."
                            }
                        })}
                    />
                    {errors.email && <p className="error-message">{errors.email.message}</p>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: "비밀번호를 입력해 주세요." })}
                    />
                    {errors.password && <p className="error-message">{errors.password.message}</p>}
                </Form.Group>

                <div className="button-wrap">
                    <button type="submit" className="btn btn-submit">로그인</button>
                    <span>
                        계정이 없다면? <Link to="/register">회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
