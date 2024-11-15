import { createContext, useState } from 'react'
import { useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'
import type { User } from '@gqlgen/graphql'
import Toast from '@shared/ui/toast'
import { Loading } from '@widgets/loading'

export type UserContextType = {
    authToken: string | null
    loginUser: (token: string) => void
    logout: () => void
    isAuthenticated: boolean
    user: User | null
    toast: { visible: boolean; message: string }
    setToast: (toast: { visible: boolean; message: string }) => void
    loading: boolean
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
    const [toast, setToast] = useState<{ visible: boolean; message: string }>({
        visible: false,
        message: ''
    })
    const [authToken, setToken] = useState<string | null>(
        localStorage.getItem('authToken')
    )

    const { data, loading } = useQuery(FETCH_USER, {
        fetchPolicy: 'cache-and-network',
        onCompleted: data => {
            if (!data.user.id) {
                logout()
                return
            }
        }
    })

    const loginUser = (token: string): void => {
        localStorage.setItem('authToken', token)
        setToken(token)
    }

    const logout = (): void => {
        localStorage.removeItem('authToken')
        setToken('')
    }

    if (loading) return <Loading />

    return (
        <UserContext.Provider
            value={{
                loginUser,
                authToken,
                logout,
                isAuthenticated: !!data?.user.id,
                user: data?.user || null,
                toast,
                setToast,
                loading
            }}
        >
            {children}
            <Toast toast={toast} setToast={setToast} />
        </UserContext.Provider>
    )
}
