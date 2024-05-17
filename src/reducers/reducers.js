// reducers.js

import { ADD_TASK, UPDATE_TASK, DELETE_TASK, SET_TASKS } from "./../actions/actions";

const initialState = {
    tasks: [],
};

// todoReducer 함수 정의
const todoReducer = (state = initialState, action) => {
    let { type, payload } = action;

    switch (type) {
        // 할일 목록 설정
        case SET_TASKS:
            return {
                ...state,
                tasks: payload,
            };

        // 추가
        case ADD_TASK:
            // 기존 상태(state)의 tasks 배열에 새로운 할일(payload) 추가하여 반환
            return {
                ...state,
                tasks: [...state.tasks, payload],
            };

        // 수정
        case UPDATE_TASK:
            // 기존 상태(state)의 tasks 배열을 순회하면서 해당 taskId에 해당하는 할일을 업데이트
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    // 만약 taskId가 payload의 taskId와 일치한다면 해당 할일을 업데이트하고, 그렇지 않으면 그대로 유지
                    task._id === payload.taskId
                        ? { ...task, isComplete: payload.isChecked }
                        : task
                ),
            };

        // 삭제
        case DELETE_TASK:
            // 기존 상태(state)의 tasks 배열에서 payload의 taskId에 해당하는 할일을 필터링하여 제거한 후 반환
            return {
                ...state,
                tasks: state.tasks.filter((task) => task._id !== payload),
            };
        default:
            return state;
    }
};

export default todoReducer;