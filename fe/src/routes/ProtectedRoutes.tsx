import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const user = 'ds'

  if (!user) {
    return <Navigate to="login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
