import axios from 'axios'
import type { User } from '../types'
import { readData, readResponse } from '../helpers/readResponse'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export async function getProfile(token: string): Promise<User> {
  const response = await fetch(API_URL + '/users/me', { headers: { Authorization: `Bearer ${token}` } })
  return readResponse<User>(response)
}

export type UpdateProfilePayload = Pick<User, 'nickname' | 'bio'>

export async function updateProfile(token: string, data: UpdateProfilePayload): Promise<User> {
  const response = await axios.put(API_URL + '/users/me', data, { headers: { Authorization: `Bearer ${token}` } })
  return readData<User>(response.data)
}
