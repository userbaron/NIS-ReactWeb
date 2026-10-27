import axios from 'axios'

export function handleError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) return 'Не удалось связаться с сервером'
    if (typeof error.response.data?.message === 'string') return error.response.data.message
    if (error.response.status === 401) return 'Нужно войти заново'
    return `Ошибка запроса: ${error.response.status}`
  }
  if (error instanceof TypeError) return 'Не удалось связаться с сервером'
  if (error instanceof Error) return error.message
  if (typeof error === 'string') return error
  return 'Не удалось выполнить запрос'
}
