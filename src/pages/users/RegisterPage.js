import React from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import "./users.scss";
import api from "../../utils/api";

const RegisterPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        // 회원가입 로직
        try {
            const response = await api.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password
            });
            console.log("### 회원가입 성공", response.data);

        } catch (error) {
            console.error("### 회원가입 실패", error);
        }
    };

    const password = watch("password");

    return (
        <div className="form-container">
            <Form className="form-box" onSubmit={handleSubmit(onSubmit)}>
                <h1>회원가입</h1>

                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>이름</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Name"
                        {...register("name", { required: "이름을 입력해 주세요." })}
                    />
                    {errors.name && <p className="error-message">{errors.name.message}</p>}
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                    <Form.Label>비밀번호 재입력</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Re-enter password"
                        {...register("rePassword", {
                            required: "비밀번호를 다시 입력해 주세요.",
                            validate: (value) =>
                                value === password || "패스워드가 일치하지 않습니다. 다시 입력해 주세요."
                        })}
                    />
                    {errors.rePassword && <p className="error-message">{errors.rePassword.message}</p>}
                </Form.Group>

                <button type="submit">회원가입</button>
            </Form>
        </div>
    );
};

export default RegisterPage;
