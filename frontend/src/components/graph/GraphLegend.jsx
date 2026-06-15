export default function GraphLegend() {
  const items = [
    { label: 'Premise', color: 'rgb(59,130,246)' },
    { label: 'Assumption', color: 'rgb(249,115,22)' },
    { label: 'Intermediate', color: 'rgb(139,92,246)' },
    { label: 'Conclusion', color: 'rgb(34,197,94)' },
    { label: 'Fallacy', color: 'rgb(239,68,68)' },
  ]
  return (
    <div className="absolute bottom-4 left-4 z-10 glass rounded-xl p-3 flex flex-wrap gap-3">
      {items.map(item => (
        <div key={item.label} className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color, opacity: 0.8 }} />
          <span className="text-white/50 text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  )
}