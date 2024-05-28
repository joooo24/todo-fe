import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import "./users.scss";
import api from "../../utils/api";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";

const AlertModal = ({ isOpen, onClose, message }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="modal-wrap">
                <h2 className="modal-title">알림</h2>
                <p>{message}</p>
                <button onClick={onClose} className="btn">
                    확인
                </button>
            </div>
        </Modal>
    );
};

const RegisterPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    // 모달 닫기
    const handleCloseModal = () => {
        setIsAlertOpen(false);
    };

    // 모달 열기
    const handleOpenModal = (message) => {
        setAlertMessage(message);
        setIsAlertOpen(true);
    };

    const onSubmit = async (data) => {
        // 회원가입 로직
        try {
            const response = await api.post("/users", {
                name: data.name,
                email: data.email,
                password: data.password,
            });

            // 모달 설정
            handleOpenModal(`${response.data.name}님. 회원가입이 성공적으로 완료되었습니다.`);
            navigate(`/login`);
        } catch (error) {
            handleOpenModal(`${error.message}. 다시 시도해주세요.`);
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
                                message: "유효한 이메일 주소를 입력해 주세요.",
                            },
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
                                value === password || "패스워드가 일치하지 않습니다. 다시 입력해 주세요.",
                        })}
                    />
                    {errors.rePassword && <p className="error-message">{errors.rePassword.message}</p>}
                </Form.Group>

                <button type="submit" className="btn btn-submit">
                    가입하기
                </button>
            </Form>
            <div className="notice">비밀번호는 안전하게 암호화되어 저장됩니다.</div>
            <Link to="/login" className="link-login">로그인 하기</Link>

            {/* 모달 */}
            <AlertModal isOpen={isAlertOpen} onClose={handleCloseModal} message={alertMessage} />
        </div>
    );
};

export default RegisterPage;
