import axios from 'axios'
import toast from 'react-hot-toast'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
})

api.interceptors.response.use(
  res => res,
  err => {
    if (!err.response) toast.error('Cannot reach server. Is the backend running on port 5000?')
    else if (err.response.status === 429) toast.error('Too many requests. Please wait.')
    else if (err.response.status >= 500) toast.error('Server error. Please try again.')
    return Promise.reject(err)
  }
)

export async function analyzeArgument(argument) {
  const res = await api.post('/api/analyze', { argument })
  return res.data
}

export async function fetchHistory() {
  const res = await api.get('/api/history')
  return res.data
}

export async function deleteAnalysis(id) {
  const res = await api.delete(`/api/history/${id}`)
  return res.data
}

export async function clearAllHistory() {
  const res = await api.delete('/api/history')
  return res.data
}

export default api