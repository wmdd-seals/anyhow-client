import type { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@shared/lib'

const ProtectedRoute = (): ReactElement => {
    const context = useAuth()
    const { isAuthenticated, loading } = context

    if (!loading && !isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <Outlet context={context} />
}

export default ProtectedRoute
