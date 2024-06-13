import { configureStore } from '@reduxjs/toolkit';
// import tasksWithSlice from './slices/taskSlice'
// import tasksWithReducer from './reducers/taskReducer'
// import todosSlice from './slices/todosSlice'

import todosSlice from "./slices/todosSlice";


// export const store = configureStore({
//     reducer: {
//         //tasksWithSlice: tasksWithSlice, // тут будет пример со Slice
//         //tasksWithReducer: tasksWithReducer, // тут будет пример с Reducer
//         todos: todosSlice // тут будет пример с createAsyncThunk
//     }
// })


const store = configureStore({
    reducer: {
        todos: todosSlice
    }
});

export default store;