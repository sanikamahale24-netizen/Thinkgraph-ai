import ReactFlow, { Background, MiniMap, ReactFlowProvider, BackgroundVariant, useReactFlow } from 'reactflow'
import 'reactflow/dist/style.css'
import CustomNode from './CustomNode'
import GraphLegend from './GraphLegend'
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react'

const nodeTypes = { custom: CustomNode }

function Controls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-1">
      {[{ icon: ZoomIn, fn: zoomIn }, { icon: ZoomOut, fn: zoomOut }, { icon: Maximize, fn: fitView }].map(({ icon: Icon, fn }, i) => (
        <button key={i} onClick={fn}
          className="w-9 h-9 glass rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all">
          <Icon size={15} />
        </button>
      ))}
    </div>
  )
}

function GraphInner({ nodes, edges }) {
  return (
    <div className="w-full h-full relative" id="logic-graph">
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}
        fitView fitViewOptions={{ padding: 0.3 }} minZoom={0.2} maxZoom={2}
        proOptions={{ hideAttribution: true }}>
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgba(255,255,255,0.05)" />
        <MiniMap
          nodeColor={n => {
            const c = { premise: 'rgba(59,130,246,0.6)', assumption: 'rgba(249,115,22,0.6)', intermediate_conclusion: 'rgba(139,92,246,0.6)', conclusion: 'rgba(34,197,94,0.6)', fallacy: 'rgba(239,68,68,0.6)' }
            return c[n.data?.type] || 'rgba(148,163,184,0.6)'
          }}
          maskColor="rgba(0,0,0,0.4)"
          style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}
        />
        <Controls />
        <GraphLegend />
      </ReactFlow>
    </div>
  )
}

export default function LogicGraph({ nodes = [], edges = [] }) {
  return (
    <ReactFlowProvider>
      <GraphInner nodes={nodes} edges={edges} />
    </ReactFlowProvider>
  )
}