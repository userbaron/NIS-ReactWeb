import { useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom'
import { useAddTaskMutation, useGetTasksQuery } from '../store/tasksApi'
import { ErrorBox, TaskForm } from '../components'
import { statuses, statusLabels } from '../models'

export default function UserTasksPage() {
  const user = useOutletContext()
  const [params, setParams] = useSearchParams()
  const rawStatus = params.get('status')
  const status = statuses.includes(rawStatus) ? rawStatus : undefined
  const { currentData: tasks, isFetching, error, refetch } = useGetTasksQuery({ userId: user.id, ...(status ? { status } : {}) }, { skip: !user.id })
  const [addTask, adding] = useAddTaskMutation()
  const [message, setMessage] = useState('')

  function changeStatus(value) {
    setParams(previous => {
      const next = new URLSearchParams(previous)
      if (value === 'all') next.delete('status')
      else next.set('status', value)
      return next
    })
  }

  async function create(fields) {
    setMessage('')
    try {
      await addTask({ userId: user.id, ...fields }).unwrap()
      setMessage('Задача создана')
      return true
    } catch {
      return false
    }
  }

  return <div>
    <div className="row"><h3>Задачи</h3><button onClick={refetch} disabled={isFetching}>Обновить задачи</button></div>
    <label className="filter">Статус задач<select value={status || 'all'} onChange={event => changeStatus(event.target.value)}>
      <option value="all">Все статусы</option>{statuses.map(value => <option key={value} value={value}>{statusLabels[value]}</option>)}
    </select></label>
    {isFetching && <p role="status">{tasks ? 'Обновляем задачи...' : 'Загрузка задач...'}</p>}
    {error && <ErrorBox error={error} onRetry={refetch} />}
    {tasks && !tasks.length && <p>Задач с таким статусом нет. Создайте новую задачу.</p>}
    {tasks && <div className="task-list">{tasks.map(task => <article key={task.id}>
      <Link to={`/tasks/${task.id}`}>{task.title}</Link><span>{statusLabels[task.status]}</span>
    </article>)}</div>}
    <article>
      <h3>Новая задача</h3>
      <TaskForm onSave={create} busy={adding.isLoading} reset label="Создать задачу" />
      {adding.error && <ErrorBox error={adding.error} />}
      {message && <p role="status">{message}</p>}
    </article>
  </div>
}
