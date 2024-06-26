import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import { Link, Navigate } from "react-router-dom";
import "./users.scss";
import api from "../../utils/api";
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

const LoginPage = ({ setLoginUserData, loginUserData }) => {
    const {
        register,
        handleSubmit,
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
        // 로그인 로직
        try {
            const response = await api.post("/users/login", {
                email: data.email,
                password: data.password,
            });

            if (response.status === 200) {
                // 유저 정보 저장
                setLoginUserData(response.data.user);

                // 세션 스토리지에 토큰을 저장
                sessionStorage.setItem("token", response.data.token);

                // 헤더에 토큰 값 저장
                api.defaults.headers["Authorization"] = "Bearer " + response.data.token;
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            handleOpenModal(`${error.message}.`);
        }
    };

    // 유저 정보 있을 경우 Navigate로 페이지 이동
    if (loginUserData) {
        return <Navigate to="/" />;
    }

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

                <div className="button-wrap">
                    <button type="submit" className="btn btn-submit">
                        로그인
                    </button>
                    <p>
                        계정이 없다면? <Link to="/register">회원가입 하기</Link>
                    </p>
                    <p className="notice">
                        <b>tester ID/PW</b>
                        <br />
                        ID: jhj@test.com / PW: 123
                    </p>
                </div>
            </Form>

            {/* 모달 */}
            <AlertModal isOpen={isAlertOpen} onClose={handleCloseModal} message={alertMessage} />
        </div>
    );
};

export default LoginPage;
