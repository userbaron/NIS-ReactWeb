import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { selectUserById, usersRequested } from '../store/usersSlice'
import { ErrorBox, FavoriteButton, NotFound } from '../components'

export default function UserLayout() {
  const { userId } = useParams()
  const dispatch = useDispatch()
  const user = useSelector(state => selectUserById(state, userId))
  const { status, error } = useSelector(state => state.users)
  const refresh = () => dispatch(usersRequested())
  if (!user && (status === 'idle' || status === 'loading')) return <p>Загрузка участника...</p>
  if (!user && status === 'failed') return <ErrorBox error={error} onRetry={refresh} />
  if (!user) return <NotFound message="Участник не найден" />

  return <section>
    <div className="row"><h2>{user.name}</h2><FavoriteButton user={user} /></div>
    <p>{user.email}</p>
    <nav className="subnav"><NavLink end to={`/users/${user.id}`}>Профиль</NavLink><NavLink to={`/users/${user.id}/tasks`}>Задачи участника</NavLink></nav>
    {status === 'loading' && <p role="status">Обновляем участника...</p>}
    {status === 'failed' && <ErrorBox error={error} onRetry={refresh} />}
    <Outlet key={user.id} context={user} />
  </section>
}
