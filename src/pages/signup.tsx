import { gql, useMutation } from '@apollo/client'
import type { UserCreateInput } from '@gqlgen/graphql'
import { Button, TextInput } from '@shared/ui'
import { useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

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
                        />
                        <TextInput
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                            required
                        />
                        <Button type="submit">
                            {loading ? 'Signing Up' : 'Signup'}
                        </Button>
                    </form>
                    {errorMessage && (
                        <p style={{ color: 'red' }}>{errorMessage}</p>
                    )}
                </div>
            </div>
        </>
    )
}
