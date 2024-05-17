// actions.js

import axios from "../utils/api";

// 액션 타입 상수 정의
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const SET_TASKS = "SET_TASKS";

// 할일 목록 설정 액션
export const setTasks = (tasks) => {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};

// 할일 목록 가져오기 액션 (비동기)
export const fetchTasks = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/tasks");
      dispatch(setTasks(response.data.data));
    } catch (error) {
      console.error('할일 목록을 불러오는 데 실패했습니다:', error);
    }
  };
};

// 할일 추가 액션 생성자 함수
export const addTask = (task) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/tasks", task);
      dispatch({ type: ADD_TASK, payload: response.data.data });
    } catch (error) {
      console.error('할일 추가에 실패했습니다:', error);
    }
  };
};

// 할일 업데이트 액션 생성자 함수
export const updateTask = (taskId, isChecked) => {
  return async (dispatch) => {
    try {
      await axios.put(`/tasks/${taskId}`, { isComplete: isChecked });
      dispatch({ type: UPDATE_TASK, payload: { taskId, isChecked } });
    } catch (error) {
      console.error('할일 업데이트에 실패했습니다:', error);
    }
  };
};

// 할일 삭제 액션 생성자 함수
export const deleteTask = (taskId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/tasks/${taskId}`);
      dispatch({ type: DELETE_TASK, payload: taskId });
    } catch (error) {
      console.error('할일 삭제에 실패했습니다:', error);
    }
  };
};
