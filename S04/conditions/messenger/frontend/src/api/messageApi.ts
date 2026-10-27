import axios from 'axios'
import type { Message } from '../types'
import { readData, readResponse } from '../helpers/readResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function getMessages(token: string): Promise<Message[]> {
  const response = await fetch(API_URL + '/messages', { headers: { Authorization: `Bearer ${token}` } })
  const messages = await readResponse<Message[]>(response)
  if (!Array.isArray(messages)) throw new Error('Сервер вернул неверный список сообщений')
  return messages
}

export async function sendMessage(token: string, text: string): Promise<Message> {
  const response = await axios.post(API_URL + '/messages', { text }, { headers: { Authorization: `Bearer ${token}` } })
  return readData<Message>(response.data)
}
