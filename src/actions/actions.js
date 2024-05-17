// actions.js

// 액션 타입 상수 정의
export const ADD_TASK = "ADD_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

// 할일 추가 액션 생성자 함수
export const addTask = (task) => {
  return {
    type: ADD_TASK,
    payload: task, // 새로운 할일 데이터
  };
};

// 할일 업데이트 액션 생성자 함수
export const updateTask = (taskId, isChecked) => {
  return {
    type: UPDATE_TASK,
    payload: { taskId, isChecked }, // 할일 아이디와 체크 여부
  };
};

// 할일 삭제 액션 생성자 함수
export const deleteTask = (taskId) => {
  return {
    type: DELETE_TASK,
    payload: taskId, // 삭제할 할일 아이디
  };
};
