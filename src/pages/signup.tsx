import { gql, useMutation } from '@apollo/client'
import type { UserCreateInput } from '@gqlgen/graphql'
import { Button, TextInput } from '@shared/ui'
import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const USER_SIGNUP = gql`
    mutation SignupUser($input: UserCreateInput!) {
        signupUser(input: $input) {
            id
        }
    }
`

export const SignUpPage = (): ReactNode => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const navigate = useNavigate()
    const [addUser, { loading }] = useMutation(USER_SIGNUP, {
        onError: err => {
            console.error(err)
            setErrorMessage('Failed to Register the User')
        }
    })

    const [values, setValues] = useState<UserCreateInput>({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        middleName: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        event.preventDefault()
        setErrorMessage(null)
        const res = await addUser({
            variables: { input: values }
        })

        console.log(res.data.signupUser.id)

        if (res.data.signupUser.id) navigate(`/login`)
    }

    return (
        <div className="text-center grid grid-cols-1 md:grid-cols-2 gap-3 p-5 md:p-0">
            {/* Left Section (Form Content) */}
            <div className="flex flex-col items-center justify-center gap-5 md:w-3/4 lg:w-1/2 mx-auto">
                {/* Logo */}
                <img
                    src="/primary-logo.svg"
                    alt="Primary Logo"
                    className="w-36 mx-auto"
                />

                {/* Mobile-Only Image */}
                <img
                    src="/login-mobile-img.webp"
                    alt="Learning illustration for mobile view"
                    className="md:hidden w-full h-auto rounded-lg object-cover"
                />

                {/* Heading and Subtitle */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Sign Up</h1>
                    <p className="text-xs text-gray-600">
                        Discover a world of learning
                    </p>
                </div>

                {/* Signup Form */}
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm flex flex-col gap-4"
                >
                    <TextInput
                        type="email"
                        placeholder="Email address"
                        name="email"
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        required
                    />
                    <TextInput
                        type="text"
                        placeholder="Middle Name"
                        name="middleName"
                        onChange={handleChange}
                    />
                    <TextInput
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
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
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>

                {/* Error Message */}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                {/* Login Prompt */}
                <p className="text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link to="/login" className="underline text-blue-600">
                        Log In
                    </Link>
                </p>
            </div>

            {/* Right Section (Desktop Image) */}
            <div className="hidden md:block bg-black">
                <img
                    src="/login-desktop-img.webp"
                    alt="Learning illustration for desktop view"
                    className="h-screen w-screen object-center object-cover min-w-full min-h-full"
                />
            </div>
        </div>
    )
}
