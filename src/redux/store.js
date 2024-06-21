import { configureStore } from '@reduxjs/toolkit';

import { todosServiceApi } from '../services/todosServiceApi';
import responsesStateHandlerSlice from './slices/responsesStateHandlerSlice';

const store = configureStore({
    reducer: {
        [todosServiceApi.reducerPath]: todosServiceApi.reducer,
        status: responsesStateHandlerSlice
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(todosServiceApi.middleware)
});

export default store;