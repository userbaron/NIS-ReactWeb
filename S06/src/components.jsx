import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleFavorite, selectFavoriteIds } from './store/uiSlice'
import { statuses, statusLabels } from './models'

export function errorText(error) {
  if (typeof error === 'string') return error
  if (error?.status === 'FETCH_ERROR') return 'API недоступен. Запустите сервер и повторите запрос.'
  if (error?.status === 'PARSING_ERROR') return 'API вернул некорректный ответ.'
  return error?.data?.message || error?.error || 'Не удалось выполнить запрос. Проверьте, запущен ли API.'
}

export function ErrorBox({ error, onRetry }) {
  return <div className="error" role="alert">
    <p>{errorText(error)}</p>
    {onRetry && <button onClick={onRetry}>Повторить</button>}
  </div>
}

export function NotFound({ message = 'Страница не найдена' }) {
  return <section><h2>404 — {message}</h2><Link to="/users">К списку участников</Link></section>
}

export function FavoriteButton({ user }) {
  const dispatch = useDispatch()
  const selected = useSelector(selectFavoriteIds).includes(user.id)
  return <button aria-pressed={selected} onClick={() => dispatch(toggleFavorite(user.id))}>
    {selected ? 'Убрать из избранного' : 'В избранное'}
  </button>
}

export function UserCards({ users }) {
  return <div className="cards">
    {users.map(user => <article key={user.id}>
      <h3><Link to={`/users/${user.id}`}>{user.name}</Link></h3>
      <p>{user.email}</p>
      <div className="row"><Link to={`/users/${user.id}/tasks`}>Задачи</Link><FavoriteButton user={user} /></div>
    </article>)}
  </div>
}

export function TaskForm({ initialTitle = '', initialStatus = 'todo', onSave, busy, reset = false, label = 'Сохранить' }) {
  const [title, setTitle] = useState(initialTitle)
  const [status, setStatus] = useState(initialStatus)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    if (busy) return
    if (!title.trim()) return setError('Введите название задачи')
    setError('')
    const saved = await onSave({ title: title.trim(), status })
    if (saved && reset) {
      setTitle('')
      setStatus('todo')
    }
  }

  return <form onSubmit={submit} className="task-form">
    <label>Название задачи<input value={title} onChange={event => { setTitle(event.target.value); setError('') }} disabled={busy} /></label>
    <label>Статус<select value={status} onChange={event => setStatus(event.target.value)} disabled={busy}>
      {statuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}
    </select></label>
    <button disabled={busy}>{busy ? 'Сохраняем...' : label}</button>
    {error && <p className="error" role="alert">{error}</p>}
  </form>
}
