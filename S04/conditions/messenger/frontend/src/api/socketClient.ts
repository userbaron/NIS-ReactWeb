import type { Message } from '../types'
import { handleError } from '../helpers/handleError'

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001'

type SocketCallbacks = {
  onMessage: (message: Message) => void
  onStatus: (status: string) => void
  onError: (error: string) => void
}

export function connectSocket(token: string, callbacks: SocketCallbacks) {
  const socket = new WebSocket(WS_URL)
  socket.onopen = () => callbacks.onStatus('connected')
  socket.onclose = () => callbacks.onStatus('disconnected')
  socket.onerror = () => callbacks.onError('Ошибка соединения с WebSocket')
  socket.onmessage = event => {
    try {
      const data = JSON.parse(event.data)
      if (data.type === 'message:new') callbacks.onMessage(data.payload)
      if (data.type === 'error') callbacks.onError(String(data.payload))
    } catch (error) {
      callbacks.onError(handleError(error))
    }
  }

  return {
    sendMessage(text: string) {
      if (socket.readyState !== WebSocket.OPEN) throw new Error('Сокет не подключён')
      socket.send(JSON.stringify({ type: 'message:send', payload: { text, token } }))
    },
    disconnect() {
      socket.onopen = null
      socket.onmessage = null
      socket.onerror = null
      socket.onclose = null
      socket.close()
    }
  }
}
