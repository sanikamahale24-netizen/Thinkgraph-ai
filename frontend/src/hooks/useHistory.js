import { useState } from 'react'

export function useHistory() {
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem('thinkgraph_history') || '[]')
  )

  const remove = (id) => {
    const updated = history.filter(h => h.id !== id)
    setHistory(updated)
    localStorage.setItem('thinkgraph_history', JSON.stringify(updated))
  }

  const clear = () => {
    setHistory([])
    localStorage.removeItem('thinkgraph_history')
  }

  return { history, remove, clear }
}