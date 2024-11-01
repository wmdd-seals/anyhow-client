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

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const userSession = useQuery(FETCH_USER, {
        fetchPolicy: 'cache-and-network',
        onCompleted: data => {
            if (!data.user.id) {
                setIsAuthenticated(false)
                logout()
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

    if (userSession.loading)
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
