import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import { todosServiceApi } from "../../services/todosServiceApi";
import getErrorMessage from "../../helpers/getErrorMessage";

const responsesStateHandlerSlice = createSlice({
    name: "responsesStateHandler",
    initialState: { errorMsg: '', successMsg: '', isLoading: false },
    reducers: {
        resetStatus: (state) => {
            state.errorMsg = "";
            state.successMsg = "";
            state.isLoading = false;
        },
        loginLogger: () => console.log(`Пользователь зашёл на страницу задач в ${new Date().toString()}`)
    },
    extraReducers: builder => {
        builder
            .addMatcher(
                isAnyOf(
                    todosServiceApi.endpoints.getTodos.matchRejected,
                    todosServiceApi.endpoints.addTask.matchRejected,
                    todosServiceApi.endpoints.completeTask.matchRejected,
                    todosServiceApi.endpoints.updateTask.matchRejected,
                    todosServiceApi.endpoints.deleteTask.matchRejected
                ),
                (state, { payload }) => {
                    state.errorMsg = getErrorMessage(payload);
                    state.isLoading = false;
                }
            )
            .addMatcher(
                isAnyOf(
                    todosServiceApi.endpoints.getTodos.matchPending,
                    todosServiceApi.endpoints.addTask.matchPending,
                    todosServiceApi.endpoints.completeTask.matchPending,
                    todosServiceApi.endpoints.updateTask.matchPending,
                    todosServiceApi.endpoints.deleteTask.matchPending
                ),
                (state, { payload }) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(todosServiceApi.endpoints.getTodos.matchFulfilled,
                (state, { payload }) => {
                    state.isLoading = false;
                }
            )
            .addMatcher(todosServiceApi.endpoints.addTask.matchFulfilled,
                (state, { payload }) => {
                    state.successMsg = "Task was added successfully";
                    state.isLoading = false;
                }
            )
            .addMatcher(todosServiceApi.endpoints.completeTask.matchFulfilled,
                (state, { payload }) => {
                    state.successMsg = "Task status was updated successfully";
                    state.isLoading = false;
                }
            )
            .addMatcher(todosServiceApi.endpoints.updateTask.matchFulfilled,
                (state, { payload }) => {
                    state.successMsg = "Task title was updated successfully";
                    state.isLoading = false;
                }
            )
            .addMatcher(todosServiceApi.endpoints.deleteTask.matchFulfilled,
                (state, { payload }) => {
                    state.successMsg = "Task was deleted successfully";
                    state.isLoading = false;
                }
            )
    }
});

export const { resetStatus, loginLogger } = responsesStateHandlerSlice.actions;
export default responsesStateHandlerSlice.reducer;