import { API_URL } from '../config.js'
import { usersRequested, usersLoading, usersLoaded, usersFailed } from './usersSlice.js'

async function loadUsers(api) {
  const requestId = crypto.randomUUID()
  api.dispatch(usersLoading({ requestId }))
  try {
    const response = await fetch(API_URL + '/users')
    if (!response.ok) throw new Error(`Ошибка HTTP ${response.status}`)
    const items = await response.json()
    if (!Array.isArray(items) || items.some(user => typeof user.id !== 'string' || typeof user.name !== 'string' || typeof user.email !== 'string')) throw new Error('Неверный список участников')
    api.dispatch(usersLoaded({ requestId, items }))
  } catch (error) {
    api.dispatch(usersFailed({ requestId, message: error instanceof Error ? error.message : 'Ошибка загрузки участников' }))
  }
}

export default api => next => action => {
  const result = next(action)
  if (usersRequested.match(action) && api.getState().users.status !== 'loading') void loadUsers(api)
  return result
}
