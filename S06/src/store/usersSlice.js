import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: { items: [], status: 'idle', error: null, requestId: null },
  reducers: {
    usersRequested() {},
    usersLoading(state, { payload }) {
      state.status = 'loading'
      state.error = null
      state.requestId = payload.requestId
    },
    usersLoaded(state, { payload }) {
      if (state.requestId !== payload.requestId) return
      state.items = payload.items
      state.status = 'succeeded'
    },
    usersFailed(state, { payload }) {
      if (state.requestId !== payload.requestId) return
      state.status = 'failed'
      state.error = payload.message
    },
  },
})

export const { usersRequested, usersLoading, usersLoaded, usersFailed } = usersSlice.actions
export const selectUsers = state => state.users.items
export const selectUserById = (state, id) => state.users.items.find(user => user.id === id)
export default usersSlice.reducer
