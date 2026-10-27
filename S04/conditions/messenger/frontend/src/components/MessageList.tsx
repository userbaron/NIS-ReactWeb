import { useEffect, useRef } from 'react'
import type { Message } from '../types'

export default function MessageList({ messages }: { messages: Message[] }) {
  const listRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [messages])

  return <div className="messages" ref={listRef}>
    {!messages.length && <p>Нет сообщений</p>}
    {messages.map(message => <article key={message.id}>
      <strong>{message.author}</strong>
      <time dateTime={message.createdAt}>{new Date(message.createdAt).toLocaleString('ru-RU')}</time>
      <p>{message.text}</p>
    </article>)}
  </div>
}
