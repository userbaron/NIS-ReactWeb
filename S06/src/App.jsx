import { lazy, Suspense, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { usersRequested } from './store/usersSlice'
import { selectFavoriteCount } from './store/uiSlice'
import { NotFound } from './components'
import UsersPage from './pages/UsersPage'
import FavoritesPage from './pages/FavoritesPage'
import UserLayout from './pages/UserLayout'
import UserProfilePage from './pages/UserProfilePage'
import UserTasksPage from './pages/UserTasksPage'

const TaskPage = lazy(() => import('./pages/TaskPage'))

export default function App() {
  const dispatch = useDispatch()
  const status = useSelector(state => state.users.status)
  const favorites = useSelector(selectFavoriteCount)
  useEffect(() => {
    if (status === 'idle') dispatch(usersRequested())
  }, [status, dispatch])

  return <main>
    <header>
      <h1>Командный трекер</h1>
      <nav><NavLink to="/users">Команда</NavLink><NavLink to="/favorites">Избранное ({favorites})</NavLink></nav>
    </header>
    <Routes>
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:userId" element={<UserLayout />}>
        <Route index element={<UserProfilePage />} />
        <Route path="tasks" element={<UserTasksPage />} />
      </Route>
      <Route path="/tasks/:taskId" element={<Suspense fallback={<p>Загружаем страницу...</p>}><TaskPage /></Suspense>} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </main>
}
