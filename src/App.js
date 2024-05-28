import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/users/RegisterPage';
import LoginPage from "./pages/users/LoginPage";
import TodoPage from "./pages/TodoPage";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import PrivateRouter from "./route/PrivateRouter";
import api from "./utils/api";

function App() {
    const [loginUserData, setLoginUserData] = useState(null);

    useEffect(() => {
        getLoginUserData();
    }, []);

    // 세션스토리지에 저장된 토큰으로 사용자 데이터 설정
    const getLoginUserData = async () => {
        try {
            const storageToken = sessionStorage.getItem("token")

            if (storageToken) {
                const response = await api.get("/users/me");
                setLoginUserData(response.data.userData);
            }
        } catch (error) {
            setLoginUserData(null);
            console.log("error", error.message);
        }
    }

    return (
        <Routes>
            <Route path="/"
                element={
                    <PrivateRouter loginUserData={loginUserData}>
                        <TodoPage setLoginUserData={setLoginUserData} loginUserData={loginUserData} />
                    </PrivateRouter>
                }
            />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/login"
                element={<LoginPage setLoginUserData={setLoginUserData} loginUserData={loginUserData} />}
            />
        </Routes>
    );
}

export default App;
