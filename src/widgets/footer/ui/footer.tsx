import { Button } from 'src/shared/ui'
import type { ReactNode } from 'react'
import { useAuth } from '@shared/lib'
import { useNavigate } from 'react-router-dom'
export function Footer(): ReactNode {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    return (
        <footer className="flex flex-col justify-between bg-ah-bg-purple text-white items-center px-4 py-12 gap-4">
            <div className="flex flex-col sm:flex-row justify-between w-full gap-4">
                <div className="flex items-center mb-4 sm:mb-0 justify-center sm:justify-start w-full md:w-1/2">
                    <img
                        src="/logo-white.svg"
                        alt="AnyHow"
                        className="w-80 h-full"
                    />
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-1/2 sm:justify-end sm:pr-12 gap-4">
                    <Button className="bg-none text-white underline">
                        About Us
                    </Button>
                    {!isAuthenticated && (
                        <>
                            <Button
                                onClick={() => navigate('/signup')}
                                className="bg-none text-white underline"
                            >
                                Sign up
                            </Button>
                            <Button
                                onClick={() => navigate('/login')}
                                className="bg-none text-white underline"
                            >
                                Sign in
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="mt-4 sm:mt-0 w-full text-center flex flex-col sm:flex-row justify-center">
                <p className="text-sm">© 2024 AnyHow.</p>
            </div>
        </footer>
    )
}
