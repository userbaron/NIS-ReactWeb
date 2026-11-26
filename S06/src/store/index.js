import { configureStore } from '@reduxjs/toolkit'
import users from './usersSlice.js'
import ui from './uiSlice.js'
import usersMiddleware from './usersMiddleware.js'
import { tasksApi } from './tasksApi.js'

export const store = configureStore({
  reducer: { users, ui, [tasksApi.reducerPath]: tasksApi.reducer },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(usersMiddleware, tasksApi.middleware),
})

store.subscribe(() => {
  try {
    localStorage.setItem('tracker-favorites', JSON.stringify(store.getState().ui.favoriteUserIds))
  } catch {}
})
