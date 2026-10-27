export function readData<T>(data: unknown): T {
  if (!data || typeof data !== 'object') throw new Error('Пустой ответ или неверный JSON от сервера')
  return data as T
}

export async function readResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) throw new Error('Нужно войти заново')
  const text = await response.text()
  if (!text.trim()) throw new Error('Сервер вернул пустой ответ')
  let data
  try {
    data = JSON.parse(text)
  } catch {
    throw new Error('Сервер вернул некорректный JSON')
  }
  if (!response.ok) throw new Error(data?.message || `Ошибка запроса: ${response.status}`)
  return readData<T>(data)
}
