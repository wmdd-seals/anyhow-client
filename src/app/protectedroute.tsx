import type { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// import { useAuth } from '../shared/lib'
import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen/gql'

const FETCH_USER = graphql(`
    query User {
        user {
            email
            favoriteTopics
            firstName
            id
            lastName
            middleName
        }
    }
`)

const ProtectedRoute = (): ReactElement => {
    const { data, loading } = useQuery(FETCH_USER)
    const isAuthenticated = data?.user.id

    if (loading) return <div>Loading...</div>

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
