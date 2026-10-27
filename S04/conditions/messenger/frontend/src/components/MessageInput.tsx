import { useState, type FormEvent } from 'react'

type Props = {
  onSend: (text: string) => Promise<boolean>
  disabled: boolean
}

export default function MessageInput({ onSend, disabled }: Props) {
  const [text, setText] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (disabled || !text.trim()) return
    if (await onSend(text.trim())) setText('')
  }

  return <form className="message-input" onSubmit={handleSubmit}>
    <input aria-label="Сообщение" placeholder="Введите сообщение" value={text} onChange={e => setText(e.target.value)} disabled={disabled} />
    <button disabled={disabled || !text.trim()}>Отправить</button>
  </form>
}
