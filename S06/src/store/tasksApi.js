import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../config.js'

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Task'],
  keepUnusedDataFor: 60,
  endpoints: build => ({
    getTasks: build.query({
      query: params => ({ url: '/tasks', params }),
      providesTags: (items = []) => [{ type: 'Task', id: 'LIST' }, ...items.map(({ id }) => ({ type: 'Task', id }))],
    }),
    getTask: build.query({
      query: id => '/tasks/' + encodeURIComponent(id),
      providesTags: (_result, _error, id) => [{ type: 'Task', id }],
    }),
    addTask: build.mutation({
      query: body => ({ url: '/tasks', method: 'POST', body }),
      invalidatesTags: (_result, error) => error ? [] : [{ type: 'Task', id: 'LIST' }],
    }),
    updateTask: build.mutation({
      query: ({ id, ...body }) => ({ url: '/tasks/' + encodeURIComponent(id), method: 'PATCH', body }),
      invalidatesTags: (_result, error, { id }) => error ? [] : [{ type: 'Task', id }, { type: 'Task', id: 'LIST' }],
    }),
    deleteTask: build.mutation({
      query: id => ({ url: '/tasks/' + encodeURIComponent(id), method: 'DELETE' }),
      invalidatesTags: (_result, error, id) => error ? [] : [{ type: 'Task', id }, { type: 'Task', id: 'LIST' }],
    }),
  }),
})

export const { useGetTasksQuery, useGetTaskQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi
