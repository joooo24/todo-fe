// reducers.js

import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from "./../actions/actions";

const initialState = {
    tasks: [],
};

const todoReducer = (state = initialState, action) => {
    let { type, payload } = action;
    switch (type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, payload],
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === payload.taskId
                        ? { ...task, isComplete: payload.isChecked }
                        : task
                ),
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== payload),
            };
        default:
            return state;
    }
};

export default todoReducer;