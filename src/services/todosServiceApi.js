import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import getAuthToken from '../helpers/getAuthToken';

export const todosServiceApi = createApi({
    reducerPath: 'todosServiceApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BACKEND_URL }),
    tagTypes: ['Todos'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => {
                return {
                    url: '/todos',
                    method: 'GET',
                    headers: { Authorization: `Bearer ${getAuthToken()}` }
                }
            },
            transformResponse: (response) => response.sort((a, b) => b.id - a.id), // Преобразование ответа
            providesTags: (result, error) => error ? [] : ['Todos'], // Теги для кэширования
        }),
        addTask: builder.mutation({
            query: title => {
                return {
                    url: '/todos',
                    method: 'POST',
                    headers: { Authorization: `Bearer ${getAuthToken()}` },
                    body: { title }
                }
            },
            invalidatesTags: (result, error) => error ? [] : ['Todos']
        }),
        updateTask: builder.mutation({
            query: ({ id, newText }) => {
                return {
                    url: `/todos/${id}`,
                    method: 'PATCH',
                    headers: { Authorization: `Bearer ${getAuthToken()}` },
                    body: { title: newText }
                }
            },
            invalidatesTags: (result, error) => error ? [] : ['Todos']
        }),
        completeTask: builder.mutation({
            query: id => {
                return {
                    url: `/todos/${id}/isCompleted`,
                    method: 'PATCH',
                    headers: { Authorization: `Bearer ${getAuthToken()}` }
                }
            },
            invalidatesTags: (result, error) => error ? [] : ['Todos']
        }),
        deleteTask: builder.mutation({
            query: id => {
                return {
                    url: `/todos/${id}`,
                    method: 'DELETE',
                    headers: { Authorization: `Bearer ${getAuthToken()}` }
                }
            },
            invalidatesTags: (result, error) => error ? [] : ['Todos']
        })
    }),
});

export const { useGetTodosQuery, useAddTaskMutation, useUpdateTaskMutation, useCompleteTaskMutation, useDeleteTaskMutation } = todosServiceApi;