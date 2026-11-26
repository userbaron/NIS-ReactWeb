import { useDispatch, useSelector } from 'react-redux'
import { selectFavoriteUsers } from '../store/uiSlice'
import { usersRequested } from '../store/usersSlice'
import { ErrorBox, UserCards } from '../components'

export default function FavoritesPage() {
  const dispatch = useDispatch()
  const users = useSelector(selectFavoriteUsers)
  const { status, error } = useSelector(state => state.users)
  return <section>
    <h2>Избранные участники</h2>
    {(status === 'idle' || status === 'loading') && <p role="status">Загрузка участников...</p>}
    {status === 'failed' && <ErrorBox error={error} onRetry={() => dispatch(usersRequested())} />}
    {status === 'succeeded' && !users.length && <p>В избранном пока никого нет</p>}
    <UserCards users={users} />
  </section>
}
