import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return (
    <div className="min-h-screen bg-[#050510] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
    </div>
  )
  if (!user) return <Navigate to="/login" replace />
  return children
}