import { Button } from 'src/shared/ui'
import type { ReactNode } from 'react'
import { useAuth } from '@shared/lib'
import { Link, useNavigate } from 'react-router-dom'
export function Footer(): ReactNode {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    return (
        <footer className="flex flex-col justify-between bg-ah-bg-purple text-white items-center px-4 py-12 gap-4 mt-auto">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between w-full gap-4">
                <div className="flex items-center mb-4 sm:mb-0 justify-center sm:justify-start w-full md:w-1/2">
                    <img
                        src="/logo-white.svg"
                        alt="anyhow"
                        className="w-80 h-full"
                    />
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-1/2 sm:justify-end sm:pr-12 gap-4">
                    <Link
                        to="/aboutus"
                        className="underline flex items-center font-semibold    "
                    >
                        About Us
                    </Link>
                    {!isAuthenticated && (
                        <div className="flex gap-4 items-center font-semibold">
                            <Button
                                kind="destructive"
                                onClick={() => navigate('/login')}
                                className="bg-none text-white underline"
                            >
                                Sign in
                            </Button>
                            <Button onClick={() => navigate('/signup')}>
                                Sign up
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-4 sm:mt-0 w-full text-center flex flex-col sm:flex-row justify-center">
                <p className="text-sm">© 2024 anyhow.</p>
            </div>
        </footer>
    )
}
