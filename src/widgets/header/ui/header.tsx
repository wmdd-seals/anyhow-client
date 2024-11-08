import { useAuth } from '@shared/lib'
import { useState, type ReactNode } from 'react'
import { CreateGuideButton } from 'src/features/create-guide'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from 'src/shared/ui'
import { Menu, X } from 'react-feather'

function MobileMenu({
    isAuthenticated
}: {
    isAuthenticated: boolean
}): ReactNode {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <>
            {isAuthenticated && user ? (
                <Link
                    to={'/account'}
                    className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-200 text-slate-800 space-x-1"
                >
                    {user.firstName[0].toUpperCase() +
                        user.lastName[0].toUpperCase()}
                </Link>
            ) : (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-slate-800 focus:outline-none"
                    aria-label="Menu"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            )}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-white">
                    <div className="flex flex-col items-center justify-center h-full gap-5">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-slate-800 focus:outline-none"
                            aria-label="Close"
                        >
                            <X />
                        </button>
                        <>
                            <Button className="bg-none text-slate-700 underline">
                                About us
                            </Button>
                            <Button
                                onClick={() => navigate('/login')}
                                className="bg-none text-slate-700 underline"
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate('/signup')}
                                className="bg-none text-slate-700 underline"
                            >
                                Sign Up
                            </Button>
                        </>
                    </div>
                </div>
            )}
        </>
    )
}

function Header(): ReactNode {
    const { isAuthenticated, user } = useAuth()
    const navigate = useNavigate()

    return (
        <header className="bg-white text-white p-4 sticky top-0 z-[1]">
            <div className="container box-border mx-auto w-full flex justify-between items-center">
                <div className="flex items-center">
                    <Link to={'/'} className="block md:hidden">
                        <img
                            src="/logo-book.svg"
                            alt="Logo"
                            className="w-9 h-9"
                        />
                    </Link>
                    <Link to={'/'} className="hidden md:block">
                        <img
                            src="/primary-logo.svg"
                            alt="Logo"
                            className="w-36"
                        />
                    </Link>
                </div>
                <div className="lg:hidden">
                    <MobileMenu isAuthenticated={isAuthenticated} />
                </div>
                <div className="hidden lg:flex lg:space-x-4 items-center">
                    {isAuthenticated && user ? (
                        <>
                            <CreateGuideButton />
                            <Link
                                to={'/account'}
                                className="flex items-center justify-center rounded-full w-10 h-10 bg-slate-200 text-slate-800 space-x-1"
                            >
                                {user.firstName[0].toUpperCase() +
                                    user.lastName[0].toUpperCase()}
                            </Link>
                        </>
                    ) : (
                        <>
                            <Button className="bg-none text-slate-700 underline">
                                About us
                            </Button>
                            <Button
                                className="bg-none text-slate-700 underline"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </Button>
                            <Button
                                onClick={() => navigate('/signup')}
                                className="bg-ah-green-primary py-3 px-6 rounded-full font-bold text-ah-font-primary"
                            >
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export { Header }
