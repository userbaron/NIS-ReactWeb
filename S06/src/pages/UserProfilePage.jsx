import { Link, useOutletContext } from 'react-router-dom'

export default function UserProfilePage() {
  const user = useOutletContext()
  return <article>
    <h3>Профиль участника</h3>
    <p>ID: {user.id}</p>
    <p>Имя: {user.name}</p>
    <p>Email: {user.email}</p>
    <Link to={`/users/${user.id}/tasks`}>Открыть задачи</Link>
  </article>
}
