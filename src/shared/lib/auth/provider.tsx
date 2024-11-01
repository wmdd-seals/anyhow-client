import { createContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'

export type UserContextType = {
    authToken: string | null
    loginUser: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
}

type Props = { children: React.ReactNode }

export const UserContext = createContext<UserContextType>({} as UserContextType)

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

export const AuthProvider = ({ children }: Props): React.ReactNode => {
    // const navigate = useNavigate()
    const [authToken, setToken] = useState<string | null>(
        localStorage.getItem('authToken')
    )

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const { loading } = useQuery(FETCH_USER, {
        fetchPolicy: 'cache-and-network',
        onCompleted: data => {
            if (!data.user.id) {
                setIsAuthenticated(false)
                logout()
                return
            }
            setIsAuthenticated(!!data.user)
        }
    })

    const loginUser = (token: string): void => {
        localStorage.setItem('authToken', token)
        setToken(token)
        setIsAuthenticated(true)
    }

    const logout = (): void => {
        localStorage.removeItem('authToken')
        setToken('')
        setIsAuthenticated(false)
    }

    if (loading)
        // TODO Switch it to svg which Bee created
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-900 to-green-300">
                <img src="/logo.svg" alt="logo" className="w-96 h-96" />
            </div>
        )

    return (
        <UserContext.Provider
            value={{
                loginUser,
                authToken,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
