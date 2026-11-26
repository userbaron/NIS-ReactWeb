import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteTaskMutation, useGetTaskQuery, useUpdateTaskMutation } from '../store/tasksApi'
import { ErrorBox, NotFound, TaskForm } from '../components'
import { statusLabels } from '../models'

function Editor({ task }) {
  const navigate = useNavigate()
  const [updateTask, updating] = useUpdateTaskMutation()
  const [deleteTask, deleting] = useDeleteTaskMutation()
  const [message, setMessage] = useState('')

  async function save(fields) {
    setMessage('')
    try {
      await updateTask({ id: task.id, ...fields }).unwrap()
      setMessage('Задача сохранена')
      return true
    } catch {
      return false
    }
  }

  async function remove() {
    setMessage('')
    try {
      await deleteTask(task.id).unwrap()
      navigate(`/users/${task.userId}/tasks`)
    } catch {}
  }

  return <article>
    <TaskForm initialTitle={task.title} initialStatus={task.status} onSave={save} busy={updating.isLoading || deleting.isLoading} />
    {updating.error && <ErrorBox error={updating.error} />}
    {message && <p role="status">{message}</p>}
    <button className="danger" onClick={remove} disabled={updating.isLoading || deleting.isLoading}>{deleting.isLoading ? 'Удаляем...' : 'Удалить задачу'}</button>
    {deleting.error && <ErrorBox error={deleting.error} />}
  </article>
}

export default function TaskPage() {
  const { taskId } = useParams()
  const { currentData: task, isFetching, error, refetch } = useGetTaskQuery(taskId)
  if (error?.status === 404) return <NotFound message="Задача не найдена" />
  if (!task) return <section><h2>Задача</h2>{error ? <ErrorBox error={error} onRetry={refetch} /> : <p>Загрузка задачи...</p>}</section>

  return <section>
    <div className="row"><h2>{task.title}</h2><button onClick={refetch} disabled={isFetching}>Обновить задачу</button></div>
    <p>Текущий статус: {statusLabels[task.status]}</p>
    <Link to={`/users/${task.userId}/tasks`}>К задачам участника</Link>
    {isFetching && <p role="status">Обновляем задачу...</p>}
    {error && <ErrorBox error={error} onRetry={refetch} />}
    <Editor key={task.id} task={task} />
  </section>
}
