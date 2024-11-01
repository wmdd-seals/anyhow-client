import { useState, type ReactNode } from 'react'
import { TextInput, Button } from '../shared/ui'
import { useAuth } from '../shared/lib/auth'
import type { SignInQuery, UserSignInInput } from '@gqlgen/graphql'
import { useLazyQuery } from '@apollo/client/react/hooks'
import { gql } from '@apollo/client'
import { Link } from 'react-router-dom'

const USER_SIGNIN = gql`
    query SignIn($input: UserSignInInput) {
        signIn(input: $input) {
            message
            token
        }
    }
`

export const LoginPage = (): ReactNode => {
    const { loginUser } = useAuth()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const [singIn, { loading, error }] = useLazyQuery<
        SignInQuery,
        { input: UserSignInInput }
    >(USER_SIGNIN, {
        onCompleted: data => {
            if (data.signIn.message) {
                setErrorMessage(data.signIn.message)
                return
            }
            loginUser(data.signIn.token)
        },
        onError: err => {
            setErrorMessage(err.message)
        }
    })

    const [values, setValues] = useState<UserSignInInput>({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()
        setErrorMessage(null)
        await singIn({
            variables: { input: values }
        })
    }

    return (
        <>
            <div className="container text-center sm:text-left">
                <div>
                    <div className="flex flex-col">
                        <h1>Welcome to AnyHow</h1>
                        <span className="text-xs">
                            Your bite-sized learning app
                        </span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            type="email"
                            placeholder="Email address"
                            name="email"
                            onChange={handleChange}
                            required
                        />
                        <TextInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit">
                            {loading ? 'Logging in' : 'Login'}
                        </Button>
                    </form>
                    {errorMessage && (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    )}
                    {error && (
                        <p style={{ color: 'red' }}>Error: {error.message}</p>
                    )}
                </div>
                <div>
                    Don't have an account yet?{' '}
                    <Link to="/signup"> Sign Up Now</Link>
                </div>
            </div>
        </>
    )
}
