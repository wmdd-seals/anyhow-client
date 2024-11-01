import { createContext, useState } from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import { graphql } from '@gqlgen'

type signIn = {
    message: string
    token: string
}

type UserData = {
    signIn: signIn
}

export type UserSignInInput = {
    email: string
    password: string
}

type input = {
    input: UserSignInInput
}

export type UserContextType = {
    authToken: string | null
    login: (token: string) => void
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

    const [queryHandler] = useLazyQuery<UserData, input>(USER_SIGNIN)

    const loginUser = (userInput: UserSignInInput): void => {
        try {
            queryHandler({
                variables: {
                    input: {
                        email: userInput.email,
                        password: userInput.password
                    }
                }
            })
                .then(response => {
                    if (response.data?.signIn.token) {
                        localStorage.setItem(
                            'authToken',
                            response.data.signIn.token
                        )
                        setToken(response.data.signIn.token)
                        setIsAuthenticated(true)
                    }
                })
                .catch(e => console.log(e))
        } catch (e) {
            console.error(e)
        }
    }

    const logout = (): void => {
        localStorage.removeItem('authToken')
        setToken('')
        setIsAuthenticated(false)
    }

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
