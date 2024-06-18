import { createAction, createReducer, createAsyncThunk } from "@reduxjs/toolkit";
import API from '../../apis/todos.js';
import getErrorMessage from '../../helpers/getErrorMessage.js';


export const login = createAction('todos/login', () => {
    return {
        payload: new Date().toString()
    }
});

export const resetStore = createAction('todos/resetStore');

// Создаем асинхронное действие с помощью createAsyncThunk
const fetchGetTasks = createAsyncThunk('todos/fetchGetTasks', async (_, { rejectWithValue }) => {
    try {
        const { data } = await API.get('/todos');
        return data;
    } catch (error) {
        return rejectWithValue({ message: getErrorMessage(error) });
    }
});

const fetchPostTask = createAsyncThunk('todos/fetchPostTask', async (task, { rejectWithValue }) => {
    try {
        const { data } = await API.post('/todos', { title: task });
        return data;
    } catch (error) {
        return rejectWithValue({ message: getErrorMessage(error) });
    }
});

const fetchUpdateTask = createAsyncThunk('todos/fetchUpdateTask', async ({ id, newText }, { rejectWithValue }) => {
    try {
        const { data } = await API.patch(`/todos/${id}`, { title: newText });
        return data;
    } catch (error) {
        return rejectWithValue({ message: getErrorMessage(error) })
    }
});

const fetchCompleteTask = createAsyncThunk('todos/fetchCompleteTask', async (id, { rejectWithValue }) => {
    try {
        const { data } = await API.patch(`/todos/${id}/isCompleted`);
        return data;
    } catch (error) {
        return rejectWithValue({ message: getErrorMessage(error) })
    }
});

const fetchDeleteTasks = createAsyncThunk('todos/fetchDeleteTasks', async (id, { rejectWithValue }) => {
    try {
        const { data } = await API.delete(`/todos/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue({ message: getErrorMessage(error) })
    }
});

const initialState = {
    tasks: []
};

const todosReducer = createReducer(initialState, builder => {
    builder
        .addCase(login, (state, action) => {
            console.log(`Пользователь зашёл на страницу задач в ${action.payload}`);
        })
        .addCase(resetStore, (state, action) => {
            state.status = '';
            state.errorMsg = null;
            state.tasks = [];
        })
        .addCase(fetchGetTasks.pending, state => {
            state.status = 'loading';
            state.errorMsg = null;
        })
        .addCase(fetchGetTasks.fulfilled, (state, action) => {
            state.status = '';
            const sortedTasks = action.payload.sort((a, b) => b.id - a.id);
            state.tasks = sortedTasks;
        })
        .addCase(fetchGetTasks.rejected, ((state, action) => {
            state.status = 'failed';
            state.errorMsg = action.payload.message;
        }))
        .addCase(fetchPostTask.pending, state => {
            state.status = 'loading';
            state.errorMsg = null;
        })
        .addCase(fetchPostTask.fulfilled, (state, action) => {
            state.status = 'postSuccessful';
            state.tasks = [action.payload, ...state.tasks];
        })
        .addCase(fetchPostTask.rejected, ((state, action) => {
            state.status = 'failed';
            state.errorMsg = action.payload.message;
        }))
        .addCase(fetchUpdateTask.pending, state => {
            state.status = 'loading';
            state.errorMsg = null;
        })
        .addCase(fetchUpdateTask.fulfilled, (state, action) => {
            state.status = 'updateSuccessful';
            state.tasks = state.tasks.map(task =>
                task.id === action.payload.id ? action.payload : task
            );
        })
        .addCase(fetchUpdateTask.rejected, ((state, action) => {
            state.status = 'failed';
            state.errorMsg = action.payload.message;
        }))
        .addCase(fetchCompleteTask.pending, state => {
            state.status = 'loading';
            state.errorMsg = null;
        })
        .addCase(fetchCompleteTask.fulfilled, (state, action) => {
            state.status = 'updateSuccessful';
            state.tasks = state.tasks.map(task =>
                task.id === action.payload[0].id ? action.payload[0] : task
            );
        })
        .addCase(fetchCompleteTask.rejected, ((state, action) => {
            state.status = 'failed';
            state.errorMsg = action.payload.message;
        }))
        .addCase(fetchDeleteTasks.pending, state => {
            state.status = 'loading';
            state.errorMsg = null;
        })
        .addCase(fetchDeleteTasks.fulfilled, (state, action) => {
            state.status = 'deleteSuccessful';
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
        })
        .addCase(fetchDeleteTasks.rejected, ((state, action) => {
            state.status = 'failed';
            state.errorMsg = action.payload.message;
        }))

});

export { fetchGetTasks, fetchPostTask, fetchUpdateTask, fetchCompleteTask, fetchDeleteTasks };
export default todosReducer;