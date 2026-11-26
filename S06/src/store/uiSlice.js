import { createSelector, createSlice } from '@reduxjs/toolkit'
import { selectUsers } from './usersSlice.js'

function readFavorites() {
  try {
    const ids = JSON.parse(localStorage.getItem('tracker-favorites'))
    return Array.isArray(ids) ? [...new Set(ids.filter(id => typeof id === 'string'))] : []
  } catch {
    return []
  }
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { favoriteUserIds: readFavorites() },
  reducers: {
    toggleFavorite(state, { payload: id }) {
      state.favoriteUserIds = state.favoriteUserIds.includes(id) ? state.favoriteUserIds.filter(value => value !== id) : [...state.favoriteUserIds, id]
    },
  },
})

export const { toggleFavorite } = uiSlice.actions
export const selectFavoriteIds = state => state.ui.favoriteUserIds
export const selectFavoriteUsers = createSelector([selectUsers, selectFavoriteIds], (users, ids) => users.filter(user => ids.includes(user.id)))
export const selectFavoriteCount = createSelector([selectFavoriteIds], ids => ids.length)
export default uiSlice.reducer
