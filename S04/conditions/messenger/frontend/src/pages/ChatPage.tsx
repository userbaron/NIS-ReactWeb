import { useEffect, useState } from 'react'
import type { Message } from '../types'
import { getMessages, sendMessage } from '../api/messageApi'
import { connectSocket } from '../api/socketClient'
import MessageList from '../components/MessageList'
import MessageInput from '../components/MessageInput'
import { handleError } from '../helpers/handleError'

export default function ChatPage({ token }: { token: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [socketStatus, setSocketStatus] = useState('disconnected')
  const [socketClient, setSocketClient] = useState<ReturnType<typeof connectSocket> | null>(null)
  const [method, setMethod] = useState('socket')
  const [attempt, setAttempt] = useState(0)

  function addMessage(message: Message) {
    setMessages(items => items.some(item => item.id === message.id) ? items : [...items, message])
  }

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setMessages([])
    setSocketStatus('disconnected')
    const client = connectSocket(token, {
      onMessage: message => { if (active) addMessage(message) },
      onStatus: status => { if (active) setSocketStatus(status) },
      onError: error => { if (active) setError(error) }
    })
    setSocketClient(client)
    getMessages(token).then(history => {
      if (active) setMessages(items => [...history, ...items.filter(item => !history.some(old => old.id === item.id))])
    }).catch(error => {
      if (active) setError(handleError(error))
    }).finally(() => {
      if (active) setLoading(false)
    })
    return () => {
      active = false
      client.disconnect()
    }
  }, [token, attempt])

  async function handleSend(text: string) {
    setError('')
    setSending(true)
    try {
      if (method === 'socket') {
        if (!socketClient) throw new Error('Сокет не подключён')
        socketClient.sendMessage(text)
      } else {
        addMessage(await sendMessage(token, text))
      }
      return true
    } catch (error) {
      setError(handleError(error))
      return false
    } finally {
      setSending(false)
    }
  }

  return <section>
    <h2>Чат</h2>
    <p role="status">Статус сокета: {socketStatus}</p>
    {socketStatus === 'disconnected' && <button onClick={() => setAttempt(attempt + 1)}>Переподключить</button>}
    {loading && <p>Загрузка сообщений...</p>}
    {error && <p role="alert">{error}</p>}
    <MessageList messages={messages} />
    <label>Отправка <select aria-label="Отправка" value={method} onChange={e => setMethod(e.target.value)} disabled={sending}>
      <option value="socket">WebSocket</option>
      <option value="http">HTTP</option>
    </select></label>
    <MessageInput onSend={handleSend} disabled={loading || sending || socketStatus !== 'connected'} />
  </section>
}
