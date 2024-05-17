import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = () => {
  return (
    <div>
      <h2>Todo List</h2>
      <TodoItem/>
      <h2>There is no Item to show</h2>
    </div>
  );
};

export default TodoBoard;
