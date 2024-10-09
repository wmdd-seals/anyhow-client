import { useState, type ReactNode } from 'react'
import { TextInput } from '../shared/ui/text-input'
import { Button } from '../shared/ui/button'
import { useAuth, type UserSignInInput } from '../shared/context/useAuth'

const LoginPage = (): ReactNode => {
    const { loginUser } = useAuth()

    const [values, setValues] = useState<UserSignInInput>({
        email: '',
        password: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        loginUser(values)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextInput
                    type="email"
                    label="Email"
                    name="email"
                    onChange={handleChange}
                    required
                />
                <TextInput
                    type="password"
                    label="Password"
                    name="password"
                    onChange={handleChange}
                    required
                />
                <Button type="submit"> Login </Button>
            </form>
        </>
    )
}

export default LoginPage
