import { useDispatch, useSelector } from 'react-redux'
import { selectUsers, usersRequested } from '../store/usersSlice'
import { ErrorBox, UserCards } from '../components'

export default function UsersPage() {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)
  const { status, error } = useSelector(state => state.users)
  const refresh = () => dispatch(usersRequested())
  return <section>
    <div className="row"><h2>Участники</h2><button onClick={refresh} disabled={status === 'loading'}>Обновить участников</button></div>
    {(status === 'idle' || status === 'loading') && <p role="status">{users.length ? 'Обновляем участников...' : 'Загрузка участников...'}</p>}
    {status === 'failed' && <ErrorBox error={error} onRetry={refresh} />}
    {status === 'succeeded' && !users.length && <p>Участников пока нет</p>}
    <UserCards users={users} />
  </section>
}
