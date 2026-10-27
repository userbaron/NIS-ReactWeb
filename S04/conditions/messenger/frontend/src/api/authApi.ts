import axios from 'axios'
import type { User } from '../types'
import { readData } from '../helpers/readResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export type LoginPayload = { phone: string; password: string }
export type LoginResponse = { token: string; user: User }

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await axios.post(API_URL + '/auth/login', payload)
  const data = readData<LoginResponse>(response.data)
  if (typeof data.token !== 'string' || !data.token.trim() || !data.user) throw new Error('В ответе нет токена или пользователя')
  return data
}
