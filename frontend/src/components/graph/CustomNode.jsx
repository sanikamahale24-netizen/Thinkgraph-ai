import { Handle, Position } from 'reactflow'

export default function CustomNode({ data }) {
  return (
    <div style={{
      background: data.style?.background || 'rgba(59,130,246,0.15)',
      border: data.style?.border || '1px solid rgba(59,130,246,0.5)',
      borderRadius: '12px',
      padding: '10px 14px',
      minWidth: '150px',
      maxWidth: '230px',
      backdropFilter: 'blur(10px)',
    }}>
      <Handle type="target" position={Position.Top}
        style={{ background: 'rgba(148,163,184,0.4)', border: 'none', width: 8, height: 8 }} />
      <div style={{ fontSize: '9px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
        color: data.style?.color || '#93c5fd', opacity: 0.8, marginBottom: 4 }}>
        {data.typeLabel}
      </div>
      <div style={{ fontSize: '12px', color: '#e2e8f0', lineHeight: 1.5, wordBreak: 'break-word' }}>
        {data.label}
      </div>
      <Handle type="source" position={Position.Bottom}
        style={{ background: 'rgba(148,163,184,0.4)', border: 'none', width: 8, height: 8 }} />
    </div>
  )
}