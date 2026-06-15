import { useState, useCallback } from 'react'
import { analyzeArgument } from '../services/api'
import { buildGraphElements } from '../utils/graphUtils'

export function useAnalyzer() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] })

  const analyze = useCallback(async (input) => {
    setLoading(true)
    setError(null)
    setResult(null)
    setGraphData({ nodes: [], edges: [] })
    try {
      const data = await analyzeArgument(input.trim())
      const { nodes: fn, edges: fe } = buildGraphElements(data.nodes || [], data.edges || [])
      const enriched = { ...data, input: input.trim(), timestamp: Date.now(), id: data.dbId || Date.now().toString() }
      setResult(enriched)
      setGraphData({ nodes: fn, edges: fe })
      const history = JSON.parse(localStorage.getItem('thinkgraph_history') || '[]')
      history.unshift(enriched)
      localStorage.setItem('thinkgraph_history', JSON.stringify(history.slice(0, 50)))
      return enriched
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Analysis failed')
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const loadResult = useCallback((saved) => {
    setResult(saved)
    const { nodes: fn, edges: fe } = buildGraphElements(saved.nodes || [], saved.edges || [])
    setGraphData({ nodes: fn, edges: fe })
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
    setGraphData({ nodes: [], edges: [] })
  }, [])

  return { analyze, loading, result, error, graphData, reset, loadResult }
}