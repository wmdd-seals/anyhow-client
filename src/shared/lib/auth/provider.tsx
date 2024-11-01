import { createContext, useEffect, useState } from 'react'

export type UserContextType = {
    authToken: string | null
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
}

type Props = { children: React.ReactNode }

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const AuthProvider = ({ children }: Props): React.ReactNode => {
    const [authToken, setToken] = useState<string | null>(
        localStorage.getItem('authToken')
    )
    const [isAuthenticated, setIsAuthenticated] = useState(
        authToken ? true : false
    )

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken')
        if (storedToken) {
            setToken(storedToken)
            setIsAuthenticated(true)
        }
    }, [])

    const login = (token: string): void => {
        localStorage.setItem('authToken', token)
        setToken(token)
        setIsAuthenticated(true)
    }

    const logout = (): void => {
        localStorage.removeItem('authToken')
        setToken('')
        setIsAuthenticated(false)
    }
    return (
        <UserContext.Provider
            value={{
                login,
                authToken,
                logout,
                isAuthenticated
            }}
        >
            {children}
        </UserContext.Provider>
    )
}
