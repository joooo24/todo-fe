import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import "./users.scss";
import api from "../../utils/api";
import Modal from "react-modal";

const AlertModal = ({ isOpen, onClose, message }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <div className="modal-wrap">
                <h2 className="modal-title">알림</h2>
                <p>{message}</p>
                <button onClick={onClose} className="btn">확인</button>
            </div>
        </Modal>
    );
};

const LoginPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [loginUser, setLoginUser] = useState("");

    // 모달 닫기
    const handleCloseModal = () => {
        setIsAlertOpen(false);
    };

    // 모달 열기
    const handleOpenModal = (message) => {
        setAlertMessage(message);
        setIsAlertOpen(true);
    };

    // 세션 스토리지에 토큰을 저장
    const saveTokenToSessionStorage = (token) => {
        sessionStorage.setItem('token', token);
    };

    const onSubmit = async (data) => {
        // 로그인 로직
        try {
            const response = await api.post("/users/login", {
                email: data.email,
                password: data.password
            })

            if (response.status === 200) {
                setLoginUser(response.data.user)
                saveTokenToSessionStorage(response.data.token)
                console.log("### loginUser:", loginUser);
                console.log("### loginUserToken:", sessionStorage.getItem('token'));
                navigate(`/`);
            }

        } catch (error) {
            handleOpenModal(`${error.message}.`);
        }

        ;
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

            {/* 모달 */}
            <AlertModal
                isOpen={isAlertOpen}
                onClose={handleCloseModal}
                message={alertMessage}
            />
        </div>
    );
};

export default LoginPage;
