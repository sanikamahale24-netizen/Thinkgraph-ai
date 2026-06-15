export function buildGraphElements(nodes = [], edges = []) {
  if (!nodes.length) return { nodes: [], edges: [] }

  const NODE_STYLES = {
    premise: { background: 'rgba(59,130,246,0.12)', border: '1.5px solid rgba(59,130,246,0.5)', color: '#93c5fd' },
    assumption: { background: 'rgba(249,115,22,0.12)', border: '1.5px solid rgba(249,115,22,0.5)', color: '#fdba74' },
    intermediate_conclusion: { background: 'rgba(139,92,246,0.12)', border: '1.5px solid rgba(139,92,246,0.5)', color: '#c4b5fd' },
    conclusion: { background: 'rgba(34,197,94,0.12)', border: '1.5px solid rgba(34,197,94,0.5)', color: '#86efac' },
    fallacy: { background: 'rgba(239,68,68,0.12)', border: '1.5px solid rgba(239,68,68,0.5)', color: '#fca5a5' },
  }
  const LABEL_MAP = {
    premise: 'Premise', assumption: 'Assumption',
    intermediate_conclusion: 'Intermediate', conclusion: 'Conclusion', fallacy: 'Fallacy',
  }
  const TYPE_ORDER = ['premise', 'assumption', 'intermediate_conclusion', 'conclusion', 'fallacy']

  const grouped = {}
  TYPE_ORDER.forEach(t => { grouped[t] = [] })
  nodes.forEach(n => {
    const type = n.type || 'premise'
    if (!grouped[type]) grouped[type] = []
    grouped[type].push(n)
  })

  const flowNodes = []
  const CANVAS_WIDTH = 800
  const ROW_HEIGHT = 170
  const NODE_WIDTH = 200
  let currentY = 60

  TYPE_ORDER.forEach(type => {
    const group = grouped[type]
    if (!group.length) return
    const count = group.length
    const totalWidth = Math.min(count * (NODE_WIDTH + 40), CANVAS_WIDTH)
    const spacing = count > 1 ? totalWidth / (count - 1) : 0
    const startX = (CANVAS_WIDTH - totalWidth) / 2 + NODE_WIDTH / 2
    group.forEach((node, i) => {
      const x = count === 1 ? CANVAS_WIDTH / 2 : startX + i * spacing
      flowNodes.push({
        id: String(node.id),
        type: 'custom',
        position: { x: x - NODE_WIDTH / 2, y: currentY },
        data: { label: node.text || '', type, typeLabel: LABEL_MAP[type] || type, style: NODE_STYLES[type] || NODE_STYLES.premise },
        deletable: false,
      })
    })
    currentY += ROW_HEIGHT
  })

  const existingIds = new Set(flowNodes.map(n => n.id))
  const flowEdges = edges
    .filter(e => e && e.from && e.to && String(e.from) !== String(e.to))
    .filter(e => existingIds.has(String(e.from)) && existingIds.has(String(e.to)))
    .map((edge, i) => {
      const src = flowNodes.find(n => n.id === String(edge.from))
      const colors = { premise: 'rgba(59,130,246,0.4)', assumption: 'rgba(249,115,22,0.4)', intermediate_conclusion: 'rgba(139,92,246,0.4)', fallacy: 'rgba(239,68,68,0.4)' }
      const stroke = colors[src?.data?.type] || 'rgba(148,163,184,0.35)'
      return {
        id: `e${i}-${edge.from}-${edge.to}`,
        source: String(edge.from), target: String(edge.to),
        animated: true,
        style: { stroke, strokeWidth: 2 },
        markerEnd: { type: 'arrowclosed', color: stroke, width: 20, height: 20 },
      }
    })

  return { nodes: flowNodes, edges: flowEdges }
}