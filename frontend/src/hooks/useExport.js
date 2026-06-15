import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import toast from 'react-hot-toast'

export function useExport() {
  const exportPNG = async (elementId = 'logic-graph', filename = 'thinkgraph') => {
    const el = document.getElementById(elementId)
    if (!el) { toast.error('Element not found'); return }
    toast.loading('Exporting PNG...')
    const canvas = await html2canvas(el, { backgroundColor: '#050510', scale: 2 })
    const link = document.createElement('a')
    link.download = `${filename}.png`
    link.href = canvas.toDataURL()
    link.click()
    toast.dismiss()
    toast.success('PNG saved!')
  }

  const exportPDF = async (elementId = 'logic-graph', filename = 'thinkgraph') => {
    const el = document.getElementById(elementId)
    if (!el) { toast.error('Element not found'); return }
    toast.loading('Exporting PDF...')
    const canvas = await html2canvas(el, { backgroundColor: '#050510', scale: 2 })
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, canvas.width, canvas.height)
    pdf.save(`${filename}.pdf`)
    toast.dismiss()
    toast.success('PDF saved!')
  }

  return { exportPNG, exportPDF }
}