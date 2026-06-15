const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

dotenv.config()

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`)
  next()
})

app.use('/api/analyze', require('./routes/analyze'))
app.use('/api/history', require('./routes/history'))
app.use('/api/auth', require('./routes/auth'))

app.get('/health', (req, res) => {
  const apiKey = process.env.ANTHROPIC_API_KEY
  const hasKey = apiKey && apiKey !== 'your_anthropic_api_key_here'
  res.json({
    status: 'ok',
    aiMode: hasKey ? 'live' : 'mock',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

app.use((req, res) => res.status(404).json({ error: 'Route not found' }))

app.use((err, req, res, next) => {
  console.error('Error:', err.message)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 3000 })
    console.log('✅ MongoDB connected')
  } catch {
    console.warn('⚠️  MongoDB not available — running without database')
  }
}

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT, () => {
    const apiKey = process.env.ANTHROPIC_API_KEY
    const hasKey = apiKey && apiKey !== 'your_anthropic_api_key_here'
    console.log('')
    console.log('╔══════════════════════════════════════════╗')
    console.log('║     ThinkGraph AI — Backend Server        ║')
    console.log('╠══════════════════════════════════════════╣')
    console.log(`║  🚀  http://localhost:${PORT}                 ║`)
    console.log(`║  🤖  AI: ${hasKey ? '✅ LIVE Claude AI        ' : '⚠️  MOCK (add API key)  '}║`)
    console.log('╚══════════════════════════════════════════╝')
    console.log('')
  })
})