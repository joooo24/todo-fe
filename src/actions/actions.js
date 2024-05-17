// actions.js

export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const updateTask = (taskId, isChecked) => {
  return {
    type: UPDATE_TASK,
    payload: { taskId, isChecked },
  };
};

export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId,
  };
};
