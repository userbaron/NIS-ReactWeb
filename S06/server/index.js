import express from 'express'
import { randomUUID } from 'node:crypto'
import { copyFileSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const filename = fileURLToPath(import.meta.url)
const folder = path.dirname(filename)
const statuses = ['todo', 'doing', 'done']

export function createApp(dataFile = process.env.DATA_FILE || path.join(folder, 'db.json')) {
  dataFile = path.resolve(dataFile)
  mkdirSync(path.dirname(dataFile), { recursive: true })
  if (!existsSync(dataFile)) copyFileSync(path.join(folder, 'seed.json'), dataFile)
  let data = JSON.parse(readFileSync(dataFile, 'utf8'))
  const app = express()

  function save(tasks) {
    const updated = { ...data, tasks }
    writeFileSync(dataFile + '.tmp', JSON.stringify(updated, null, 2))
    renameSync(dataFile + '.tmp', dataFile)
    data = updated
  }

  app.use((req, res, next) => {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
      'Cache-Control': 'no-store',
    })
    if (req.method === 'OPTIONS') return res.status(204).end()
    next()
  })
  app.use(express.json())

  app.get('/users', (_req, res) => res.json(data.users))

  app.get('/tasks', (req, res) => {
    const { userId, status } = req.query
    if (userId !== undefined && !data.users.some(user => user.id === userId)) return res.status(404).json({ message: 'Участник не найден' })
    if (status !== undefined && !statuses.includes(status)) return res.status(400).json({ message: 'Неизвестный статус' })
    res.json(data.tasks.filter(task => (userId === undefined || task.userId === userId) && (status === undefined || task.status === status)))
  })

  app.get('/tasks/:id', (req, res) => {
    const task = data.tasks.find(task => task.id === req.params.id)
    if (!task) return res.status(404).json({ message: 'Задача не найдена' })
    res.json(task)
  })

  app.post('/tasks', (req, res) => {
    const { userId, title, status = 'todo' } = req.body || {}
    if (!data.users.some(user => user.id === userId)) return res.status(400).json({ message: 'Укажите существующего участника' })
    if (typeof title !== 'string' || !title.trim()) return res.status(400).json({ message: 'Название не должно быть пустым' })
    if (!statuses.includes(status)) return res.status(400).json({ message: 'Неизвестный статус' })
    const task = { id: randomUUID(), userId, title: title.trim(), status }
    save([...data.tasks, task])
    res.status(201).json(task)
  })

  app.patch('/tasks/:id', (req, res) => {
    const task = data.tasks.find(task => task.id === req.params.id)
    if (!task) return res.status(404).json({ message: 'Задача не найдена' })
    const next = { ...task }
    const { title, status } = req.body || {}
    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) return res.status(400).json({ message: 'Название не должно быть пустым' })
      next.title = title.trim()
    }
    if (status !== undefined) {
      if (!statuses.includes(status)) return res.status(400).json({ message: 'Неизвестный статус' })
      next.status = status
    }
    save(data.tasks.map(item => item.id === task.id ? next : item))
    res.json(next)
  })

  app.delete('/tasks/:id', (req, res) => {
    if (!data.tasks.some(task => task.id === req.params.id)) return res.status(404).json({ message: 'Задача не найдена' })
    save(data.tasks.filter(task => task.id !== req.params.id))
    res.status(204).end()
  })

  app.use((_req, res) => res.status(404).json({ message: 'Адрес API не найден' }))
  app.use((error, _req, res, _next) => {
    if (error.type === 'entity.parse.failed') return res.status(400).json({ message: 'Некорректный JSON запроса' })
    console.error(error)
    res.status(500).json({ message: 'Не удалось обработать или сохранить данные' })
  })
  return app
}

if (process.argv[1] && path.resolve(process.argv[1]) === filename) {
  const port = Number(process.env.PORT || 3001)
  createApp().listen(port, () => console.log(`API: http://localhost:${port}`))
}
