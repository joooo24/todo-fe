import React from "react";
import { Routes, Route } from "react-router-dom";
import RegisterPage from './pages/users/RegisterPage';
import LoginPage from "./pages/users/LoginPage";
import TodoPage from "./pages/TodoPage";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<TodoPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    );
}

export default App;
