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
        <div className="text-center grid sm:grid-cols-1 md:grid-cols-2 gap-3">
            {/* Left Column */}
            <div className="self-center justify-center grid gap-3 my-10 mx-5">
                {/* Mobile View */}
                <div className="md:hidden grid gap-3">
                    <div className="flex justify-center items-center">
                        <img src="/primary-logo.svg" alt="" className="w-36" />
                    </div>
                    <img
                        src="/login-mobile-img.webp"
                        alt=""
                        className="h-full w-full rounded-lg"
                    />
                    <div className="flex flex-col">
                        <h1>Welcome to anyhow</h1>
                        <span className="text-xs">
                            Your bite-sized learning app
                        </span>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block text-center">
                    <h1>Welcome to</h1>
                    <div className="flex justify-center items-center">
                        <img src="/primary-logo.svg" alt="" className="w-36" />
                    </div>
                </div>

                {/* Form Section */}
                <div className="grid gap-3 m-auto">
                    <form onSubmit={handleSubmit} className="grid gap-3">
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
                            {loading ? 'Signing in' : 'Sign In'}
                        </Button>
                    </form>
                    {errorMessage && (
                        <p className="text-red-500">{errorMessage}</p>
                    )}
                    {error && (
                        <p className="text-red-500">Error: {error.message}</p>
                    )}
                    <p className="text-gray-400">
                        Don't have an account yet?{' '}
                        <Link to="/signup" className="underline text-slate-800">
                            Sign up now
                        </Link>
                    </p>
                </div>
            </div>

            {/* Right Column (Desktop Image) */}
            <div className="hidden md:block bg-black">
                <img
                    src="/login-desktop-img.webp"
                    alt=""
                    className="h-screen w-screen object-center object-cover min-w-full min-h-full"
                />
            </div>
        </div>
    )
}
