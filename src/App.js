
import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
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
