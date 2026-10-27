import { useState } from 'react'
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ChatPage from './pages/ChatPage'
import { clearToken, getToken } from './helpers/authStorage'

export default function App() {
  const [token, setToken] = useState(getToken)

  function logout() {
    clearToken()
    setToken(null)
  }

  return <BrowserRouter>
    <main>
      <h1>Messenger Mini</h1>
      <nav>
        {!token && <NavLink to="/login">Вход</NavLink>}
        {token && <>
          <NavLink to="/profile">Профиль</NavLink>
          <NavLink to="/chat">Чат</NavLink>
          <button onClick={logout}>Выйти</button>
        </>}
      </nav>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/chat" replace /> : <LoginPage onLogin={setToken} />} />
        <Route path="/profile" element={token ? <ProfilePage token={token} /> : <Navigate to="/login" replace />} />
        <Route path="/chat" element={token ? <ChatPage token={token} /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={token ? '/chat' : '/login'} replace />} />
      </Routes>
    </main>
  </BrowserRouter>
}
