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
    //registerUser: (email: string, password: string) => void
    loginUser: (userInput: UserSignInInput) => void
    logout: () => void
    isAuthenticated: boolean
}

type Props = { children: React.ReactNode }

export const UserContext = createContext<UserContextType>({} as UserContextType)

const USER_SIGNIN = gql`
    query SignIn($input: UserSignInInput) {
        signIn(input: $input) {
            message
            token
        }
    }
`

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

    const userSession = useQuery(FETCH_USER)

    const [isAuthenticated, setIsAuthenticated] = useState(
        userSession.data?.user ? userSession.data.user : false
    )
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
            value={{ loginUser, authToken, logout, isAuthenticated }}
        >
            {children}
        </UserContext.Provider>
    )
}
