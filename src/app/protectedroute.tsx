import type { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@shared/lib'

const ProtectedRoute = (): ReactElement => {
    const context = useAuth()

    return context.isAuthenticated ? (
        <Outlet context={context} />
    ) : (
        <Navigate to="/login" replace />
    )
}

export default ProtectedRoute
