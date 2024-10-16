import { useState, type ReactNode } from 'react'
import { TextInput, Button } from '../shared/ui'
import { useAuth, type UserSignInInput } from '../shared/lib/auth'

export const LoginPage = (): ReactNode => {
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
                        <Button type="submit"> Login </Button>
                    </form>
                </div>
            </div>
        </>
    )
}
